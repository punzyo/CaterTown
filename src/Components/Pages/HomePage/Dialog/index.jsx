import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useFormInput } from '../../../../utils/hooks/useFormInput';
import SimpleSlider from '../../../Silder';
import { map1 } from '../../../Maps/map1';
import { createRoom, addRoomToUser } from '../../../../firebase/firestore';
import { catImages } from '@/assets/charNames';
import CloseButton from '../../../Buttons/CloseButton';
const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    padding: 20px 0;
  }
`;
const SliderStyle = styled.div`
  position: relative;
  border: 1px solid black;
  border-radius: 10px;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
const Title = styled.p`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;
const InputDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  input {
    flex-grow: 1;
  }
`;
const CreateRoom = styled.div`
  width: 100%;
  button {
    width: 100%;
    height: 40px;
    border: 1px solid;
    border-radius: 5px;
    background-color: inherit;
    cursor: pointer;
  }
`;

function Dialog({ onClose, userId }) {
  const roomNameInput = useFormInput('');
  const charNameInput = useFormInput('');
  const mapInput = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleSlideChange = (index) => {
    setSelectedImageIndex(index);
  };
  const clickCreateRoom = async () => {
    const roomName = roomNameInput.value;
    const charName = charNameInput.value;
    const map = mapInput.current.value;
    const character = catImages[selectedImageIndex];

    const roomId = await createRoom({
      userId,
      roomName,
      charName,
      character,
      startingPoint:map1.startingPoint,
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
        <Title>創建你的房間!</Title>
        <CloseButton clickFunc={onClose} />

        <InputDiv>
          <label htmlFor="roomName">房間名稱</label>
          <input
            type="text"
            name="roomName"
            id="roomName"
            value={roomNameInput.value}
            onChange={roomNameInput.onChange}
          />
        </InputDiv>
        <InputDiv>
          <label htmlFor="name">角色名稱</label>
          <input
            type="text"
            name="name"
            id="name"
            value={charNameInput.value}
            onChange={charNameInput.onChange}
          />
        </InputDiv>
        <InputDiv>
          <p>地圖種類</p>
          <div>
            <label htmlFor="map">map1</label>
            <input
              type="radio"
              name="map"
              id="map"
              value="map1"
              ref={mapInput}
              checked
              readOnly
            />
          </div>
        </InputDiv>
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
