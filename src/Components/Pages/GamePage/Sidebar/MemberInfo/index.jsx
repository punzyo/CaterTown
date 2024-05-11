import styled from 'styled-components';
import MemberIcon from '../../../../MemberIcon';
import { resetUnreadMessage } from '../../../../../firebase/firestore';
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 5px;
  &:hover {
    background-color: #333a64;
    cursor: pointer;
  }

`;
const MemberIconWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;
export default function MemberInfo({
  member,
  roomId,
  userId,
  isOnline,
  changeChannel,
  privateChannel,
  unreadMessages,
  setPrivateCharName,
  setMinimizeMessages,
}) {
  const resetUnreadMessageHandler = async (playerId) => {
    await resetUnreadMessage({
      roomId,
      userId,
      privateChannelId: playerId,
    });
    await resetUnreadMessage({
      roomId,
      userId,
      privateChannelId: privateChannel,
    });
  };
  async function handleClick() {
    if (member.userId === userId) {
      return;
    }
    changeChannel(member.userId);
    setPrivateCharName(member.charName);
    setMinimizeMessages(false);
    await resetUnreadMessageHandler(member.userId);
  }

  return (
    <Wrapper onClick={handleClick}>
      <MemberIconWrapper>
        <MemberIcon
          image={member.character}
          isOnline={isOnline}
          unreadMessages={unreadMessages[member.userId]?.count}
          background={true}
        />
      </MemberIconWrapper>
      <span>{member.charName}</span>
    </Wrapper>
  );
}
