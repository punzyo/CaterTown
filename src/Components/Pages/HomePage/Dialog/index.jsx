import { useState } from 'react';
import styled from 'styled-components';
import useValidatedInput from '../../../../utils/hooks/useValidatedInput';
import SimpleSlider from '../../../Silder';
import { map2 } from '../../GamePage/Maps/map2';
import { createRoom, addRoomToUser } from '../../../../firebase/firestore';
import { catImages } from '@/assets/charNames';
import CloseButton from '../../../Buttons/CloseButton';
import Cat from '../../../Cat';
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
const Title = styled.p`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
   > div:first-of-type {
    background-position: -260px 188px;
  }
`;
const InputWrapper = styled.div`
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
        ${(props) =>
          props.$value ? (props.$isValid ? 'green' : 'red') : '#1e84d8'};
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
    background-color: #2e619c;
    color: white;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #4979bc;
    }
  }
`;

function Dialog({ onClose, userId }) {
  const roomNameInput = useValidatedInput('', /^[^*%]+$/, 15);
  const charNameInput = useValidatedInput('', /^[^*%]+$/, 15);
  // const mapInput = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleSlideChange = (index) => {
    setSelectedImageIndex(index);
  };
  const clickCreateRoom = async () => {
    if(!roomNameInput.isValid){
      alert('房間名稱不符規則')
    }
    if(!charNameInput.isValid){
      alert('角色名稱不符規則')
    }
    const roomName = roomNameInput.value;
    const charName = charNameInput.value;
    // const map = mapInput.current.value;
    const map = 'map2';
    const character = catImages[selectedImageIndex];

    const roomId = await createRoom({
      userId,
      roomName,
      charName,
      character,
      startingPoint: map2.startingPoint,
      map,
    });
    const isUpdated = await addRoomToUser({
      userId,
      roomName,
      roomId,
      character,
      charName,
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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <DialogWrapper
        style={{ background: 'white', padding: '20px', borderRadius: '5px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Title>
          <Cat image="brown_7" />
          創建你的房間!
        </Title>
        <CloseButton clickFunc={onClose} />

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
    </div>
  );
}

export default Dialog;
