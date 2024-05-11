import styled from 'styled-components';

const InputWrapper = styled.div`
border-radius:8px;
cursor: auto;
width: 100%;
height: 40px;
border: 1px solid #909ce2;
display: flex;
align-items: center;
.icon {
  display: flex;
  align-items: center;
  svg {
    color: #fff;
    width: 35px;
    height: 20px;
  }
}
input {
  width: 100%;
  padding: 10px 10px 10px 0;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #fff;
  background-color: inherit;
  &::placeholder {
    font-weight: 500;
  }
}
`;

export default function SearchBar({onChange, placeholder}) {
  return (
    <InputWrapper>
      <div className="icon">
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <input type="text" placeholder={placeholder} onChange={onChange}/>
    </InputWrapper>
  );
}
