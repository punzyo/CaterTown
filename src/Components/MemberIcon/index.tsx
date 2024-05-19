import styled from 'styled-components';
import Cat from '../Cat';
import OnlineStatus from '../OnlineStatus';

interface WrapperProps {
  $background: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ $background }) => ($background ? 'white' : 'inherit')};
  border: 1px solid ${({ $background }) => ($background ? '#545c8f' : 'inherit')};
  border-radius: 50%;
  div:first-child {
    position: absolute;
    top: -0px;
    right: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const UnreadIcon = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface MemberIconProps {
  image: string;
  isOnline: boolean | null;
  unreadMessages: number;
  background: boolean;
}

export default function MemberIcon({ image, isOnline, unreadMessages,background }:MemberIconProps) {
  return (
    <Wrapper $background={background}>
      <Cat image={image} />
      {isOnline !== null && <OnlineStatus isOnline={isOnline} />}
      {!!unreadMessages && <UnreadIcon>{unreadMessages}</UnreadIcon>}
    </Wrapper>
  );
}
