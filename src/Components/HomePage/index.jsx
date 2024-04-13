import styled, { css } from 'styled-components';

const containerStyles = css`
  border-radius: 10px;
  font-size: 16px;
  padding: 5px 10px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background-color 200ms ease 0s, border-color 200ms ease 0s;
`;
const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
`;
const Header = styled.header`
  width: 100%;
  height: 80px;
  padding: 10px 30px;
  background-color: #333a64;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    gap: 50px;
    width: 400px;
    height: 100%;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
    span {
      color: #fff;
      font-size: 50px;
      letter-spacing: 6px;
    }
  }
  .right {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 400px;
    height: 100%;
  }
`;
const Profile = styled.button`
  ${containerStyles}
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: inherit;
  color: #fff;
  &:hover {
    background-color: #545c8f;
  }
  .userimg {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const CreateSpace = styled.button`
  ${containerStyles}
  width: 150px;
  height: 50px;
  box-shadow: 0 4px #c1a23c;
  color: #5e4800;
  background-color: #ffd95e;
  transition: all 0.2s ease;
  &:active {
    box-shadow: 0 1px #c1a23c;
    transform: translateY(3px);
  }
`;
const SearchBar = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 30px 0px 30px;
  background-color: #282d4e;
`;
const InputWrapper = styled.div`
  ${containerStyles}
  cursor: auto;
  width: 200px;
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

const MainPage = styled.div`
  background-color: #282d4e;
  height: 100%;
`;
const RoomWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px 50px;
  gap: 60px;
`;
const Room = styled.div`
  height: 300px;

  .top {
    height: 80%;
    background-image: url(/images/map1.png);
    background-size: cover;
    background-position: center;
    border-radius: 10px;
  }
  .bottom {
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:#fff;
    .mapName{
      font-weight: 700;
      color: #fff;
    }
  }
`;
export default function HomePage() {
  return (
    <Wrapper>
      <Header>
        <div className="left">
          <img src="/images/logo.png" alt="logo" />
          <span>ChouChouZoo</span>
        </div>
        <div className="right">
          <Profile>
            <div className="userimg">
              <img src="/images/profile.jpg" alt="" />
            </div>
            <div>
              <span>林以理</span>
            </div>
          </Profile>
          <CreateSpace>Create space</CreateSpace>
        </div>
      </Header>
      <SearchBar>
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
          <input type="text" placeholder="Search" />
        </InputWrapper>
      </SearchBar>
      <MainPage>
        <RoomWrapper>
          {new Array(6).fill(null).map(index=>
          <Room key = {index}>
          <div className="top"></div>
          <div className="bottom">
            <span className='mapName'>MapName</span>
            <span className='date'>2024-04-13</span>
          </div>
        </Room>
          )}
          
        </RoomWrapper>
      </MainPage>
    </Wrapper>
  );
}
