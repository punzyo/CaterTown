import styled, { css } from 'styled-components';
import Logo from '@/Components/Logo';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '@/utils/zustand';
import { TabbyCat } from '../Icons/CatIcons';
import React, { ReactNode } from 'react';


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
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue4};
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
    span {
      color: ${({ theme }) => theme.colors.white};
      font-size: 50px;
      letter-spacing: 6px;
      ${({ theme }) => theme.breakpoints.sm} {
        font-size: 36px;
        letter-spacing: 4px;
      }
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
const Profile = styled.div`
  ${containerStyles}
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.white};
  cursor: auto;

  .userImg {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    svg {
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
  background-color: ${({ theme }) => theme.colors.backgroundBlue6};
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBlue7};
  }
  button {
    font-size: 16px;
    font-weight: bold;
    background-color: inherit;
    color: ${({ theme }) => theme.colors.white};
  }
`;
interface HeaderProps {
  children: ReactNode;
}
export default function Header({ children }:HeaderProps) {
  const navigate = useNavigate();
  const { user, resetUser } = useUserState();
  const handleSignOut = () => {
    resetUser();
    navigate('/signUp');
  };
  return (
    <Wrapper>
      <div className="left">
        <Logo></Logo>
        <span>Cater town</span>
      </div>

      <div className="right">
        <Profile>
          <div className="userImg">
            <TabbyCat />
          </div>
          <div>
            <span>{user?.name}</span>
          </div>
        </Profile>
        <SignOut onClick={handleSignOut}>
          <button>登出</button>
        </SignOut>
        {children}
      </div>
    </Wrapper>
  );
}
