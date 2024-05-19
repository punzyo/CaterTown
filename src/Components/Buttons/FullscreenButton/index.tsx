import styled from 'styled-components';
interface WrapperProps {
  $isFullScreen: boolean;
}
const Wrapper = styled.button<WrapperProps>`
  position: absolute;
  right: 5px;
  bottom: 5px;
  opacity: 0.2;
  background-color: inherit;
  color: white;
  border: none;
  width: ${(props) => (props.$isFullScreen ? '50px' : '15px')};
  height: ${(props) => (props.$isFullScreen ? '50px' : '15px')};
  cursor: pointer;
  z-index: 2;
  &:hover {
    opacity: 0.5;
  }
  svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    fill: white;
  }
`;
interface FullscreenButtonProps {
  isFullScreen: boolean;
  onClickFunc: () => void;
}
export default function FullscreenButton({ isFullScreen, onClickFunc }:FullscreenButtonProps) {
  return (
    <Wrapper $isFullScreen={isFullScreen} onClick={onClickFunc}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z" />
      </svg>
    </Wrapper>
  );
}
