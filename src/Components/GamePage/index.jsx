import Map1 from '../Maps/map1.jsx';
import styled from 'styled-components';
import { useState } from 'react';
import CloseButton from '../CloseButton/index.jsx';
import Logo from '../Logo/index.jsx';
import SearchBar from '../SearchBar/index.jsx';
import InviteButton from '../InviteButton/index.jsx';
import { useParams } from 'react-router-dom';
import Cat from '../Cat/index.jsx';
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
const MemberWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MemberInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const MemberIcon = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  background-color: white;
  border: 1px solid #545c8f;
  border-radius: 50%;
  div:first-child {
    position: absolute;
    top: -3px;
    right: 7px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const OnlineStatus = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 4px;
  bottom: 0px;
  border:2px solid black;
  background-color: ${(props) => (props.$isOnline ? 'green' : 'gray')};;
  border-radius: 50%;
`;
export default function GamePage() {
  const { roomId, roomName } = useParams();
  const [showSidebar, setShowSideBar] = useState(true);
  const [player, setPlayer] = useState(null);
  return (
    <Wrapper>
      <Map1 setPlayer={setPlayer} />
      <BottomBar>
        <BottomLeft>
          <Logo />
        </BottomLeft>
        <div
          onClick={() => {
            setShowSideBar(true);
          }}
        >
          點我打開側邊
        </div>
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
        <MemberWrapper>
          <span>Members</span>
          {player &&
            player.map((player, index) => {
              return (
                <MemberInfo key={player.userId}>
                  <MemberIcon>
                    <Cat image={player.character} />
                    <OnlineStatus $isOnline={player.online}/>
                  </MemberIcon>
                  <span>{player.charName}</span>
                </MemberInfo>
              );
            })}
        </MemberWrapper>
      </SideBar>
    </Wrapper>
  );
}
