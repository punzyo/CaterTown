import styled from 'styled-components';
const ButtonStyle = styled.button`
  height: 100%;
  border-radius: 5px;
  font-size: inherit;
  font-weight: bold;
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
  &:hover {
    background-color: #e2c154;
  }
`;
interface ButtonProps {
  onClickFunc?: () => void;
  content: string;
}
export default function Button({ onClickFunc, content }: ButtonProps) {
  return <ButtonStyle onClick={onClickFunc}>{content}</ButtonStyle>;
}
