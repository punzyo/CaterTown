import styled, { css } from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import Dialog from './Dialog';
import { useUserRooms } from '../../../utils/hooks/useUserRooms';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../../utils/zustand';
import Button from '../../Buttons/Button';
import Logo from '../../Logo';
import InviteButton from '../../Buttons/InviteButton';
import SearchBar from '../../SearchBar';
import Cat from '../../Cat';
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
  padding: 10px 20px;
  background-color: #333a64;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    gap: 10px;
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
    height: 100%;
    gap:5px;
  }
  input {
    width: 50px;
  }
`;
const Profile = styled.button`
  ${containerStyles}
  min-width: 150px;
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
    width: 36px;
    height: 36px;
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
const Room = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .top {
    height: 80%;
    background-image: url(/images/map2.png);
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
const SignOut = styled.div`
  ${containerStyles}
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #4979bc;
  color: #fff;
  &:hover {
    background-color: #558cda;
  }
  button {
    font-size: 16px;
    font-weight: bold;
    background-color: inherit;
    color: #fff;
  }
`;

export default function HomePage() {
  const { user, setUser, resetUser } = useUserState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const userId = user.id;
  const idInput = useRef(null);
  const userRooms = useUserRooms(userId);
  const navigate = useNavigate();
  if (!user) navigate('/');
  const openDialog = () => {
    console.log('open');
    setDialogOpen(true);
  };
  const closeDialog = () => setDialogOpen(false);
  const changeUser = () => {
    setUser({ id: idInput.current.value, name: ''.current.value });
  };

  return (
    <Wrapper
      onClick={() => {
        if (dialogOpen) closeDialog();
      }}
    >
      <Header>
        <div className="left">
          <Logo></Logo>
          <span>Cater town</span>
        </div>
        <input type="text" placeholder="id" ref={idInput} />
        <button onClick={changeUser}>換人</button>
        <div className="right">
          <Profile>
            <div className="userimg">
              <img src="/images/cat-tabby.svg" alt="" />
            </div>
            <div>
              <span>{user.name}</span>
            </div>
          </Profile>
          <SignOut
            onClick={() => {
              navigate('/signup');
            }}
          >
            <button onClick={resetUser}>Sign out</button>
          </SignOut>
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
                    <Cat image={room.character}></Cat>
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
