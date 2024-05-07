import styled from 'styled-components';
import { useFormInput } from '../../../../utils/hooks/useFormInput';
import {
  sendPublicMessage,
  sendPrivateMessage,
  addUnreadMessage,
  resetUnreadMessage,
} from '../../../../firebase/firestore';
import { useState, useEffect, useRef } from 'react';

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

export default function PublicMessage({
  playerCharName,
  userId,
  roomId,
  publicMessages,
  privateChannel,
  setPrivateChannel,
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
      console.log('HEHE', minimizeMessages, isPublicChannel);
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
                onClick={() => {
                  setIsPublicChannel(false);
                  if (minimizeMessages) setMinimizeMessages(false);
                  resetUnreadMessage({
                    roomId,
                    userId,
                    privateChannelId: privateChannel,
                  });
                }}
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
          <CloseIcon
            onClick={async () => {
              if (!minimizeMessages && privateChannel) {
                await resetUnreadMessage({
                  roomId,
                  privateChannelId: privateChannel,
                  userId,
                });
              }
              setMinimizeMessages(!minimizeMessages);
            }}
          >
            {minimizeMessages ? (
              <svg
                className="square"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M384 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H384zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
              </svg>
            )}
          </CloseIcon>
          <></>
        </MessageController>
        <Messages $minimizeMessages={minimizeMessages}>
          {isPublicChannel &&
            publicMessages &&
            publicMessages.map((message, index) => (
              <Message key={index}>
                <span>{message.charName} : </span>
                <span>{message.message}</span>
              </Message>
            ))}
          {!isPublicChannel &&
            privateMessages &&
            privateMessages.map((message, index) => (
              <Message key={index}>
                <span>{message.charName} : </span>
                <span>{message.message}</span>
              </Message>
            ))}
          {privateMessages && console.log(privateMessages.message)}
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
