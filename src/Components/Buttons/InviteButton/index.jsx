import { useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #333a64;
  }
`;
const Button = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  svg {
    
    fill: white;
  }
`;

const Message = styled.div`
  position: absolute;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 2px;
  padding: 2px 5px;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y - 20}px;
  user-select: none;
  font-size: 14px;
  cursor: auto;
  color: black;
  animation: fadeOut 2s ease-out;
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export default function InviteButton({ link, message }) {
  const [showMessage, setShowMessage] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const showingMessage = useRef(false);

  const inviteFriends = (e) => {
    if (showingMessage.current) return;
    showingMessage.current = true;
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }

    const textToCopy = link;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          showingMessage.current = false;
        }, 2000);
      })
      .catch((err) => {
        console.error('複製連結錯誤', err);
      });
  };

  return (
    <Wrapper onClick={inviteFriends} id="inviteButton">
      <Button ref={buttonRef} className="inviteIcon" >
        {showMessage && (
          <Message x={mousePosition.x} y={mousePosition.y}>
            {message}
          </Message>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
        </svg>
      </Button>
    </Wrapper>
  );
}
