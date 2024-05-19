import styled from 'styled-components';
interface WrapperProps {
  $isOnline: boolean;
}
const Wrapper = styled.div<WrapperProps>`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  border: 2px solid black;
  background-color: ${({ $isOnline }) => ($isOnline ? 'green' : 'gray')};
  border-radius: 50%;
`;
interface OnlineStatusProps {
  isOnline: boolean;
}
export default function OnlineStatus({ isOnline }: OnlineStatusProps) {
  return <Wrapper $isOnline={isOnline}></Wrapper>;
}
