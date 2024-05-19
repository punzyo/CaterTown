import Map from './Maps/index';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoomStatus } from '@/utils/hooks/useRoomStatus.js';
import { useUserState } from '@/utils/zustand';
import { usePlayer } from '@/utils/hooks/usePlayer.js';
import '@livekit/components-styles';
import { ControlBar, LiveKitRoom } from '@livekit/components-react';
import LocalTracks from '@/Components/Tracks/LocalTracks/index';
import TracksProvider from '@/Components/Tracks/TracksProvider/index';
import { useGameSettings } from '@/utils/zustand';
import { useConditionalPullRequests } from '@/utils/hooks/useConditionalPullRequests.js';
import PlayerProfile from './PlayerProfile/index';
import { useBroadcasts } from '@/utils/hooks/useBroadcasts.js';
import Button from '@/Components/Buttons/Button/index';
import { usePullRequests } from '@/utils/zustand';
import ExitRoomIcon from '@/Components/Icons/ExitRoomIcon';
import GroupIcon from '@/Components/Icons/GroupIcon';
import Sidebar from './Sidebar/index';

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
  padding: 10px 25px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue1};

  z-index: 13;
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

const ExitRoom = styled.button`
  width: 70px;
  height: 60px;
  border-radius: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue4};
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
  background-color: ${({ theme }) => theme.colors.backgroundBlue4};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBlue3};
  }
  svg {
    width: 40px;
    height: 40px;
    fill: white;
  }
  .onlineCount {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    > div:first-of-type {
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
  const { user } = useUserState();
  const userId = user.id;

  const onlineStatus = useRoomStatus({ userId, roomId });
  const players = usePlayer(roomId);
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
    setToken(token);
  };
  const handleConnected = (isConnected) => {
    setIsConnected(isConnected);
    setIsConnecting(false);
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
        serverUrl={import.meta.env.VITE_LIVEKIT_CLOUD_URL}
        data-lk-theme="default"
        style={{ backgroundColor: 'inherit' }}
        onConnected={() => {
          handleConnected(true);
        }}
        onDisconnected={() => {
          handleConnected(false);
        }}
      >
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
            <LocalTracks />
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
                    onClickFunc={() =>
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
              <div className="onlineCount">
                <div></div>
                <span>{onlineMembers.length}</span>
              </div>
            </Group>
            <ExitRoom
              onClick={() => {
                navigate('/home');
              }}
            >
              <ExitRoomIcon />
            </ExitRoom>
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
