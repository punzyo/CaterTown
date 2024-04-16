import styled from 'styled-components';
import { useFormInput } from '../../../utils/hooks/useFormInput';

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
  border: 1px solid black;
  color: white;
  padding: 0 10px;
`;
const MessageController = styled.div`
  width: 100%;
  height: 20px;
  border: 1px solid black;
`;
const CloseIcon = styled.div`
  position: absolute;
  right: 15px;
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
  }
`;

export default function PublicMessage() {
  const playerpublicInput = useFormInput('');
  return (
    <MessageWrapper>
      <MessageController />
      <CloseIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
        </svg>
      </CloseIcon>

      {messageTest.map((message, index) => (
        <Message key={index}>
          <span>{message.charName} : </span>
          <span>{message.message}</span>
        </Message>
      ))}
      <MessageInput>
        <input type="text" value={playerpublicInput.value} onChange={playerpublicInput.onChange}/>
        <button>送出</button>
      </MessageInput>
    </MessageWrapper>
  );
}
