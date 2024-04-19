import styled from 'styled-components';
import Cat from '../Cat';
import OnlineStatus from '../OnlineStatus';
const Wrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  background-color: ${(props) => (props.$isOnline!==null ? 'white' : 'inherit')};
  border: 1px solid  ${(props) => (props.$isOnline!==null ? '#545c8f' : 'inherit')};
  border-radius: 50%;
  div:first-child {
    position: absolute;
    top: -3px;
    right: 7px;
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
export default function MemberIcon({ image, isOnline, unreadMessages }) {
  return (
    <Wrapper $isOnline={isOnline}>
      <Cat image={image} />
      {isOnline !== null && <OnlineStatus isOnline={isOnline} />}
      {!!unreadMessages && <UnreadIcon>{unreadMessages}</UnreadIcon>}
    </Wrapper>
  );
}
