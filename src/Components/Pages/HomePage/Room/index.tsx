import styled from 'styled-components';
import InviteButton from '@/Components/Buttons/InviteButton';
import { useNavigate } from 'react-router-dom';
import Cat from '@/Components/Cat';
import TrashCanIcon from '@/Components/Icons/TrashCanIcon';
import LeaveRoomIcon from '@/Components/Icons/LeaveRoomIcon';
import DeleteDialog from './DeleteDialog';
import { useOnlineUserCount } from '@/utils/hooks/useOnlineUserCount';
import type { DeleteDialogState } from './DeleteDialog';
import type { RoomType } from '@/types';
const Wrapper = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  animation: fadeIn 0.5s ease-out;
  @keyframes fadeIn {
    from {
      opacity: 0.3;
    }
    to {
      opacity: 1;
    }
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      position: relative;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 5px;
      &:hover {
        background-color: ${({ theme }) => theme.colors.hoverBlue5};
      }
    }
    svg {
      width: 16px;
      height: 16px;
      fill: ${({ theme }) => theme.colors.white};
    }
  }

  .middle {
    position: relative;
    height: 80%;
    background-image: url(/images/map2.png);
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    cursor: pointer;
    .onlineMembers {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      padding: 0 10px;
      left: 10px;
      top: 10px;
      width: 55px;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.7);
      color: ${({ theme }) => theme.colors.white};
      font-weight: bold;
      &::before {
        content: '';
        position: absolute;
        left: 10px;
        top: 9px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #11b111;
      }
    }
  }
  .bottom {
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.white};
    div {
      display: flex;
      align-items: center;
    }
    .right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;
interface RoomProps {
  room: RoomType;
  userId: string | undefined;
  showDeleteDialog: DeleteDialogState;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<DeleteDialogState>>;
}
export default function Room({
  room,
  userId,
  showDeleteDialog,
  setShowDeleteDialog,
}: RoomProps) {
  const navigate = useNavigate();
  const onlineMembers = useOnlineUserCount(room.id);
  return (
    <>
      {userId && (
        <Wrapper>
          <div className="top">
            <span className="mapName">{room.roomName}</span>
            {
              <div
                id="roomActionTrigger"
                onClick={() => {
                  setShowDeleteDialog({ show: true, id: room.id });
                }}
              >
                {room.isCreator ? <TrashCanIcon /> : <LeaveRoomIcon />}
                {showDeleteDialog.show && showDeleteDialog.id === room.id && (
                  <DeleteDialog
                    room={room}
                    userId={userId}
                    setShowDeleteDialog={setShowDeleteDialog}
                  />
                )}
              </div>
            }
          </div>
          <div
            className="middle"
            onClick={() => {
              navigate(`/catertown/${room.id}/${room.roomName}`);
            }}
          >
            <div className="onlineMembers">{onlineMembers}</div>
          </div>
          <div className="bottom">
            <div>
              <Cat image={room.character}></Cat>
              <span>{room.charName}</span>
            </div>
            <div className="right">
              <span className="date">
                {new Date(room.joinDate.toDate()).toISOString().slice(0, 10)}
              </span>
              <InviteButton
                link={`${window.location.origin}/invite/${room.id}/${room.roomName}`}
                message="邀請連結已複製!"
              />
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
}
