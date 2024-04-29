import styled from 'styled-components';
import MemberIcon from '../../../MemberIcon';
import OnlineStatus from '../../../OnlineStatus';
import { useState } from 'react';
import GitHubLogo from '../../../GitHubLogo';
import { useGameSettings } from '../../../../utils/zustand';
import { useFormInput } from '../../../../utils/hooks/useFormInput';
import { editPlayerGitHub } from '../../../../firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { sendBroadcast } from '../../../../firebase/firestore';
const Wrapper = styled.div`
  position: relative;
  width: 200px;
  height: 90%;
  border-radius: 5px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  .onlineBox {
    height: 100%;
    display: flex;
    align-items: end;
    p {
      margin-left: 20px;
    }
    font-size: 10px;
  }
  /* cursor: auto; */
`;
const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
`;
const ProfileWrapper = styled.div`
  position: absolute;
  width: 250px;
  height: 300px;
  bottom: 75px;
  left: 0;
  padding: 10px;
  background-color: #282d4e;
  border-radius: 5px;
  border: 1px solid #3e477c;
  display: flex;
  flex-direction: column;
  gap: 5px;
  .top {
    width: 100%;
    height: 50px;
    display: flex;
    .left {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .right {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
    }
  }
  .middle {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .github:hover {
      background-color: ${(props) =>
        props.$editGitHubId ? 'inherit' : '#3e477c'};
    }
    > div {
      &:hover {
        background-color: #3e477c;
      }
      height: 36px;
      display: flex;
      align-items: center;
      padding: 5px;
      > div:first-of-type {
        width: 100px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      border-radius: 5px;
      > svg {
        margin-left: auto;
        /* cursor: pointer; */
      }
    }
    svg {
      width: 16px;
      height: 16px;
      fill: white;
    }
    input {
      height: 90%;
      padding: 5px;
      border: 1px solid #3e477c;
      outline: none;
      border-radius: 5px;
      background-color: inherit;
      width: 120px;
      &:focus {
        border: 1px solid #3e477c;
      }
    }
  }
  .hr {
    width: 90%;
    height: 1px;
    background-color: #3e477c;
    margin: 15px auto;
  }
`;
const PermissionWrapper = styled.div`
  position: absolute;
  left: 240px;
  bottom: 150px;
  width: 200px;
  height: 200px;
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
    display: flex;
    align-items: center;
    gap: 5px;
    border: 1px solid #3e477c;
  }
`;
const BroadcastWrapper = styled.div`
  position: absolute;
  left: -50%;
  bottom: 150px;
  width: 500px;
  height: 250px;
  padding: 10px;
  background-color: #282d4e;
  border: 1px solid #3e477c;
  border-radius: 5px;
  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: auto;
  }
  > div > div {
    display: flex;
    align-items: center;
    label {
      width: 80px;
      display: flex;
      align-items: center;
    }
  }
  .title button {
    background-color: inherit;
    border-radius: 5px;
    margin-left: auto;
    padding: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #3e477c;
    }
  }
  select {
    border-radius: 5px;
    padding: 5px;
    background-color: inherit;
    border: 1px solid #3e477c;
    outline: none;
    option {
      background-color: inherit; /* 繼承父元素的背景顏色 */
      color: black; /* 文本顏色 */
    }
  }
  .date {
    > div {
      input {
        width: 180px;
      }
    }
    input {
      cursor: pointer;
    }
  }
  .content {
    align-items: start;
    textarea {
      flex-grow: 1;
      height: 90px;
      background-color: inherit;
      border: 1px solid #3e477c;
      border-radius: 5px;
      resize: none;
      outline: none;
      padding: 5px;
    }
  }
