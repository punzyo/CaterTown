import Map1 from '../Maps/map1.jsx';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import CloseButton from '../CloseButton/index.jsx';
import Logo from '../Logo/index.jsx';
import SearchBar from '../SearchBar/index.jsx';
import InviteButton from '../InviteButton/index.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoomStatus } from '../../utils/hooks/useRoomStatus.js';
import { useUserState } from '../../utils/zustand.js';
import PublicMessage from './PublicMessage/index.jsx';
import { usePlayer } from '../../utils/hooks/useOherPlayer.js';
import { usePrivateMessages } from '../../utils/hooks/usePrivateMessages.js';
import { useUnreadMessages } from '../../utils/hooks/useUnreadMessages.js';
import { usePublicMessages } from '../../utils/hooks/usePublicMessages.js';
import { resetUnreadMessage } from '../../firebase/firestore.js';
import '@livekit/components-styles';
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
} from '@livekit/components-react';
import TracksManager from '../TracksManager/index.jsx';
import LocalTracks from '../Tracks/LocalTracks/index.jsx';
import TracksProvider  from '../Tracks/TracksProvider/index.jsx';
import MemberIcon from '../MemberIcon/index.jsx';
import OnlineStatus from '../OnlineStatus/index.jsx';

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
  position: fixed;
  bottom: 0;
  padding: 10px 40px;
  background-color: #202540;
  border-top: 1px solid white;
  z-index: 10;
`;
const BottomLeft = styled.div`
  display: flex;
  position: relative;
  gap: 15px;
  align-items: center;
`;
const SideBar = styled.div`
  width: 300px;
  height: calc(100% - ${bottomBarGHeight});
  position: fixed;
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

const ProfileWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 90%;
  border-radius: 5px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  .onlineBox {
    height: 100%;
    display: flex;
    align-items: end;
    p {
      margin-left: 20px;
    }
    font-size: 10px;
  }
`;
const ControlWrapper = styled.div`
  width: 260px;
  height: 90%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  .lk-control-bar {
    width: 100%;
    border-top: none;
    .lk-button {
      background-color: #aaa;
      border: 1px solid black;
    }
  }
