import Map from './Maps/map.jsx';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Logo from '../../Logo/index.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoomStatus } from '../../../utils/hooks/useRoomStatus.js';
import { useUserState } from '../../../utils/zustand.js';
import { usePlayer } from '../../../utils/hooks/useOherPlayer.js';
import '@livekit/components-styles';
import { ControlBar, LiveKitRoom } from '@livekit/components-react';
import TracksManager from '../../TracksManager/index.jsx';
import LocalTracks from '../../Tracks/LocalTracks/index.jsx';
import TracksProvider from '../../Tracks/TracksProvider/index.jsx';
import { useGameSettings } from '../../../utils/zustand.js';
import { useConditionalPullRequests } from '../../../utils/hooks/useConditionalPullRequests.js';
import PlayerProfile from './PlayerProfile/index.jsx';
import { useBroadcasts } from '../../../utils/hooks/useBroadcasts.js';
import Button from '../../Buttons/Button/index.jsx';
import { usePullRequests } from '../../../utils/zustand.js';
import ExitRoomIcon from '../../Icons/ExitRoomIcon/index.jsx';
import GroupIcon from '../../Icons/GroupIcon/index.jsx';
import Sidebar from './Sidebar/index.jsx';

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
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  padding: 10px 40px;
  background-color: #202540;

  z-index: 11;
`;
const BottomContent = styled.div`
  display: flex;
  position: relative;
  gap: 15px;
  align-items: center;
`;
const BottomRight = styled.div`
  display: flex;
  position: relative;
  gap: 15px;
  align-items: center;
`;

const ExirRoom = styled.button`
  width: 70px;
  height: 60px;
  border-radius: 10px;
  padding: 10px;
  background-color: #333a64;
  &:hover {
    background-color: #dd293f;
  }
  svg {
    width: 40px;
    height: 40px;
  }
  cursor: pointer;
`;

const Group = styled.button`
position: relative;
display: flex;
align-items: center;
gap: 10px;
  height: 60px;
  border-radius: 10px;
  padding: 10px;
  background-color: #333a64;
  cursor: pointer;
  &:hover {
    background-color: #3e477c;
  }
  svg {
    width: 40px;
    height: 40px;
    fill: white;
  }
  .onlineCount{
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    >div:first-of-type{
      width: 12px;
      height: 12px;
      background-color: green;
      border-radius: 50%;
    }
  }
`;

const ControlWrapper = styled.div`
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

const JoinButton = styled.div`
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
  height: 40px;
  border-radius: 5px;
  min-width: 90px;
`;

export default function GamePage() {
  const { roomId, roomName } = useParams();
  const [token, setToken] = useState(null);
  const liveKitUrl = import.meta.env.VITE_LIVEKIT_SERVER_URL;
  const { user, loginChecked } = useUserState();
  const userId = user.id;

  const onlineStatus = useRoomStatus({ userId, roomId });
  const players = usePlayer( roomId );
  const [playerCharName, setPlayerCharName] = useState(null);

  const [gitHubId, setGitHubId] = useState(null);
  const [permissionLevel, setPermissionLevel] = useState(null);

  const navigate = useNavigate();
  const [onlineMembers, setOnlineMembers] = useState([]);
  const [offlineMembers, setOfflineMembers] = useState([]);
  const { showSidebar, setShowSidebar } = useGameSettings();
  const openPullRequests = useConditionalPullRequests({
    userId,
    roomId,
    gitHubId,
    permissionLevel,
  });
  const { prGitHubId, setShowPullRequests, setPullRequests } =
    usePullRequests();

  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const broadcasts = useBroadcasts({ roomId });
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    setPullRequests(openPullRequests[prGitHubId]?.prs);
    if (!openPullRequests[prGitHubId]) {
      setShowPullRequests(false);
    }
  }, [prGitHubId, openPullRequests]);

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


  const getToken = async ({ roomId, charName }) => {
    if (isConnecting) return;
    setIsConnecting(true);
    const response = await fetch(
      `${liveKitUrl}/getToken?roomId=${encodeURIComponent(
        roomId
      )}&charName=${charName}`
    );
    const token = await response.text();
    console.log(token);
    setToken(token);
  };
  return (
    <Wrapper
      onClick={() => {
        setShowProfile(false);
      }}
    >
      <LiveKitRoom
        video={false}
        audio={false}
        token={token}
        serverUrl="wss://chouchouzoo-ffphmeoa.livekit.cloud"
        data-lk-theme="default"
        style={{ backgroundColor: 'inherit' }}
        onConnected={() => {
          setIsConnected(true);
          setIsConnecting(false);
        }}
        onDisconnected={() => {
          setIsConnected(false);
          setIsConnecting(false);
        }}
      >
        {/* <RoomAudioRenderer muted={false}/> */}
        <TracksProvider></TracksProvider>
        <Map
          broadcasts={broadcasts}
          players={players}
          playerCharName={playerCharName}
          setPlayerCharName={setPlayerCharName}
          permissionLevel={permissionLevel}
          setPermissionLevel={setPermissionLevel}
          gitHubId={gitHubId}
          setGitHubId={setGitHubId}
          pullRequests={openPullRequests}
        />
        <BottomBar>
          <BottomContent>
            <Logo />
            <TracksManager isLocal={true}>
              {(localTracks) => <LocalTracks tracks={localTracks} />}
            </TracksManager>
            <PlayerProfile
              showProfile={showProfile}
              setShowProfile={setShowProfile}
              players={players}
              roomId={roomId}
              roomName={roomName}
              userId={userId}
              image={onlineMembers[0]?.character}
              playerCharName={playerCharName}
              gitHubId={gitHubId}
              charName={playerCharName}
              permissionLevel={permissionLevel}
            />
            <ControlWrapper>
              {isConnected && (
                <ControlBar
                  controls={{
                    camera: true,
                    microphone: true,
                    screenShare: true,
                    leave: true,
                  }}
                  saveUserChoices={true}
                  variation="minimal"
                />
              )}
              {!isConnected && (
                <JoinButton>
                  <Button
                    clickFunc={() =>
                      getToken({ roomId, charName: playerCharName })
                    }
                    content={isConnecting ? 'Loading...' : '多人通訊'}
                  />
                </JoinButton>
              )}
            </ControlWrapper>
          </BottomContent>
          <BottomRight>
            <Group
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            >
              <GroupIcon />
              <div className='onlineCount'>
                <div></div>
                <span>{onlineMembers.length}</span>
              </div>
            </Group>
            <ExirRoom
              onClick={() => {
                navigate('/home');
              }}
            >
              <ExitRoomIcon />
            </ExirRoom>
          </BottomRight>
        </BottomBar>
        <Sidebar
          userId={userId}
          roomId={roomId}
          onlineMembers={onlineMembers}
          offlineMembers={offlineMembers}
          players={players}
          playerCharName={playerCharName}
          roomName={roomName}
          onlineStatus={onlineStatus}
        />
      </LiveKitRoom>
    </Wrapper>
  );
}
