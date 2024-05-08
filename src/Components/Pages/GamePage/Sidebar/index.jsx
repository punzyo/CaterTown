import styled from 'styled-components';
import PullRequests from '../PullRequests';
import InviteButton from '../../../Buttons/InviteButton';
import CloseButton from '../../../Buttons/CloseButton';
import { useGameSettings } from '../../../../utils/zustand';
import MemberIcon from '../../../MemberIcon';
import PublicMessage from '../PublicMessage';
import SearchBar from '../../../SearchBar';
import { useState } from 'react';
import { usePrivateMessages } from '../../../../utils/hooks/usePrivateMessages';
import { useUnreadMessages } from '../../../../utils/hooks/useUnreadMessages';
import { usePublicMessages } from '../../../../utils/hooks/usePublicMessages';
import { resetUnreadMessage } from '../../../../firebase/firestore';

const Wrapper = styled.div`
  width: 300px;
  height: calc(100% - 100px);
  position: fixed;
  right: ${(props) => (props.$isOpen ? '0' : '-300px')};
  transition: right 0.3s ease-in-out;
  padding: 15px;
  top: 0;
  background-color: #202540;
  z-index: ${(props) => (props.$isFullScreen ? '5' : '10')};
  border-bottom: 1px solid #3e477c;
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
  border-radius: 5px;
  &:hover {
    background-color: #333a64;
    cursor: pointer;
  }
`;
const MemberIconWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;
export default function Sidebar({
  userId,
  roomId,
  onlineMembers,
  offlineMembers,
  players,
  playerCharName,
  roomName,
  onlineStatus,
}) {
  const { isFullScreen, showSidebar, setShowSidebar } = useGameSettings();
  const [privateChannel, setPrivateChannel] = useState('');
  const [minimizeMessages, setMinimizeMessages] = useState(true);
  const publicMessages = usePublicMessages(roomId);
  const [isPublicChannel, setIsPublicChannel] = useState(true);
  const [privateCharName, setPrivateCharName] = useState(null);
  const privateMessages = usePrivateMessages({
    userId,
    roomId,
    privateChannelId: privateChannel,
  });
  const unreadMessages = useUnreadMessages({
    userId,
    roomId,
    privateChannelId: privateChannel,
    isPublicChannel,
    minimizeMessages,
  });
  const changeChannel = (playerId) => {
    setIsPublicChannel(false);
    setPrivateChannel(playerId);
  };
  return (
    <Wrapper $isOpen={showSidebar} $isFullScreen={isFullScreen}>
      <PullRequests></PullRequests>
      <Title>
        {roomName}
        <InviteButton
          link={`${window.location.origin}/invite/${roomId}/${roomName}`}
          message="邀請連結已複製!"
        />
        <CloseButton
          clickFunc={() => {
            setShowSidebar(false);
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

                changeChannel(player.userId);
                setPrivateCharName(player.charName);
                setMinimizeMessages(false);
                await resetUnreadMessage({
                  roomId,
                  userId,
                  privateChannelId: player.userId,
                });
                await resetUnreadMessage({
                  roomId,
                  userId,
                  privateChannelId: privateChannel,
                });
              }}
            >
              <MemberIconWrapper>
                <MemberIcon
                  image={player?.character}
                  isOnline={true}
                  unreadMessages={unreadMessages[player.userId]?.count}
                  background={true}
                />
              </MemberIconWrapper>
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
                await resetUnreadMessage({
                  roomId,
                  userId,
                  privateChannelId: privateChannel,
                });
              }}
            >
              <MemberIconWrapper>
                <MemberIcon
                  image={player?.character}
                  isOnline={false}
                  unreadMessages={unreadMessages[player.userId]?.count}
                  background={true}
                />
              </MemberIconWrapper>
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
        unreadMessages={unreadMessages}
      />
    </Wrapper>
  );
}