import styled, { css } from 'styled-components';import Logo from '../Logo';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../utils/zustand';
const containerStyles = css`
  border-radius: 10px;
  font-size: 16px;
  padding: 5px 10px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background-color 200ms ease 0s, border-color 200ms ease 0s;
`;
const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  padding: 10px 20px;
  background-color: #333a64;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
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
    height: 100%;
    gap: 15px;
  }
  input {
    width: 50px;
  }
`;
const Profile = styled.button`
  ${containerStyles}
  min-width: 100px;
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
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const SignOut = styled.div`
  ${containerStyles}
  min-width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #4979bc;
  color: #fff;
  &:hover {
    background-color: #558cda;
  }
  button {
    font-size: 16px;
    font-weight: bold;
    background-color: inherit;
    color: #fff;
  }
`;
export default function Header({ children }) {
  const navigate = useNavigate();
  const { user, resetUser } = useUserState();

  return (
    <Wrapper>
      <div className="left">
        <Logo></Logo>
        <span>Cater town</span>
      </div>

      <div className="right">
        <Profile>
          <div className="userimg">
            <img src="/images/cat-tabby.svg" alt="" />
          </div>
          <div>
            <span>{user.name}</span>
          </div>
        </Profile>
        <SignOut
          onClick={() => {
            navigate('/signup');
            resetUser()
          }}
        >
          <button>登出</button>
        </SignOut>
        {children}
      </div>
    </Wrapper>
  );
}
