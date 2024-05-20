import styled from 'styled-components';
import Marquee from 'react-fast-marquee';
import { Timestamp } from 'firebase/firestore';
import { deleteBroadcast } from '@/utils/firebase/firestore';
import { useState } from 'react';
import Markdown from 'react-markdown';
import type { BroadcastData } from '@/types';
const StyledMarquee = styled(Marquee)`
  background-color: rgba(0 0, 0, 0.7);
  padding: 10px;
  a {
    text-decoration: underline;
  }
`;
interface MessagesProps {
  $canEdit: boolean;
}
const Messages = styled.span<MessagesProps>`
  cursor: ${({ $canEdit }) =>
    $canEdit ? `url(/images/trashIconO.png), pointer` : 'auto'};
  white-space: nowrap;
`;
const Wrapper = styled.div`
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 160px;
  height: 80px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue3};
  z-index: 100;
  display: flex;
  flex-direction: column;
  cursor: auto;
  align-items: center;
  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      gap: 15px;
      button {
        padding: 5px 10px;
        height: 30px;
        background-color: inherit;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: ${({ theme }) => theme.colors.hoverBlue3};
        }
      }
    }
  }
`;
interface BroadcastMarquee {
  broadcasts: BroadcastData[];
  userId: string;
  roomId: string;
}
export default function BroadcastMarquee({
  broadcasts,
  userId,
  roomId,
}: BroadcastMarquee) {
  const [showDialog, setShowDialog] = useState(false);
  const [docId, setDocId] = useState('');

  const handleBroadcastDelete = (docId: string) => {
    deleteBroadcast({ roomId, docId });
  };

  const Dialog = ({
    docId,
    setShowDialog,
  }: {
    docId: string;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const handleCancelClick = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setShowDialog(false);
    };
    return (
      <Wrapper>
        <div>
          <span>要刪除此廣播嗎?</span>
          <div>
            <button onClick={() => handleBroadcastDelete(docId)}>確認</button>
            <button onClick={handleCancelClick}>取消</button>
          </div>
        </div>
      </Wrapper>
    );
  };

  return (
    <>
      <StyledMarquee
        speed={50}
        gradient={false}
        pauseOnHover={true}
        play={!showDialog}
      >
        {broadcasts.map((broadcast, index) => {
          const fireTimestamp = new Timestamp(
            broadcast.publishTime.seconds,
            broadcast.publishTime.nanoseconds
          );
          const publishTime = fireTimestamp.toDate();
          const formattedTime = `${(publishTime.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${publishTime
            .getDate()
            .toString()
            .padStart(2, '0')} ${publishTime
            .getHours()
            .toString()
            .padStart(2, '0')}:${publishTime
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
          const markdownText = `${broadcast.title}(${broadcast.charName},${formattedTime}) : ${broadcast.content}`;
          return (
            <Messages
              key={index}
              style={{ display: 'inline-block', paddingLeft: '80vw' }}
              $canEdit={broadcast.userId === userId}
              onClick={() => {
                if (broadcast.userId !== userId) return;
                setShowDialog(true);
                setDocId(broadcast.id as string);
              }}
            >
              <Markdown
                components={{
                  a: ({ ...props }) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {markdownText}
              </Markdown>
            </Messages>
          );
        })}
      </StyledMarquee>
      {showDialog && <Dialog docId={docId} setShowDialog={setShowDialog} />}
    </>
  );
}
