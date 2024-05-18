import styled from 'styled-components';
import theme from '../../../theme';
import { useState, useEffect, useMemo } from 'react';
import Dialog from './Dialog';
import { useUserRooms } from '../../../utils/hooks/useUserRooms';
import { useUserState } from '../../../utils/zustand';
import Button from '../../Buttons/Button';
import Header from '../../Header';
import SearchBar from '../../SearchBar';
import RoomSkeleton from './RoomSkeleton';
import Room from './Room';
import TutorialIcon from '../../Icons/TutorialIcon';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import {
  getUserDataById,
  updateTutorialState,
} from '../../../firebase/firestore';
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
const TutorialButton = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 5px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  font-size: 16px;
  gap: 5px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #464f89;
  }
  svg {
    width: 20px;
    height: 20px;
    fill: white;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState();
  const filteredRooms = useMemo(() => {
    if (!searchTerm) return userRooms;
    return userRooms.filter((room) =>
      room.roomName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [userRooms, searchTerm]);
  useEffect(() => {
    if (!userId) return;
    (async () => {
      const data = await getUserDataById(userId);
      setUserData(data);
    })();
  }, [userId]);

  useEffect(() => {
    if (!userData) return;
    if (userData && !userData.hasViewedHomePageTutorial1) {
      runTutorial();
      updateTutorialState(userId, 'hasViewedHomePageTutorial1');
      setUserData({
        ...userData,
        hasViewedHomePageTutorial1: true,
      });
      return;
    }
    if (
      userData &&
      !userData.hasViewedHomePageTutorial2 &&
      userRooms.length > 0
    ) {
      runTutorial();
      updateTutorialState(userId, 'hasViewedHomePageTutorial2');
      setUserData({
        ...userData,
        hasViewedHomePageTutorial2: true,
      });
    }
  }, [userData, userRooms, userId]);

  const runTutorial = () => {
    let steps;
    if (userRooms.length === 0) {
      steps = [
        {
          element: '#create_space',
          popover: {
            title: '開始你的第一步!',
            description: '點擊這裡以創建房間',
          },
        },
      ];
    } else if (userRooms.length > 0) {
      steps = [
        {
          element: '#roomActionTrigger',
          popover: {
            title: '刪除/退出房間',
            description: '點擊此按鈕刪除/退出房間(依據您是否為房間創建者)',
          },
        },
        {
          element: '#inviteButton',
          popover: {
            title: '獲得邀請網址',
            description: '點擊此按鈕獲取邀請連結，讓您的朋友加入您的房間',
          },
        },
      ];
    }
    const driverObj = driver({
      showProgress: true,
      prevBtnText: '返回',
      nextBtnText: '繼續',
      doneBtnText: '完成',
      steps,
    });

    driverObj.drive();
  };
  const handleTutorialClick = () => {
    runTutorial();
  };
  const openDialog = () => {
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
        <TutorialButton onClick={handleTutorialClick}>
          教學
          <TutorialIcon />
        </TutorialButton>
      </Header>
      <SearchWrapper>
        <div className="inputWrapper">
          <SearchBar
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜尋房間名稱"
          />
        </div>
      </SearchWrapper>
      <MainPage>
        <RoomWrapper>
          {loading ? (
            <RoomSkeleton />
          ) : (
            filteredRooms.map((room) => (
              <Room
                key={room.id}
                room={room}
                userId={userId}
                showDeleteDialog={showDeleteDialog}
                setShowDeleteDialog={setShowDeleteDialog}
              />
            ))
          )}
        </RoomWrapper>
      </MainPage>
      {dialogOpen && <Dialog onClose={closeDialog} userId={userId} />}
    </Wrapper>
  );
}
