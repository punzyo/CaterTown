import styled from 'styled-components';
import { useFormInput } from '@/utils/hooks/useFormInput';
import {
  sendPublicMessage,
  sendPrivateMessage,
  addUnreadMessage,
  resetUnreadMessage,
} from '@/utils/firebase/firestore';
import { useState, useEffect, useRef } from 'react';
import MaximizeIcon from '@/Components/Icons/MaximizeIcon';
import MinimizeIcon from '@/Components/Icons/MinimizeIcon';
const Wrapper = styled.div`
  width: 350px;
  height: ${(props) => (props.$minimizeMessages ? '0px' : '300px')};
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: ${(props) => (props.$minimizeMessages ? '-32px' : '-0.5px')};
  right: 300px;
`;
const MessageWrapper = styled.div`
  width: 350px;
  height: 100%;
  position: absolute;
  bottom: 60px;
  right: 0px;
  background-color: #202540;
  border-radius: 5px 5px 0 0;
`;
const Message = styled.div`
  width: 100%;
  color: white;
  padding: 0 10px;
`;
const MessageController = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  border-bottom: 1px solid;
  border: 1px solid black;
  background-color: #202540;
  display: flex;
  align-items: center;
`;
const ChannelWrapper = styled.div`
  width: calc(100% - 40px);
  height: 100%;
  display: flex;
`;
const Channel = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.$selected ? '#3D477C' : '')};
  &:hover {
    background-color: ${(props) => (props.$selected ? '' : '#4A5798')};
  }
  cursor: pointer;
`;
const Messages = styled.div`
  width: 100%;
  height: ${(props) => (props.$minimizeMessages ? '0px' : '300px')};
  background-color: #202540;
  padding-top: ${(props) => (props.$minimizeMessages ? '0px' : '5px')};
  overflow-y: scroll;
`;
const CloseIcon = styled.div`
  position: absolute;
  right: 0px;
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #2e355d;
  }
  svg {
    fill: white;
    width: 18px;
    height: 18px;
  }
  .square {
    position: absolute;
    top: 5px;
  }
  cursor: pointer;
`;
const MessageInput = styled.form`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 30px;
  background-color: #eee;
  display: flex;
  align-items: center;

  input {
    border: none;
    width: 85%;
    height: 100%;
    padding: 5px 10px;
    background-color: #4c4e5c;
    outline: none;
  }
  button {
    width: 15%;
    height: 100%;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    color: black !important;
  }
`;

const UnreadIcon = styled.div`
  position: absolute;
  top: -10px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function MessageWindow({
  playerCharName,
  userId,
  roomId,
  publicMessages,
  privateChannel,
  isPublicChannel,
  setIsPublicChannel,
  privateMessages,
  privateCharName,
  minimizeMessages,
  setMinimizeMessages,
  unreadMessages,
}) {
  const messageInput = useFormInput('');
  const messagesEndRef = useRef(null);
  const [unreadPublicMessages, setUnreadPublicMessages] = useState(0);
  const messageInit = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!publicMessages) {
      return;
    }
    if (messageInit.current) {
      setUnreadPublicMessages(0);
      messageInit.current = false;
      return;
    }
    if (minimizeMessages || (!minimizeMessages && !isPublicChannel)) {
      setUnreadPublicMessages((prevState) => prevState + 1);
    }
  }, [publicMessages]);
  useEffect(() => {
    scrollToBottom();
  }, [publicMessages, privateMessages]);

  useEffect(() => {
    if (!minimizeMessages && isPublicChannel) {
      setUnreadPublicMessages(0);
    }
  }, [minimizeMessages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.value) return;
    if (isPublicChannel) {
      await sendPublicMessage({
        roomId,
        charName: playerCharName,
        message: messageInput.value,
      });
    } else {
      await sendPrivateMessage({
        userId,
        roomId,
        charName: playerCharName,
        message: messageInput.value,
        privateChannelId: privateChannel,
      });
      await addUnreadMessage({
        roomId,
        privateChannelId: privateChannel,
        userId,
      });
    }
    messageInput.clear();
  };
  const handleChannelClick = () => {
    if (!isPublicChannel) return;
    setIsPublicChannel(false);
    if (minimizeMessages) setMinimizeMessages(false);
    resetUnreadMessage({
      roomId,
      userId,
      privateChannelId: privateChannel,
    });
  };
  const handleIconClick = async () => {
    if (!minimizeMessages && privateChannel) {
      await resetUnreadMessage({
        roomId,
        privateChannelId: privateChannel,
        userId,
      });
    }
  };
  const renderMessages = (messages) => {
    if (!messages || !Array.isArray(messages)) return null;

    return messages.map((message, index) => (
      <Message key={index}>
        <span>{message.charName} : </span>
        <span>{message.message}</span>
      </Message>
    ));
  };
  return (
    <Wrapper $minimizeMessages={minimizeMessages}>
      <MessageWrapper>
        <MessageController>
          <ChannelWrapper>
            <Channel
              $selected={isPublicChannel}
              onClick={() => {
                setIsPublicChannel(true);
                if (minimizeMessages) setMinimizeMessages(false);
                if (!minimizeMessages) setUnreadPublicMessages(0);
              }}
            >
              全體頻道
              {!!unreadPublicMessages && (
                <UnreadIcon>
                  <span>{unreadPublicMessages}</span>
                </UnreadIcon>
              )}
            </Channel>
            {privateChannel && (
              <Channel
                $selected={!isPublicChannel}
                onClick={handleChannelClick}
              >
                {privateCharName}
                {unreadMessages[privateChannel]?.count > 0 && (
                  <UnreadIcon>
                    <span>{unreadMessages[privateChannel].count}</span>
                  </UnreadIcon>
                )}
              </Channel>
            )}
          </ChannelWrapper>
          <CloseIcon onClick={handleIconClick}>
            {minimizeMessages ? <MaximizeIcon /> : <MinimizeIcon />}
          </CloseIcon>
        </MessageController>
        <Messages $minimizeMessages={minimizeMessages}>
          {isPublicChannel
            ? renderMessages(publicMessages)
            : renderMessages(privateMessages)}
          <div ref={messagesEndRef} />
        </Messages>
      </MessageWrapper>
      {!minimizeMessages && (
        <MessageInput onSubmit={sendMessage}>
          <input
            type="text"
            value={messageInput.value}
            onChange={messageInput.onChange}
          />
          <button>送出</button>
        </MessageInput>
      )}
    </Wrapper>
  );
}
