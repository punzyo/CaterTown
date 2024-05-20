import styled from 'styled-components';
import MemberIcon from '@/Components/MemberIcon';
import { useState } from 'react';
import { editPermissionLevel } from '@/utils/firebase/firestore';
import type { PlayerType } from '@/types';
const Wrapper = styled.div`
  position: absolute;
  left: 90%;
  height: 255px;
  max-height: 255px;
  overflow: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue3};
  border: 1px solid ${({ theme }) => theme.colors.borderBlue0};
  border-radius: 5px;
  cursor: auto;
  > div {
    > span {
      width: 90px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
  .permissionSelect {
    position: relative;
    height: 70%;
    display: flex;
    align-items: center;
    width: 95px;
    padding-right: 5px;
    cursor: pointer;
    > span {
      width: 80px;
      text-align: center;
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.hoverBlue3};
    }
    border-radius: 4px;
    > svg {
      width: 16px;
      height: 16px;
    }
    .permission {
      span {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: #717588;
        }
      }
      position: absolute;
      z-index: 2;
      top: 35px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 75px;
      line-height: 2;
      background-color: #191d32;
      border-radius: 4px;
    }
  }
`;
interface EditMessageProps{
  $editSuccess: boolean;
}
const EditMessage = styled.div<EditMessageProps>`
  font-size: 10px;
  position: absolute;
  color: ${({$editSuccess}) => ($editSuccess ? 'green' : 'red')};
  bottom: -10px;
  left: 10px;
  width: 100%;
  height: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  svg {
    width: 8px !important;
    height: 8px !important;
    fill: ${({$editSuccess}) => ($editSuccess ? 'green' : 'red')} !important;
  }
`;
const MemberIconWrapper = styled.div`
  width: 100%;
  height: 50px;
  min-height: 50px;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: inherit;
  > div {
    min-width: 50px;
    width: 50px;
    height: 100%;
  }
`;
interface ChangePermissionProps{
  players:PlayerType[];
  roomId: string;
  userId: string;
  permissionLevel: string;
}
export default function ChangePermission({
  players,
  roomId,
  userId,
  permissionLevel,
}:ChangePermissionProps) {
  const [showSettings, setShowSettings] = useState<{ [key: string]: boolean }>(
    players.reduce((acc, player) => {
      acc[player.userId] = false;
      return acc;
    }, {} as { [key: string]: boolean })
  );
  const [showEditMessage, setShowEditMessage] = useState(false);
  const [editMessage, setEditMessage] = useState('');
  const [editSuccess, setEditSuccess] = useState(true);
  const [currentEditingUserId, setCurrentEditingUserId] = useState<string | null>(null);

  const handlePermissionClick = async (userId:string, newPermissionLevel:string) => {
    setCurrentEditingUserId(userId);
    const isSuccess = await editPermissionLevel({
      roomId,
      userId,
      newPermissionLevel,
    });
    setEditSuccess(isSuccess);
    setEditMessage(isSuccess ? '修改權限成功' : '修改權限失敗');
    setShowEditMessage(true);
    setTimeout(() => {
      setShowEditMessage(false);
      setCurrentEditingUserId(null);
    }, 3000);
  };

  const toggleShowSetting = (userId:string) => {
    setShowSettings((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };
  const renderPermissionOptions = (
    player: PlayerType,
    currentLevel: string,
    levels: string[]
  ) => {
    return levels.map(
      (p) =>
        currentLevel !== p &&
        currentLevel !== 'creator' && (
          <span key={p} onClick={() => handlePermissionClick(player.userId, p)}>
            {p}
          </span>
        )
    );
  };

  return (
    <Wrapper
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {players.map((player) => {
        if (player.userId === userId) return;
        return (
          <MemberIconWrapper key={player.userId}>
            <MemberIcon
              image={player.character}
              isOnline={null}
              background={true}
            />
            <span>{player.charName}</span>
            <div
              className="permissionSelect"
              onClick={(e) => {
                toggleShowSetting(player.userId);
                e.stopPropagation();
              }}
            >
              <span>{player.permissionLevel}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z" />
              </svg>
              {showSettings[player.userId] && (
                <div className="permission">
                  {permissionLevel === 'creator' &&
                    renderPermissionOptions(player, player.permissionLevel, [
                      'admin',
                      'manager',
                      'member',
                    ])}
                  {permissionLevel === 'admin' &&
                    renderPermissionOptions(player, player.permissionLevel, [
                      'manager',
                      'member',
                    ])}
                </div>
              )}
              {showEditMessage && currentEditingUserId === player.userId && (
                <EditMessage
                  className={editSuccess ? 'success' : 'error'}
                  $editSuccess={editSuccess}
                >
                  {editMessage}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d={
                        editSuccess
                          ? 'M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z'
                          : 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z'
                      }
                    />
                  </svg>
                </EditMessage>
              )}
            </div>
          </MemberIconWrapper>
        );
      })}
    </Wrapper>
  );
}
