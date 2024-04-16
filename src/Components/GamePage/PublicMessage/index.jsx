import styled from 'styled-components';
import { useFormInput } from '../../../utils/hooks/useFormInput';
import { sendPublicMessage } from '../../../firebase/firestore';
import { useEffect, useRef } from 'react';
const messageTest = [
  { charName: '班尼迪克但', message: 'hello' },
  { charName: '抽抽我大哥', message: 'yoyo' },
];
const messageHeight = '350px';

const MessageWrapper = styled.div`
  width: 350px;
  height: ${messageHeight};
  position: absolute;
  top: -${messageHeight};
  left: 0;
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
position: absolute;
  width: 100%;
  height: 20px;
`;
const Messages = styled.div`
width: 100%;
height: 300px;
margin-top:20px;
padding-bottom: 5px;
overflow-y: scroll;
`
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
    cursor:pointer;
    border: 1px solid;
  }
`;

export default function PublicMessage({playerCharName,roomId, messages}) {
  const playerpublicInput = useFormInput('');
  const messagesEndRef = useRef(null);  // 創建一個 ref

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();  // 當訊息更新時滾動到底部
  }, [messages]);  // 依賴陣列中包含 messages

  const sendMessage =async()=>{
    console.log(roomId, playerCharName,playerpublicInput.value);
    await sendPublicMessage({roomId, charName:playerCharName, message:playerpublicInput.value})
  }
  return (
    <MessageWrapper>
      <MessageController>
      <CloseIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
        </svg>
      </CloseIcon>
      </MessageController>
      <Messages >
      {messages&& messages.map((message, index) => (
        <Message key={index}>
          <span>{message.charName} : </span>
          <span>{message.message}</span>
        </Message>
      ))}
            <div ref={messagesEndRef}/>
      </Messages>

      <MessageInput>
        <input type="text" value={playerpublicInput.value} onChange={playerpublicInput.onChange}/>
        <button onClick={sendMessage}>送出</button>
      </MessageInput>
    </MessageWrapper>
  );
}
