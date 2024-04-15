import Map1 from '../Maps/map1.jsx';
import styled from 'styled-components';
import { useState } from 'react';
import CloseButton from '../CloseButton/index.jsx';
import Logo from '../Logo/index.jsx';
import SearchBar from '../SearchBar/index.jsx';
import InviteButton from '../InviteButton/index.jsx';
import { useParams } from 'react-router-dom';
import MemberList from './MemberList/index.jsx';
import { useRoomStatus } from '../../utils/hooks/useRoomStatus.js';
import { useUserState } from '../../utils/zustand.js';
const bottomBarGHeight = '100px';
const Wrapper = styled.main`
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: gray;
`;
const BottomBar = styled.div`
  width: 100%;
  height: ${bottomBarGHeight};
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  padding: 10px 40px;
  background-color: #202540;
  border-top: 1px solid white;
`;
const BottomLeft = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;
const SideBar = styled.div`
  width: 300px;
  height: calc(100% - ${bottomBarGHeight});
  position: absolute;
  right: ${(props) => (props.$isOpen ? '0' : '-300px')};
  transition: right 0.3s ease-in-out;
  padding: 15px;
  top: 0;
  background-color: #202540;
  button {
    color: white;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;
const LeaveRoom = styled.button`
  width: 50px;
  background-color: inherit;
  color: white;
  cursor: pointer;
`;

const GroupIcon = styled.button`
  width: 50px;
  background-color: inherit;
  cursor: pointer;
  svg {
    fill: white;
  }
`;

export default function GamePage() {
  const { roomId, roomName } = useParams();
  const { getUserData } = useUserState();
  const userId = getUserData().id;
  const [showSidebar, setShowSideBar] = useState(true);
  const [players, setPlayers] = useState(null);
  const onlineStatus = useRoomStatus({ userId, roomId });

  return (
    <Wrapper>
      <Map1 setPlayer={setPlayers} />
      <BottomBar>
        <BottomLeft>
          <Logo />
        </BottomLeft>
        <BottomLeft>
          <GroupIcon
            onClick={() => {
              setShowSideBar((prevState) => !prevState);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
            </svg>
          </GroupIcon>
          <LeaveRoom>
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
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </LeaveRoom>
        </BottomLeft>
      </BottomBar>

      <SideBar $isOpen={showSidebar}>
        <Title>
          {roomName}
          <InviteButton roomId={roomId} roomName={roomName} />
          <CloseButton
            clickFunc={() => {
              setShowSideBar(false);
            }}
          />
        </Title>
        <SearchBar />
        {players && userId && onlineStatus && (
          <MemberList
            userId={userId}
            players={players}
            onlineStatus={onlineStatus}
          />
        )}
      </SideBar>
    </Wrapper>
  );
}
