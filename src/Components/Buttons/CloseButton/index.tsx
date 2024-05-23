import styled from 'styled-components';
const Button = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: inherit;
`;
interface CloseButtonProps {
  onClickFunc: () => void;
}
export default function CloseButton({ onClickFunc }: CloseButtonProps) {
  return (
    <Button onClick={onClickFunc}>
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
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </Button>
  );
}
