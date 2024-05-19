import styled from 'styled-components';
import BroadCast from '../BroadCast';
import ChangePermission from '../ChangePermission';
import { useState } from 'react';
import LinkIcon from '@/Components/Icons/LinkIcon';
import BroadcastIcon from '@/Components/Icons/BroadcastIcon';
import ChangePermissionIcon from '@/Components/Icons/ChangePermissionIcon';
const Wrapper = styled.div`
  position: absolute;
  left: 10px;
  bottom: 160px;
  width: 238px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue4};
  border: 1px solid ${({ theme }) => theme.colors.borderBlue0};
  border-radius: 5px;
  > div {
    width: 100%;
    height: 36px;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 5px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.hoverBlue3};
      cursor: pointer;
    }
    span {
      text-align: center;
    }
  }
`;
const BroadcastWrapper = styled.div`
  position: absolute;
  left: -50%;
  bottom: 110px;
  width: 500px;
  height: 250px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue3};
  border: 1px solid ${({ theme }) => theme.colors.borderBlue0};
  border-radius: 5px;
`;
export default function DashBoard({
  roomId,
  userId,
  playerCharName,
  players,
  showPermission,
  setShowPermission,
  showBroadcast,
  setShowBroadcast,
  permissionLevel,
}) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const getWebhookLink = () => {
    if (showSuccessMessage) return;
    setShowSuccessMessage(true);
    const textToCopy = `${import.meta.env.VITE_GITHUB_WEBHOOK_URL}/${roomId}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('複製邀請網址錯誤', err);
      });
  };
  const handleWebhookClick = () => {
    setShowBroadcast((prevState) => !prevState);
    setShowPermission(false);
  };

  const handlePermissionClick = () => {
    setShowPermission((prevState) => !prevState);
    setShowBroadcast(false);
  };
  return (
    <Wrapper
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div onClick={getWebhookLink}>
        <LinkIcon />
        <span>
          {showSuccessMessage ? '複製連結成功!' : 'GitHub webhook link'}
        </span>
      </div>
      <div onClick={handleWebhookClick}>
        <BroadcastIcon />
        <span>廣播通知</span>
        {showBroadcast && (
          <BroadcastWrapper
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <BroadCast
              roomId={roomId}
              userId={userId}
              playerCharName={playerCharName}
              setShowBroadcast={setShowBroadcast}
            />
          </BroadcastWrapper>
        )}
      </div>
      {(permissionLevel == 'creator' || permissionLevel == 'admin') && (
        <div onClick={handlePermissionClick}>
          <ChangePermissionIcon />
          <span>更改權限等級</span>
          {players && showPermission && (
            <ChangePermission
              userId={userId}
              permissionLevel={permissionLevel}
              players={players}
              roomId={roomId}
              onclick={(e) => {
                e.stopPropagation();
              }}
            />
          )}
        </div>
      )}
    </Wrapper>
  );
}
