import styled from 'styled-components';
import { useFormInput } from '../../../utils/hooks/useFormInput';
import { sendPublicMessage } from '../../../firebase/firestore';
import { useState, useEffect, useRef } from 'react';
const messageTest = [
  { charName: '班尼迪克但', message: 'hello' },
  { charName: '抽抽我大哥', message: 'yoyo' },
];
const messageHeight = '350px';

const MessageWrapper = styled.div`
  width: 350px;
  height: ${messageHeight};
  position: absolute;
  bottom: 0;
  right: 300px;
  background-color: #202540;
  border: 1px solid #333a64;
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
`;
const ChannelWrapper = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
`;
const Channel = styled.div`
  width: 50%;
  height: 100%;
  text-align: center;
  border: 1px solid;
  background-color: ${(props) => (props.$selected ? 'gray' : '')};
`;
const Messages = styled.div`
  width: 100%;
  height: 300px;
  padding-top: 5px;
  padding-bottom: 15px;
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
  bottom: 0;
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
    color: black;
  }
`;

export default function PublicMessage({
  playerCharName,
  roomId,
  publicMessages,
  privateChannel,
  setPrivateChannel,isPublicChannel,setIsPublicChannel
}) {
  const playerpublicInput = useFormInput('');
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [publicMessages]);

  const sendMessage = async () => {
    console.log(roomId, playerCharName, playerpublicInput.value);
    await sendPublicMessage({
      roomId,
      charName: playerCharName,
      message: playerpublicInput.value,
    });
  };

  return (
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
          </Channel>
          {privateChannel && (
            <Channel
              $selected={!isPublicChannel}
              onClick={() => {
                setIsPublicChannel(false);
              }}
            >
              {privateChannel}
            </Channel>
          )}
        </ChannelWrapper>
        <CloseIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
          </svg>
        </CloseIcon>
      </MessageController>
      <Messages>
        {publicMessages &&
          publicMessages.map((message, index) => (
            <Message key={index}>
              <span>{message.charName} : </span>
              <span>{message.message}</span>
            </Message>
          ))}
        <div ref={messagesEndRef} />
      </Messages>

      <MessageInput>
        <input
          type="text"
          value={playerpublicInput.value}
          onChange={playerpublicInput.onChange}
        />
        <button onClick={sendMessage}>送出</button>
      </MessageInput>
    </MessageWrapper>
  );
}
