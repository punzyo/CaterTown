import styled from 'styled-components';
import { useFormInput } from '@/utils/hooks/useFormInput';
import { sendBroadcast } from '@/utils/firebase/firestore';
import { Timestamp } from 'firebase/firestore';
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: auto;

  > div {
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
    padding: 5px 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.backgroundBlue6};
    font-size: 14px;
    color: ${({ theme }) => theme.colors.white};
    &:hover {
      background-color: ${({ theme }) => theme.colors.hoverBlue7};
    }
  }
  select {
    border-radius: 5px;
    padding: 5px;
    background-color: inherit;
    border: 1px solid ${({ theme }) => theme.colors.borderBlue0};
    outline: none;
    option {
      background-color: inherit;
      color: black;
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
      height: 145px;
      background-color: inherit;
      border: 1px solid ${({ theme }) => theme.colors.borderBlue0};
      border-radius: 5px;
      resize: none;
      outline: none;
      padding: 5px;
    }
  }
`;
interface BroadCastProps {
  roomId: string;
  userId: string;
  playerCharName: string;
  setShowBroadcast: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function BroadCast({
  roomId,
  userId,
  playerCharName,
  setShowBroadcast,
}: BroadCastProps) {
  const broadCastTitleInput = useFormInput('');
  const broadCastContentInput = useFormInput('');
  const hourSelectedInput = useFormInput('1');

  const handleBroadcastClick = async () => {
    if (!broadCastTitleInput.value || !broadCastContentInput.value) return;
    const publishTimeObj = Timestamp.now();
    const currentDate = publishTimeObj.toDate();
    const hoursToAdd = parseInt(hourSelectedInput.value, 10);
    const expirationTimeObj = new Date(
      currentDate.getTime() + hoursToAdd * 3600 * 1000
    );

    const expirationTime = expirationTimeObj.toISOString();

    const broadcastData = {
      userId,
      charName: playerCharName,
      title: broadCastTitleInput.value,
      publishTime: publishTimeObj,
      expirationTime,
      content: broadCastContentInput.value,
    };
    await sendBroadcast({ roomId, broadcastData });

    broadCastTitleInput.clear();
    broadCastContentInput.clear();
    hourSelectedInput.reset();
    setShowBroadcast(false);
  };
  return (
    <Wrapper>
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
      <div>
        <label htmlFor="hour-select">持續時間</label>
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
          cols={30}
          rows={10}
          value={broadCastContentInput.value}
          onChange={broadCastContentInput.onChange}
        ></textarea>
      </div>
    </Wrapper>
  );
}
