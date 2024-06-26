import { useState } from 'react';
import styled from 'styled-components';
import useValidatedInput from '@/utils/hooks/useValidatedInput';
import SimpleSlider from '@/Components/SimpleSlider';
import { map2 } from '../../GamePage/Maps/map2';
import {
  createRoom,
  addRoomToUser,
  initPlayerData,
} from '@/utils/firebase/firestore';
import { catImages } from '@/assets/charNames';
import CloseButton from '@/Components/Buttons/CloseButton';
import Cat from '@/Components/Cat';
import Dialog from '@/Components/Dialog';
import type { InputWrapperProps } from '@/types';
const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
const SliderStyle = styled.div`
  position: relative;
  border-radius: 10px;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url('/images/floor.png');
  color: white;
  .slick-slider {
    position: static;
  }
  button:before {
    color: black;
  }
  .slick-dots {
    height: 50px;
  }
`;
const DialogWrapper = styled.div`
  width: 400px;
  height: 460px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  > div:first-of-type {
    background-position: -260px 188px;
  }
`;
const InputWrapper = styled.div<InputWrapperProps>`
  width: 85%;
  label {
    font-weight: bold;
  }
  input {
    outline: none;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
    &:focus {
      border: 1px solid
        ${({ $value, $isValid }) =>
          $value ? ($isValid ? 'green' : 'red') : '#1e84d8'};
    }
  }
`;
const CreateRoom = styled.div`
  width: 80%;
  margin-top: 10px;
  button {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.backgroundBlue4};
    color: white;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.hoverBlue3};
    }
  }
`;

export default function CreateRoomDialog({
  onClose,
  userId,
}: {
  onClose: () => void;
  userId: string;
}) {
  const roomNameInput = useValidatedInput('', /^[^*%]+$/, 15);
  const charNameInput = useValidatedInput('', /^[^*%]+$/, 15);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleSlideChange = (index: number) => {
    setSelectedImageIndex(index);
  };
  const clickCreateRoom = async () => {
    if (!roomNameInput.isValid) {
      alert('房間名稱不符規則');
      return
    }
    if (!charNameInput.isValid) {
      alert('角色名稱不符規則');
      return
    }
    const roomName = roomNameInput.value;
    const charName = charNameInput.value;
    const map = 'map2';
    const character = catImages[selectedImageIndex];

    const roomId = await createRoom({
      roomName,
      map,
    });
    if (!roomId) return;
    await initPlayerData({
      roomId,
      userId,
      position: map2.startingPoint,
      charName,
      character,
      permissionLevel: 'creator',
    });
    const isUpdated = await addRoomToUser({
      userId,
      roomName,
      roomId,
      character,
      charName,
      isCreator: true,
    });
    if (isUpdated) {
      clearInput();
      onClose();
    }
  };
  const clearInput = () => {
    roomNameInput.clear();
    charNameInput.clear();
    setSelectedImageIndex(0);
  };
  return (
    <Dialog onClickFunc={onClose}>
      <DialogWrapper
        style={{ background: 'white', padding: '20px', borderRadius: '5px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Title>
          <Cat image="brown_7" />
          創建你的房間!
        </Title>
        <CloseButton onClickFunc={onClose} />

        <InputWrapper
          $isValid={roomNameInput.isValid}
          $value={roomNameInput.value}
        >
          <label htmlFor="roomName">房間名稱</label>
          <input
            type="text"
            name="roomName"
            id="roomName"
            value={roomNameInput.value}
            onChange={roomNameInput.onChange}
          />
        </InputWrapper>
        <InputWrapper
          $isValid={charNameInput.isValid}
          $value={charNameInput.value}
        >
          <label htmlFor="name">角色名稱</label>
          <input
            type="text"
            name="name"
            id="name"
            value={charNameInput.value}
            onChange={charNameInput.onChange}
          />
        </InputWrapper>
        <SliderWrapper>
          <div className="title">選擇貓咪</div>
          <SliderStyle>
            <SimpleSlider onSlideChange={handleSlideChange} data={catImages} />
          </SliderStyle>
        </SliderWrapper>
        <CreateRoom>
          <button onClick={clickCreateRoom}>建立房間</button>
        </CreateRoom>
      </DialogWrapper>
    </Dialog>
  );
}
