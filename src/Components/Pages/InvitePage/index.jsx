import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { catImages } from '@/assets/charNames';
import { useUserState } from '@/utils/zustand.js';
import useValidatedInput from '@/utils/hooks/useValidatedInput.js';
import {
  addRoomToUser,
  checkUserRoom,
  initPlayerData,
  isNameAvailable,
} from '@/utils/firebase/firestore.js';
import Button from '@/Components/Buttons/Button/index.jsx';
import styled from 'styled-components';
import SimpleSlider from '@/Components/Silder/index.jsx';
import Header from '@/Components/Header/index.jsx';
import { map2 } from '../GamePage/Maps/map2.js';
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  background-color: #282d4e;
  color: #fff;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  gap: 20px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 40px;
  line-height: 48px;
  font-weight: 700;
  letter-spacing: 6px;
  text-align: center;
  margin-bottom: 40px;
`;
const GameSettings = styled.div`
  width: 500px;
  padding: 20px 30px;
  background-color: #333a64;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  .settings {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 0 auto;
  }
`;
const SilderWrapper = styled.div`
  background-image: url('/images/floor.png');
  background-color: white;
  position: relative;
  border-radius: 10px;
  width: 320px;
  height: 180px;

  color: white;
  .slick-slider {
    display: flex;
    align-items: center;
    position: static;
    .slick-list {
      width: 100%;
    }
    height: 100%;
    button:before {
      color: white;
    }
    .slick-prev {
      left: -45px;
    }
    .slick-next {
      right: -45px;
    }
  }
`;
const InputWrapper = styled.div`
  width: 100%;
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
const JoinButton = styled.div`
  > button {
    width: 90px;
  }
  height: 40px;
  font-size: 14px;
  border-radius: 10px;
  font-weight: bold;
  margin: 30px auto 0;
`;
export default function InvitePage() {
  const navigate = useNavigate();
  const charNameInput = useValidatedInput('', /^[^*%]+$/, 15);
  const { user } = useUserState();

  const userId = user.id;
  const { roomId, roomName } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [roomChecked, setRoomChecked] = useState(false);

  useEffect(() => {
    if (!roomId || !userId) return;
    (async () => {
      const isInRoom = await checkUserRoom({ roomId, userId });
      if (isInRoom) {
        navigate(`/catertown/${roomId}/${roomName}`);
      }
      setRoomChecked(true);
    })();
  }, [roomId, userId]);

  const handleSlideChange = (index) => {
    setSelectedImageIndex(index);
  };
  const handleJoinRoom = async () => {
    if (!charNameInput.isValid) {
      alert('名稱不符合規定');
      return;
    }
    const userId = user.id;
    const charName = charNameInput.value;
    const character = catImages[selectedImageIndex];
    const canUseName = await isNameAvailable({ roomId, charName });
    if (!canUseName) {
      alert('此名稱已被使用!');
      return;
    }
    await initPlayerData({
      userId,
      roomId,
      position: map2.startingPoint,
      charName,
      character,
      permissionLevel: 'member',
    });
    const joinedRoom = await addRoomToUser({
      userId,
      roomName,
      roomId,
      character,
      charName,
      isCreator: false,
    });
    if (joinedRoom) {
      charNameInput.clear();
      navigate(`/catertown/${roomId}/${roomName}`);
    }
  };
  return (
    <>
      {roomChecked && (
        <Wrapper>
          <Header />
          <MainWrapper>
            <Title>您已被邀請至房間 {roomName}!</Title>
            <GameSettings>
              <div className="settings">
                <div>
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
                </div>
                <span>請選擇貓咪</span>
                <SilderWrapper>
                  <SimpleSlider
                    onSlideChange={handleSlideChange}
                    data={catImages}
                  />
                </SilderWrapper>
              </div>
              <JoinButton>
                <Button onClickFunc={handleJoinRoom} content={'加入房間'} />
              </JoinButton>
            </GameSettings>
          </MainWrapper>
        </Wrapper>
      )}
    </>
  );
}