`;

export default function GamePage() {
  const { roomId, roomName } = useParams();
  const [token, setToken] = useState(null);
  const liveKitUrl = import.meta.env.VITE_LIVEKIT_SERVER_URL;
  console.log(liveKitUrl);
  const { getUserData } = useUserState();
  const userId = getUserData().id;
  const [showSidebar, setShowSideBar] = useState(true);
  const onlineStatus = useRoomStatus({ userId, roomId });
  const playersData = usePlayer({ userId, roomId });
  const [playerCharName, setPlayerCharName] = useState(null);
  const players = playersData.users;
  const publicMessages = usePublicMessages(roomId);
  const [privateChannel, setPrivateChannel] = useState('');
  const [minimizeMessages, setMinimizeMessages] = useState(false);
  const [privateCharName, setPrivateCharName] = useState(null);
  const [isPublicChannel, setIsPublicChannel] = useState(true);

  const privateMessages = usePrivateMessages({
    userId,
    roomId,
    privateChannelId: privateChannel,
  });
  const unreadMessages = useUnreadMessages({
    userId,
    roomId,
    privateChannelId: privateChannel,
  });
  const navigate = useNavigate();
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [offlineMembers, setOfflineMembers] = useState([]);

  useEffect(() => {
    if (!players || !onlineStatus) return;
    const online = [];
    const offline = [];
    console.log(players);
    players.forEach((player) => {
      const isOnline = onlineStatus[player.userId]?.online || false;
      if (player.userId === userId) {
        isOnline ? online.unshift(player) : offline.unshift(player);
      } else {
        isOnline ? online.push(player) : offline.push(player);
      }
    });

    setOnlineMembers(online);
    setOfflineMembers(offline);
  }, [players, onlineStatus, userId]);

  const changeChannel = (playerId) => {
    setIsPublicChannel(false);
    setPrivateChannel(playerId);
  };
  const getToken = async ({ roomId, charName }) => {
    const response = await fetch(
      `http://localhost:3000/getToken?roomId=${encodeURIComponent(
        roomId
      )}&charName=${charName}`
    );
    const token = await response.text();
    console.log(token);
    setToken(token);
  };
  return (
    <Wrapper>
      <LiveKitRoom
        video={false}
        audio={false}
        token={token}
        serverUrl="wss://chouchouzoo-ffphmeoa.livekit.cloud"
        data-lk-theme="default"
        style={{ backgroundColor: 'inherit' }}
      >
        {/* <RoomAudioRenderer muted={false}/> */}
<TracksProvider></TracksProvider>
          <Map1
            players={players}
            playerCharName={playerCharName}
            setPlayerCharName={setPlayerCharName}
          />
          <BottomBar>
            <BottomLeft>
              <Logo />
              <TracksManager isLocal={true}>
                {(localTracks) => <LocalTracks tracks={localTracks} />}
              </TracksManager>
              <ProfileWrapper>
                <MemberIcon
                  image={onlineMembers[0]?.character}
                  isOnline={null}
                  unreadMessages={0}
                />
                <span>{playerCharName}</span>
                <div className="onlineBox">
                  <p>上線中</p>
                  <OnlineStatus isOnline={true} />
                </div>
              </ProfileWrapper>
              <ControlWrapper>
                <ControlBar
                  controls={{
                    camera: true,
                    microphone: true,
                    screenShare: true,
                    leave: false,
                  }}
                  saveUserChoices={true}
                  variation="minimal"
                />
              </ControlWrapper>

              <button
                onClick={() => getToken({ roomId, charName: playerCharName })}
              >
                加入多人通訊
              </button>
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
              <LeaveRoom
                onClick={() => {
                  navigate('/');
                }}
              >
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
              <MemberWrapper>
                <span>Online Members</span>
                {onlineMembers.map((player) => (
                  <MemberInfo
                    key={player.userId}
                    onClick={async () => {
                      if (player.userId === userId) return;
                      if (privateChannel === player.userId && !minimizeMessages)
                        return;
                      changeChannel(player.userId);
                      setPrivateCharName(player.charName);
                      setMinimizeMessages(false);
                      await resetUnreadMessage({
                        roomId,
                        userId,
                        privateChannelId: player.userId,
                      });
                    }}
                  >
                    <MemberIcon
                      image={player?.character}
                      isOnline={true}
                      unreadMessages={unreadMessages[player.userId]?.count}
                    />
                    <span>{player.charName}</span>
                  </MemberInfo>
                ))}
                <span>Offline Members</span>
                {offlineMembers.map((player) => (
                  <MemberInfo
                    key={player.userId}
                    onClick={async () => {
                      changeChannel(player.userId);
                      setPrivateCharName(player.charName);
                      setMinimizeMessages(false);
                      await resetUnreadMessage({
                        roomId,
                        userId,
                        privateChannelId: player.userId,
                      });
                    }}
                  >
                    <MemberIcon
                      image={player?.character}
                      isOnline={false}
                      unreadMessages={unreadMessages[player.userId]?.count}
                    />
                    <span>{player.charName}</span>
                  </MemberInfo>
                ))}
              </MemberWrapper>
            )}
            <PublicMessage
              userId={userId}
              playerCharName={playerCharName}
              roomId={roomId}
              publicMessages={publicMessages}
              isPublicChannel={isPublicChannel}
              setIsPublicChannel={setIsPublicChannel}
              privateChannel={privateChannel}
              setPrivateChannel={setPrivateChannel}
              privateMessages={privateMessages}
              privateCharName={privateCharName}
              minimizeMessages={minimizeMessages}
              setMinimizeMessages={setMinimizeMessages}
            />
          </SideBar>
      </LiveKitRoom>
    </Wrapper>
  );
}
