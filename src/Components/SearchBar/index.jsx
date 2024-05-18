import styled from 'styled-components';
import SearchIcon from '../Icons/SearchIcon';
const InputWrapper = styled.div`
  border-radius: 8px;
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

export default function SearchBar({ onChange, placeholder }) {
  return (
    <InputWrapper>
      <div className="icon">
        <SearchIcon />
      </div>
      <input type="text" placeholder={placeholder} onChange={onChange} />
    </InputWrapper>
  );
}
