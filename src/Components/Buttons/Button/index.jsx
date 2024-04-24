import styled from 'styled-components';
const ButtonStyle = styled.button`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  font-size: inherit;
  font-weight: inherit;
  padding: 5px 10px;
  box-shadow: 0 4px #c1a23c;
  color: #5e4800;
  background-color: #ffd95e;
  transition: all 0.2s ease;
  cursor: pointer;
  &:active {
    box-shadow: 0 1px #c1a23c;
    transform: translateY(3px);
  }
`;
export default function Button({ clickFunc, content }) {
  return <ButtonStyle onClick={clickFunc}>{content}</ButtonStyle>;
}
