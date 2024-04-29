import styled from 'styled-components';
import Cat from '../Cat';
import OnlineStatus from '../OnlineStatus';
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.$background===true ? 'white' : 'inherit')};
  border: 1px solid  ${(props) => (props.$background===true ? '#545c8f' : 'inherit')};
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
export default function MemberIcon({ image, isOnline, unreadMessages,background }) {
  return (
    <Wrapper $isOnline={isOnline} $background={background}>
      <Cat image={image} />
      {isOnline !== null && <OnlineStatus isOnline={isOnline} />}
      {!!unreadMessages && <UnreadIcon>{unreadMessages}</UnreadIcon>}
    </Wrapper>
  );
}
