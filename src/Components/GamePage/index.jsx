import Map1 from '../Maps/map1.jsx';
import styled from 'styled-components';
import { useState } from 'react';
import CloseButton from '../CloseButton/index.jsx';
import Logo from '../Logo/index.jsx';
import SearchBar from '../SearchBar/index.jsx';
import InviteButton from '../InviteButton/index.jsx';
import { useParams } from 'react-router-dom';
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
  padding:15px;
  top: 0;
  background-color: #202540;
  button {
    color: white;
  }
`;
const Title = styled.div`
display:flex;
align-items: center;
gap:10px;
margin-bottom: 30px;
`
const LeaveRoom = styled.button`
  width: 50px;
  background-color: inherit;
  color: white;
  cursor: pointer;
`;
const MemberList = styled.div`

`
export default function GamePage() {
  const { roomId, roomName } = useParams();
  console.log(roomId, roomName);
  const [showSidebar, setShowSideBar] = useState(true);
  return (
    <Wrapper>
      <Map1 />
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
          <InviteButton roomId={roomId} roomName={roomName}/>
          <CloseButton
          clickFunc={() => {
            setShowSideBar(false);
          }}
        />
        </Title>
       <MemberList/>
        <SearchBar/>
      </SideBar>
    </Wrapper>
  );
}
