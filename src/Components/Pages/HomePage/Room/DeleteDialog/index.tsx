import styled from 'styled-components';
import {
  deleteRoomFromAllUsers,
  removeUserFromRoom,
} from '@/utils/firebase/firestore';
import type { RoomType } from '@/types';
const Wrapper = styled.div`
  position: absolute;
  right: 0;
  width: 160px;
  height: 95px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue5};
  font-weight: bold;
  color: white;
  text-align: center;
  z-index: 1;
  > div {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    button {
      width: 50px;
      height: 30px;
      border-radius: 5px;
      color: inherit;
      &:hover {
        background-color: ${({ theme }) => theme.colors.hoverBlue5};
      }
    }
  }
`;
export interface DeleteDialogState {
  show: boolean;
  id: string;
}
interface DeleteDialogProps {
  room: RoomType;
  userId: string;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<DeleteDialogState>>;
}
export default function DeleteDialog({
  room,
  userId,
  setShowDeleteDialog,
}: DeleteDialogProps) {
  const handleDeleteRoom = async (roomId: string) => {
    await deleteRoomFromAllUsers(roomId);
  };

  const handleLeaveRoom = async (roomId: string) => {
    await removeUserFromRoom({ userId, roomId });
  };
  const handleRoomAction = (room: RoomType) => {
    room.isCreator ? handleDeleteRoom(room.id) : handleLeaveRoom(room.id);
  };
  const closeDialog = () => {
    setShowDeleteDialog({ show: false, id: '' });
  };
  return (
    <Wrapper
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <span>{room.isCreator ? '確定要刪除此房間?' : '確定要退出此房間?'}</span>
      <div>
        <button onClick={() => handleRoomAction(room)}>確定</button>
        <button onClick={closeDialog}>取消</button>
      </div>
    </Wrapper>
  );
}
