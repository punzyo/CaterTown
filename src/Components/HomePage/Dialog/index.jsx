import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useFormInput } from '../../../utils/hooks/useFormInput';
import SimpleSlider from '../../Silder';
import { startingPoint } from '../../Maps/map1';
import { createRoom, addRoomToUser } from '../../../firebase/firestore';
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
const DialogWrapper = styled.div`
  width: 400px;
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: inherit;
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
const catImages = [
  'black_0',
  'black_1',
  'black_2',
  'black_3',
  'black_4',
  'blue_0',
  'blue_1',
  'blue_2',
  'blue_3',
  'brown_0',
  'brown_1',
  'brown_2',
  'brown_3',
  'brown_4',
  'brown_5',
  'brown_6',
  'brown_7',
  'brown_8',
  'calico_0',
  'cotton_candy_blue_0',
  'cotton_candy_pink_0',
  'creme_0',
  'creme_1',
  'dark_0',
  'game_boy_0',
  'game_boy_1',
  'game_boy_2',
  'ghost_0',
  'gold_0',
  'grey_0',
  'grey_1',
  'grey_2',
  'hairless_0',
  'hairless_1',
  'indigo_0',
  'orange_0',
  'orange_1',
  'orange_2',
  'orange_3',
  'peach_0',
  'pink_0',
  'radioactive_0',
  'red_0',
  'red_1',
  'seal_point_0',
  'teal_0',
  'white_0',
  'white_grey_0',
  'white_grey_1',
  'yellow_0',
];
function Dialog({ onClose, userId }) {
  const roomNameInput = useFormInput();
  const nameInput = useFormInput();
  const mapInput = useRef();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleSlideChange = (index) => {
    setSelectedImageIndex(index);
    console.log('3330', index);
  };
  const clickCreateRoom = async () => {
    const roomName = roomNameInput.value;
    const userName = nameInput.value;
    const map = mapInput.current.value;
    const character = catImages[selectedImageIndex];

    const roomId = await createRoom({
      userId,
      roomName,
      userName,
      character,
      startingPoint,
      map,
    });
    const isUpdated = await addRoomToUser({ userId, roomId });
    if (isUpdated) clearInput();
  };
  const clearInput = () => {
    roomNameInput.clear();
    nameInput.clear();
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
        <CloseButton onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </CloseButton>
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
            value={nameInput.value}
            onChange={nameInput.onChange}
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
          <SimpleSlider onSlideChange={handleSlideChange} data={catImages} />
        </SliderWrapper>
        <CreateRoom>
          <button onClick={clickCreateRoom}>建立房間</button>
        </CreateRoom>
      </DialogWrapper>
    </div>
  );
}

export default Dialog;
