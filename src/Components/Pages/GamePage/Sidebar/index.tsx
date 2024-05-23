import styled from 'styled-components';
import PullRequests from '../PullRequests';
import InviteButton from '@/Components/Buttons/InviteButton';
import CloseButton from '@/Components/Buttons/CloseButton';
import { useGameSettings } from '@/utils/zustand';
import MemberInfo from './MemberInfo';
import MessageWindow from '@/Components/Pages/GamePage/MessageWindow';
import SearchBar from '@/Components/SearchBar';
import { useState, useMemo } from 'react';
import { usePrivateMessages } from '@/utils/hooks/usePrivateMessages';
import { useUnreadMessages } from '@/utils/hooks/useUnreadMessages';
import { usePublicMessages } from '@/utils/hooks/usePublicMessages';
import type { PlayerType } from '@/types';
interface WrapperProps {
  $isOpen: boolean;
  $isFullScreen: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  width: 300px;
  height: calc(100% - 100px);
  position: fixed;
  right: ${({ $isOpen }) => ($isOpen ? '0' : '-300px')};
  transition: right 0.3s ease-in-out;
  padding: 15px;
  top: 0;
  background-color: ${({ theme }) => theme.colors.backgroundBlue1};
  z-index: ${({ $isFullScreen }) => ($isFullScreen ? '5' : '12')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderBlue0};

  button {
    color: white;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 30px;
`;
const MemberWrapper = styled.div`
  height: calc(100% - 120px);
  padding-bottom: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;
interface SidebarProps {
  userId: string;
  roomId: string;
  onlineMembers: PlayerType[];
  offlineMembers: PlayerType[];
  players: PlayerType[];
  playerCharName: string;
  roomName: string;
  onlineStatus: { [key: string]: { online: boolean } };
}
export default function Sidebar({
  userId,
  roomId,
  onlineMembers,
  offlineMembers,
  players,
  playerCharName,
  roomName,
  onlineStatus,
}: SidebarProps) {
  const { isFullScreen, showSidebar, setShowSidebar } = useGameSettings();
  const [privateChannel, setPrivateChannel] = useState('');
  const [minimizeMessages, setMinimizeMessages] = useState(true);
  const publicMessages = usePublicMessages(roomId);
  const [isPublicChannel, setIsPublicChannel] = useState(true);
  const [privateCharName, setPrivateCharName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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
  const changeChannel = (playerId: string) => {
    setIsPublicChannel(false);
    setPrivateChannel(playerId);
  };
  const filteredOnlineMembers = useMemo(() => {
    return searchTerm
      ? onlineMembers.filter((member) =>
          member.charName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : onlineMembers;
  }, [onlineMembers, searchTerm]);

  const filteredOfflineMembers = useMemo(() => {
    return searchTerm
      ? offlineMembers.filter((member) =>
          member.charName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : offlineMembers;
  }, [offlineMembers, searchTerm]);
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
          onClickFunc={() => {
            setShowSidebar(false);
          }}
        />
      </Title>
      <SearchBar
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="搜尋成員"
      />
      {players && userId && onlineStatus && (
        <MemberWrapper>
          <span>上線中 - {filteredOnlineMembers.length}</span>
          {filteredOnlineMembers.map((player) => (
            <MemberInfo
              key={player.userId}
              member={player}
              userId={userId}
              isOnline={true}
              changeChannel={changeChannel}
              roomId={roomId}
              setPrivateCharName={setPrivateCharName}
              setMinimizeMessages={setMinimizeMessages}
              privateChannel={privateChannel}
              unreadMessages={unreadMessages}
            />
          ))}
          <span>離線中 - {filteredOfflineMembers.length}</span>
          {filteredOfflineMembers.map((player) => (
            <MemberInfo
              key={player.userId}
              member={player}
              userId={userId}
              isOnline={false}
              changeChannel={changeChannel}
              roomId={roomId}
              setPrivateCharName={setPrivateCharName}
              setMinimizeMessages={setMinimizeMessages}
              privateChannel={privateChannel}
              unreadMessages={unreadMessages}
            />
          ))}
        </MemberWrapper>
      )}
      <MessageWindow
        userId={userId}
        playerCharName={playerCharName}
        roomId={roomId}
        publicMessages={publicMessages}
        isPublicChannel={isPublicChannel}
        setIsPublicChannel={setIsPublicChannel}
        privateChannel={privateChannel}
        privateMessages={privateMessages}
        privateCharName={privateCharName}
        minimizeMessages={minimizeMessages}
        setMinimizeMessages={setMinimizeMessages}
        unreadMessages={unreadMessages}
      />
    </Wrapper>
  );
}
