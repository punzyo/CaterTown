import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { getUserDatabyId, getUserRoomsbyId } from '@/firebase/firestore';
import { catsXPositions, catsYPositions } from '../../assets/charNames';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../utils/zustand';
import Button from '../Button';
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
    img {
      width: 50px;
      height: 50px;
      border-radius: 20%;
      object-fit: cover;
    }
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
const SearchBar = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 30px 0px 30px;
  background-color: #282d4e;
`;
const InputWrapper = styled.div`
  ${containerStyles}
  cursor: auto;
  width: 200px;
  height: 40px;
  border: 1px solid #909ce2;
  display: flex;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
    svg {
      color: #fff;
      width: 35px;
      height: 20px;
    }
  }
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fff;
    background-color: inherit;
    &::placeholder {
      font-weight: 500;
    }
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
    .right{
      display:flex;
      align-items: center;
      gap:10px;
      .inviteIcon{
        width:24px;
        height:24px;
        cursor: pointer;
      }
    }
    
  }
`;
export default function HomePage() {
  const { getUserData } = useUserState();
  const user = getUserData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userId, setUserId] = useState('yili');
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

  const inviteFriends = ({roomId,roomName}) => {
    const textToCopy = `http://localhost:5173/invite/${roomId}/${roomName}`;
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert('邀請碼已複製到剪貼簿!')
    })
    .catch(err => {
      console.error('複製邀請網址錯誤', err);
    });
  }
  return (
    <Wrapper
      onClick={() => {
        if (dialogOpen) closeDialog();
      }}
    >
      <Header>
        <div className="left">
          <img src="/images/logo.png" alt="logo" />
          <span>ChouChouZoo</span>
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
      <SearchBar>
        <InputWrapper>
          <div className="icon">
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <input type="text" placeholder="Search" />
        </InputWrapper>
      </SearchBar>
      <MainPage>
        <RoomWrapper>
          {userRooms &&
            userRooms.map((room, index) => (
              <Room key={index}>
                <span className="mapName">{room.roomName}</span>
                <div
                  className="top"
                  onClick={() => {
                    navigate(`/chouchouzoo/${room.id}`);
                  }}
                ></div>
                <div className="bottom">
                  <div>
                    <RoomCharacter
                      $backgroundImage={`${room.character}`}
                    ></RoomCharacter>
                    <span>{room.charName}</span>
                  </div>
                  <div className='right'>
                    <span className="date">
                      {new Date(room.createDate.toDate())
                        .toISOString()
                        .slice(0, 10)}
                    </span>
                    邀請朋友
                    <span className='inviteIcon' onClick={()=>{inviteFriends({roomId:room.id,roomName:room.roomName})}}> 
                        
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
                          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                        />
                      </svg>
                    </span>
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
