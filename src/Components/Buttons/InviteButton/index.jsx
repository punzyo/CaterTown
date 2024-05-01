import styled from 'styled-components';

const Button = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-color: inherit;
  svg{
    fill:white
  }
`;
export default function InviteButton({ roomId, roomName }) {
  const inviteFriends = () => {
    const textToCopy = `${window.location.host}/invite/${roomId}/${roomName}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert('邀請碼已複製到剪貼簿!');
      })
      .catch((err) => {
        console.error('複製邀請網址錯誤', err);
      });
  };
  return (
    <Button>
      <span className="inviteIcon" onClick={inviteFriends}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
      </span>
    </Button>
  );
}
