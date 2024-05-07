import styled from 'styled-components';
import theme from '../../../theme';
import { useState } from 'react';
import Dialog from './Dialog';
import { useUserRooms } from '../../../utils/hooks/useUserRooms';
import { useUserState } from '../../../utils/zustand';
import Button from '../../Buttons/Button';
import Header from '../../Header';
import SearchBar from '../../SearchBar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Room from './Room';
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
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
  min-height: 100%;
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
  ${theme.breakpoints.sm} {
    font-size: 14px;
    gap: 25px;
    grid-template-columns: repeat(2, 1fr);
    padding: 10px 15px;
  }
`;

export default function HomePage() {
  const { user } = useUserState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const userId = user.id;
  const { userRooms, loading } = useUserRooms(userId);
  const [showDeleteDialog, setShowDeleteDialog] = useState({
    show: false,
    id: '',
  });

  const openDialog = () => {
    console.log('open');
    setDialogOpen(true);
  };
  const closeDialog = () => setDialogOpen(false);

  return (
    <Wrapper
      onClick={() => {
        if (dialogOpen) closeDialog();
        if (showDeleteDialog.show) setShowDeleteDialog({ show: false, id: '' });
      }}
    >
      <Header>
        <CreateSpace id="create_space">
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
          {userRooms
            ? userRooms.map((room) => (
                <Room
                  key={room.id}
                  room={room}
                  userId={userId}
                  showDeleteDialog={showDeleteDialog}
                  setShowDeleteDialog={setShowDeleteDialog}
                />
              ))
            : Array.from({ length: 6 }, (_, index) => (
              <div key={index}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', padding:'0 5px'}}
                >
                  <Skeleton
                    key={index}
                    baseColor="#ddd"
                    highlightColor="#f0f0f0"
                    width={60}
                    height={20}
                  />
                  <Skeleton
                    key={index}
                    baseColor="#ddd"
                    highlightColor="#f0f0f0"
                    width={20}
                    height={20}
                  />
                </div>
                <Skeleton
                  key={index}
                  baseColor="#ddd"
                  highlightColor="#f0f0f0"
                  height={284}
                  borderRadius={10}
                />
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center'}}
                >
                  <div  style={{ display: 'flex', alignItems:'center', gap:'10px'}}>
                  <Skeleton
                    key={index}
                    baseColor="#ddd"
                    highlightColor="#f0f0f0"
                    width={50}
                    height={50}
                    borderRadius={10}
                  /><Skeleton
                  key={index}
                  baseColor="#ddd"
                  highlightColor="#f0f0f0"
                  width={60}
                  height={20}
                />
                  </div>
                  <Skeleton
                    key={index}
                    baseColor="#ddd"
                    highlightColor="#f0f0f0"
                    width={200}
                    height={20}
                  />
                </div>
              </div>
            ))}
        </RoomWrapper>
      </MainPage>
      {dialogOpen && <Dialog onClose={closeDialog} userId={userId} />}
    </Wrapper>
  );
}
