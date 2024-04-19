import styled from "styled-components";

const Wrapper = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 4px;
  bottom: 0px;
  border: 2px solid black;
  background-color: ${(props) => (props.$isOnline ? 'green' : 'gray')};
  border-radius: 50%;
`;

export default function OnlineStatus({isOnline}) {
  return (
    <Wrapper $isOnline={isOnline}></Wrapper>
  )
}
