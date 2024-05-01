import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { catImages } from '../../../assets/charNames.js';
import { useUserState } from '../../../utils/zustand.js';
import { useFormInput } from '../../../utils/hooks/useFormInput.js';
import { addRoomToUser, JoinRoom } from '../../../firebase/firestore.js';
import Button from '../../Buttons/Button/index.jsx';
import styled from 'styled-components';
import SimpleSlider from '../../Silder/index.jsx';
import Header from '../../Header/index.jsx';
import { map2 } from '../GamePage/Maps/map2.js';
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  background-color: #282d4e;
  color: #fff;
`;

const MainWrapper = styled.div`
  width: 800px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
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
  width: 100%;
  margin-top: 30px;
  display: flex;
  gap: 20px;
`;
const SilderWrapper = styled.div`
  background-color: white;
  position: relative;
  border-radius: 10px;
  border: 1px solid black;
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
const JoinButton = styled.div`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  font-weight: bold;
  margin-top: 30px;
`;
export default function InvitePage() {
  const navigate = useNavigate();
  const charNameInput = useFormInput('');
  const { user } = useUserState();
  if(!user)navigate('/signin')
  const { roomId, roomName } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleSlideChange = (index) => {
    setSelectedImageIndex(index);
  };
  const handleJoinRoom = async () => {
    const userId = user.id;
    const charName = charNameInput.value;
    const character = catImages[selectedImageIndex];
    await JoinRoom({
      roomId,
      user: {
        userId,
        charName,
        character,
        position: map2.startingPoint,
      },
    });
    const joinedRoom = await addRoomToUser({
      userId,
      roomName,
      roomId,
      character,
      charName,
      isCreater:false
    });
    if (joinedRoom) {
      charNameInput.clear();
      navigate(`/chouchouzoo/${roomId}/${roomName}`);
    }
  };
  return (
    <Wrapper>
      <Header/>
      <MainWrapper>
        <Title>您已被邀請至房間 {roomName}!</Title>

        <span>請選擇角色!</span>
        <GameSettings>
          <SilderWrapper>
            <SimpleSlider onSlideChange={handleSlideChange} data={catImages} />
          </SilderWrapper>
          <div>
            <div>
              <label htmlFor="name">角色名稱</label>
              <input
                type="text"
                name="name"
                id="name"
                value={charNameInput.value}
                onChange={charNameInput.onChange}
              />
            </div>
          </div>
        </GameSettings>
        <JoinButton>
          <Button clickFunc={handleJoinRoom} content={'加入房間'} />
        </JoinButton>
      </MainWrapper>
    </Wrapper>
  );
}
