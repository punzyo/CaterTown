import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Dialog from './Dialog';
import { useUserRooms } from '../../../utils/hooks/useUserRooms';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../../utils/zustand';
import Button from '../../Buttons/Button';
import Header from '../../Header';
import InviteButton from '../../Buttons/InviteButton';
import SearchBar from '../../SearchBar';
import Cat from '../../Cat';
import {
  deleteRoomFromAllUsers,
  removeUserFromRoom,
} from '../../../firebase/firestore';

const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
`;

const CreateSpace = styled.div`
  height: 40px;
  font-size: 15px;
  > button {
    width: 100px;
  }
`;
const SearchWrapper = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 30px 0px 30px;
  background-color: #282d4e;
  .inputWrapper {
    width: 200px;
  }
`;
const MainPage = styled.div`
  background-color: #282d4e;
  height: 100%;
`;
const RoomWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px 50px;
  gap: 60px;
  .mapName {
    padding: 0 5px;
    font-weight: 700;
    color: #fff;
  }
`;
const Room = styled.div`
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 5px;
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
        background-color: #333a64;
      }
    }
    svg {
      width: 16px;
      height: 16px;
      fill: #fff;
    }
  }

  .middle {
    height: 80%;
    background-image: url(/images/map2.png);
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    cursor: pointer;
  }
  .bottom {
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
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
const DeleteDialog = styled.div`
  position: absolute;
  left: 0;
  width: 160px;
  height: 95px;
  padding: 10px;
  border-radius: 5px;
  background-color: #414b80;
  font-weight: bold;
  color: white;
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

export default function HomePage() {
  const { user } = useUserState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const userId = user.id;
  const userRooms = useUserRooms(userId);
  const [showDeleteDialog, setShowDeleteDialog] = useState({
    show: false,
    id: '',
  });

  const navigate = useNavigate();

  const openDialog = () => {
    console.log('open');
    setDialogOpen(true);
  };
  const closeDialog = () => setDialogOpen(false);

  const handleDeleteRoom = async (roomId) => {
    await deleteRoomFromAllUsers(roomId);
  };

  const handleLeaveRoom = async (roomId) => {
    await removeUserFromRoom({userId, roomId});
  };
  return (
    <Wrapper
      onClick={() => {
        if (dialogOpen) closeDialog();
        if (showDeleteDialog.show) setShowDeleteDialog({ show: false, id: '' });
      }}
    >
      <Header>
        <CreateSpace>
          <Button clickFunc={openDialog} content={'建立房間'}></Button>
        </CreateSpace>
      </Header>
      <SearchWrapper>
        <div className="inputWrapper">
          <SearchBar />
        </div>
      </SearchWrapper>
      <MainPage>
        <RoomWrapper>
          {userRooms &&
            userRooms.map((room, index) => (
              <Room key={index}>
                <div className="top">
                  <span className="mapName">{room.roomName}</span>
                  {(
                   <div
                   onClick={() => {
                     setShowDeleteDialog({ show: true, id: room.id });
                   }}
                 >
                   {room.isCreater ?<svg
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512"
                   >
                     <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                   </svg>:<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>}
                   {showDeleteDialog.show && showDeleteDialog.id === room.id && (
                     <DeleteDialog
                       onClick={(e) => {
                         e.stopPropagation();
                       }}
                     >
                       <span>{room.isCreater ? "確定要刪除此房間?" : "確定要退出此房間?"}</span>
                       <div>
                         <button
                           onClick={() => {
                             room.isCreater ? handleDeleteRoom(room.id) : handleLeaveRoom(room.id);
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
                     </DeleteDialog>
                   )}
                 </div>
                 
                  )}
                </div>
                <div
                  className="middle"
                  onClick={() => {
                    navigate(`/chouchouzoo/${room.id}/${room.roomName}`);
                  }}
                ></div>
                <div className="bottom">
                  <div>
                    <Cat image={room.character}></Cat>
                    <span>{room.charName}</span>
                  </div>
                  <div className="right">
                    <span className="date">
                      {new Date(room.joinDate.toDate())
                        .toISOString()
                        .slice(0, 10)}
                    </span>
                    邀請朋友
                    <InviteButton roomId={room.id} roomName={room.roomName} />
                  </div>
                </div>
              </Room>
            ))}
        </RoomWrapper>
      </MainPage>
      {dialogOpen && <Dialog onClose={closeDialog} userId={userId} />}
    </Wrapper>
  );
}
