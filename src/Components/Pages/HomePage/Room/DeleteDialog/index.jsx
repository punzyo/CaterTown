import styled from 'styled-components';
import {
  deleteRoomFromAllUsers,
  removeUserFromRoom,
} from '../../../../../firebase/firestore';
const Wrapper = styled.div`
  position: absolute;
  right: 0;
  width: 160px;
  height: 95px;
  padding: 10px;
  border-radius: 5px;
  background-color: #414b80;
  font-weight: bold;
  color: white;
  text-align: center;
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
        background-color: #5f6dbb;
      }
    }
  }
`;
export default function DeleteDialog({ room, userId, setShowDeleteDialog }) {
  const handleDeleteRoom = async (roomId) => {
    await deleteRoomFromAllUsers(roomId);
  };

  const handleLeaveRoom = async (roomId) => {
    await removeUserFromRoom({ userId, roomId });
  };
  return (
    <Wrapper
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <span>{room.isCreater ? '確定要刪除此房間?' : '確定要退出此房間?'}</span>
      <div>
        <button
          onClick={() => {
            room.isCreater
              ? handleDeleteRoom(room.id)
              : handleLeaveRoom(room.id);
          }}
        >
          確定
        </button>
        <button
          onClick={() => {
            setShowDeleteDialog({ show: false, id: '' });
          }}
        >
          取消
        </button>
      </div>
    </Wrapper>
  );
}
