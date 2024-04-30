import styled from 'styled-components';
import GitHubLogo from '../../../../GitHubLogo';
import BroadCast from '../BroadCast';
import ChangePermission from '../ChangePermission';
import { useState } from 'react';
const PermissionWrapper = styled.div`
  position: absolute;
  left: 250px;
  bottom: 150px;
  width: 210px;
  height: 150px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #282d4e;
  border: 1px solid #3e477c;
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
      background-color: #3e477c;
      cursor: pointer;
    }
  }
`;
const BroadcastWrapper = styled.div`
  position: absolute;
  left: -50%;
  bottom: 142px;
  width: 500px;
  height: 250px;
  padding: 10px;
  background-color: #282d4e;
  border: 1px solid #3e477c;
  border-radius: 5px;
`;
export default function DashBoard({
  roomId,
  roomName,
  userId,
  playerCharName,
  players,
  showPermission,
  setShowPermission,
  showBroadcast,
  setShowBroadcast,
}) {
  const getWebhookLink = () => {
    const textToCopy = `${import.meta.env.VITE_GITHUB_WEBHOOK_URL}/${roomId}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert('邀請碼已複製到剪貼簿!');
      })
      .catch((err) => {
        console.error('複製邀請網址錯誤', err);
      });
  };
  return (
    <PermissionWrapper
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div onClick={getWebhookLink}>
        <GitHubLogo />
        <span>GitHub webhook link</span>
      </div>
      <div
        onClick={() => {
          setShowBroadcast((prevState) => !prevState);
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
            d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
          />
        </svg>
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
            />
          </BroadcastWrapper>
        )}
      </div>
      <div
        onClick={() => {
          setShowPermission((prevState) => !prevState);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
        </svg>
        <span>更改權限等級</span>
        {players && showPermission && (
          <ChangePermission
            players={players}
            roomId={roomId}
            onclick={(e) => {
              e.stopPropagation();
            }}
          />
        )}
      </div>
    </PermissionWrapper>
  );
}
