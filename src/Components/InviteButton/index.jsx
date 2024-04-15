import styled from "styled-components"

const Button = styled.button`
    width:24px;
    height:24px;
    cursor: pointer;
    background-color:inherit;
    color:white;
`
export default function InviteButton({roomId, roomName}) {
    const inviteFriends = () => {
        const textToCopy = `http://localhost:5173/invite/${roomId}/${roomName}`;
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
        <span className='inviteIcon' onClick={inviteFriends}> 
                        
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                          />
                        </svg>
                      </span>
    </Button>
  )
}