`;
export default function PlayerProfile({
  roomId,
  userId,
  image,
  playerCharName,
  gitHubId,
  permissionLevel,
}) {
  const [publishTime, setPublishTime] = useState(new Date());
  const { setResetPosition } = useGameSettings();
  const [showProfile, setShowProfile] = useState(false);
  const [editGitHubId, setEditGitHubId] = useState(false);
  const gitHubIdInput = useFormInput(gitHubId);
  const broadCastTitleInput = useFormInput('');
  const broadCastContentInput = useFormInput('');
  const hourSelectedInput = useFormInput(1);

  const handleGitHubSubmit = async (e) => {
    e.preventDefault();
    setEditGitHubId(false);
    if (gitHubIdInput.value === gitHubId || gitHubIdInput.value === '') return;
    const newGitHubId = gitHubIdInput.value;
    console.log('New GitHub ID:', gitHubIdInput.value);
    const isEditSucess = await editPlayerGitHub({
      userId,
      roomId,
      gitHubId: newGitHubId,
    });
    if (isEditSucess) {
      gitHubId = gitHubIdInput.value;
      gitHubIdInput.clear();
    }
  };

  const handleBroadcastClick = async () => {
    const publishTimeObj = new Date(publishTime);
const hoursToAdd = parseInt(hourSelectedInput.value, 10);

const expirationTimeObj = new Date(publishTimeObj.getTime() + hoursToAdd * 60 * 60 * 1000);
const expirationTime = expirationTimeObj.toISOString();
    const broadcastData={
      userId,
      charName:playerCharName,
      title:broadCastTitleInput.value,
      publishTime,
      expirationTime,
      content:broadCastContentInput.value
    }
    console.log(
      '廣播',
      broadcastData
    );
    const response = await sendBroadcast({roomId,broadcastData})
    console.log('發布玩',response);
    broadCastTitleInput.clear()
    broadCastContentInput.clear()
    hourSelectedInput.reset()
  };
  return (
    <Wrapper
      onClick={() => {
        setShowProfile(!showProfile);
      }}
    >
      <IconWrapper>
        <MemberIcon image={image} isOnline={null} unreadMessages={0} />
      </IconWrapper>
      <span>{playerCharName}</span>
      <div className="onlineBox">
        <p>上線中</p>
        <OnlineStatus isOnline={true} />
      </div>
      <ProfileWrapper $editGitHubId={editGitHubId}>
        <div className="top">
          <div className="left">
            <IconWrapper>
              <MemberIcon image={image} isOnline={null} unreadMessages={0} />
            </IconWrapper>
          </div>
          <div className="right">
            <span>{playerCharName}</span>
          </div>
        </div>
        <div className="middle">
          <div
            className="github"
            onClick={() => {
              setEditGitHubId(true);
            }}
          >
            <div>
              <GitHubLogo />
              <span>GitHub ID</span>
            </div>
            {editGitHubId ? (
              <form action="" onSubmit={handleGitHubSubmit}>
                <input
                  type="text"
                  value={gitHubIdInput.value}
                  onChange={gitHubIdInput.onChange}
                  onBlur={handleGitHubSubmit}
                  autoFocus
                />
              </form>
            ) : (
              <span>{gitHubId ? gitHubId : ''}</span>
            )}
            {!editGitHubId && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
              </svg>
            )}
          </div>
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H256V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z" />
              </svg>
              <span>權限</span>
            </div>
            <span>{permissionLevel}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
            </svg>
            <PermissionWrapper>
              <div>
                <GitHubLogo />
                <span>GitHub webhook link</span>
              </div>
              <div>
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
                <BroadcastWrapper>
                  <div>
                    <div className="title">
                      <label htmlFor="title">標題</label>
                      <input
                        type="text"
                        id="title"
                        value={broadCastTitleInput.value}
                        onChange={broadCastTitleInput.onChange}
                      />
                      <button onClick={handleBroadcastClick}>發佈廣播</button>
                    </div>
                    <div className="date">
                      <label htmlFor="datepicker">發佈時間</label>
                      <DatePicker
                        selected={publishTime}
                        onChange={(date) => setPublishTime(date)}
                        showTimeSelect
                        minDate={new Date()}
                        timeFormat="HH:mm"
                        timeIntervals={30}
                        timeCaption="time" // 時間選擇部分的標題
                        dateFormat="MMMM d, yyyy h:mm aa"
                        id="datepicker"
                      />
                    </div>
                    <div>
                      <label htmlFor="hour-select">選擇時長：</label>
                      <select
                        id="hour-select"
                        value={hourSelectedInput.value}
                        onChange={hourSelectedInput.onChange}
                      >
                        {[1, 2, 3, 4, 5, 6].map((h) => (
                          <option key={h} value={h}>
                            {h} 小時
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="content">
                      <label htmlFor="content">內容</label>
                      <textarea
                        id="content"
                        cols="30"
                        rows="10"
                        value={broadCastContentInput.value}
                        onChange={broadCastContentInput.onChange}
                      ></textarea>
                    </div>
                  </div>
                </BroadcastWrapper>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
                </svg>
                <span>更改權限等級</span>
              </div>
            </PermissionWrapper>
          </div>
          <div onClick={() => setResetPosition(true)}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" />
              </svg>
              <span>回到起點</span>
            </div>
          </div>
        </div>
        <div className="hr">
          <div className="bottom"></div>
        </div>
      </ProfileWrapper>
    </Wrapper>
  );
}
