import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { getUserDatabyId, getUserRoomsbyId } from '@/firebase/firestore';
import { catsXPositions, catsYPositions } from '../../assets/charNames';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../utils/zustand';
import Button from '../Button';
import Logo from '../Logo';
import InviteButton from '../InviteButton';
import SearchBar from '../SearchBar';
const containerStyles = css`
  border-radius: 10px;
  font-size: 16px;
  padding: 5px 10px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background-color 200ms ease 0s, border-color 200ms ease 0s;
`;
const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
`;
const Header = styled.header`
  width: 100%;
  height: 80px;
  padding: 10px 30px;
  background-color: #333a64;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    gap: 50px;
    width: 400px;
    height: 100%;
    span {
      color: #fff;
      font-size: 50px;
      letter-spacing: 6px;
    }
  }
  .right {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 400px;
    height: 100%;
  }
`;
const Profile = styled.button`
  ${containerStyles}
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: inherit;
  color: #fff;
  &:hover {
    background-color: #545c8f;
  }
  .userimg {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const CreateSpace = styled.div`
  ${containerStyles}
  width: 150px;
  height: 50px;
`;
const SearchWrapper = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 30px 0px 30px;
  background-color: #282d4e;
  .inputWrapper {
    width: 200px;
  }
`;
const MainPage = styled.div`
  background-color: #282d4e;
  height: 100%;
`;
const RoomWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px 50px;
  gap: 60px;
  .mapName {
    padding: 0 5px;
    font-weight: 700;
    color: #fff;
  }
`;
const RoomCharacter = styled.div`
  width: 60px;
  height: 60px;
  background-position: ${catsXPositions[0]} ${catsYPositions.down};
  background-size: 2048px 1088px;
  background-image: url(/images/animals/${(props) =>
    props.$backgroundImage}.png);
`;

const Room = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .top {
    height: 80%;
    background-image: url(/images/map1.png);
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    cursor: pointer;
  }
  .bottom {
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    div {
      display: flex;
      align-items: center;
    }
    .right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;
export default function HomePage() {
  const { getUserData } = useUserState();
  const user = getUserData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const userId = user.id;
  const [userData, setUserData] = useState(null);
  const [userRooms, setUserRooms] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      //await getUserDatabyId(userId)
      const roomData = await getUserRoomsbyId(userId);
      setUserRooms(roomData);
    };
    getUserData();
  }, [userId]);
  const openDialog = () => {
    console.log('open');
    setDialogOpen(true);
  };
  const closeDialog = () => setDialogOpen(false);

  return (
    <Wrapper
      onClick={() => {
        if (dialogOpen) closeDialog();
      }}
    >
      <Header>
        <div className="left">
          <Logo>
            <span>ChouChouZoo</span>
          </Logo>
        </div>
        <div className="right">
          <Profile>
            <div className="userimg">
              <img src="/images/profile.jpg" alt="" />
            </div>
            <div>
              <span>{user.name}</span>
            </div>
          </Profile>
          <CreateSpace>
            <Button clickFunc={openDialog} content={'Create space'}></Button>
          </CreateSpace>
        </div>
      </Header>
      <SearchWrapper>
        <div className="inputWrapper">
          <SearchBar />
        </div>
      </SearchWrapper>
      <MainPage>
        <RoomWrapper>
          {userRooms &&
            userRooms.map((room, index) => (
              <Room key={index}>
                <span className="mapName">{room.roomName}</span>
                <div
                  className="top"
                  onClick={() => {
                    navigate(`/chouchouzoo/${room.id}/${room.roomName}`);
                  }}
                ></div>
                <div className="bottom">
                  <div>
                    <RoomCharacter
                      $backgroundImage={`${room.character}`}
                    ></RoomCharacter>
                    <span>{room.charName}</span>
                  </div>
                  <div className="right">
                    <span className="date">
                      {new Date(room.joinDate.toDate())
                        .toISOString()
                        .slice(0, 10)}
                    </span>
                    邀請朋友
                    <InviteButton roomId={room.id} roomName={room.roomName} />
                  </div>
                </div>
              </Room>
            ))}
        </RoomWrapper>
      </MainPage>
      {dialogOpen && <Dialog onClose={closeDialog} userId={userId} />}
    </Wrapper>
  );
}
