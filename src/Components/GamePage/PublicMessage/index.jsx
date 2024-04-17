import styled from 'styled-components';
import { useFormInput } from '../../../utils/hooks/useFormInput';
import {
  sendPublicMessage,
  sendPrivateMessage,
} from '../../../firebase/firestore';
import { useState, useEffect, useRef } from 'react';
import { usePrivateMessages } from '@/utils/hooks/usePrivateMessages';

const messageHeight = '350px';
const Wrapper = styled.div`
  width: 350px;
  height: ${(props) => (props.$minimizeMessages ? '0px' : '300px')};
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: ${(props) => (props.$minimizeMessages ? '-32px' : '0px')};
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
`;
const ChannelWrapper = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
`;
const Channel = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  text-align: center;
  border: 1px solid;
  background-color: ${(props) => (props.$selected ? 'gray' : '')};
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
  right: 30px;
  top: 3px;
  width: 20px;
  height: 20px;
  svg {
    fill: white;
  }
`;
const MessageInput = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 30px;
  background-color: white;
  display: flex;
  align-items: center;
  input {
    width: 85%;
    height: 100%;
    padding: 5px 10px;
  }
  button {
    width: 15%;
    height: 100%;
    padding: 5px 10px;
    cursor: pointer;
    border: 1px solid;
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
}) {
  const messageInput = useFormInput('');
  const messagesEndRef = useRef(null);
  const [unreadPublicMessages, setUnreadPublicMessages] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (minimizeMessages) setUnreadPublicMessages((prevState) => prevState + 1);
  }, [publicMessages]);

  useEffect(() => {
    if (!minimizeMessages && isPublicChannel) {
      setUnreadPublicMessages(0);
    }
  }, [minimizeMessages]);
  const sendMessage = async () => {
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
                }}
              >
                {privateCharName}
              </Channel>
            )}
          </ChannelWrapper>
          <CloseIcon
            onClick={() => {
              setMinimizeMessages(!minimizeMessages);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
            </svg>
          </CloseIcon>
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
        <MessageInput>
          <input
            type="text"
            value={messageInput.value}
            onChange={messageInput.onChange}
          />
          <button onClick={sendMessage}>送出</button>
        </MessageInput>
      )}
    </Wrapper>
  );
}
