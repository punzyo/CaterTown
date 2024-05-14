import styled, { css } from 'styled-components';
import theme from '../../../theme';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Buttons/Button';
import Logo from '../../Logo';
import { useUserState } from '../../../utils/zustand';
const containerStyles = css`
  border-radius: 5px;
  font-size: 16px;
  padding: 5px 10px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
  transition: background-color 200ms ease 0s, border-color 200ms ease 0s;
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
    gap: 20px;
    min-width: 200px;
    height: 100%;
  }
  input {
    width: 50px;
  }
`;
const Main = styled.main`
  width: 100%;
  min-height: calc(100% - 80px);
  padding: 120px 40px 20px;
  color: white;
  letter-spacing: 1px;
  background-color: #373e6c;
  ${theme.breakpoints.sm} {
    gap: 25px;
    padding: 50px 15px;
  }
  .top {
    height: 450px;
    display: flex;
    ${theme.breakpoints.sm} {
      height: 300px;
    }
    .left {
      width: 50%;
      color: white;
      animation: slideIn5 0.7s ease-out;
      > div {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
      }
      h1 {
        font-size: 3.5rem;
        font-weight: 700;
        line-height: 1.2;
        ${theme.breakpoints.sm} {
          font-size: 2.8rem;
        }
      }
    }
    .right {
      width: 50%;
      border-radius: 10px;
      aspect-ratio: 1/1;
      overflow: hidden;
      animation: slideIn 0.7s ease-out;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    @keyframes slideIn {
      from {
        transform: translateX(20%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideIn5 {
      from {
        transform: translateX(-20%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  }
  .bottom {
    width: 100%;
    min-height: 200px;
    display: grid;
    margin: 80px 0;
    gap: 50px;
    grid-template-columns: repeat(3, 1fr);
    ${theme.breakpoints.sm} {
      gap: 15px;
      grid-template-columns: repeat(1, 1fr);
        }
    > div {
      border-radius: 10px;
      height: 100%;
      border-top: 1px solid #373e6c;
      background-color: #282d52;
      padding: 30px;
      ${theme.breakpoints.sm} {
        padding: 15px;
        }
      h2 {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
      }
      img {
        width: 30px;
        height: 30px;
        padding-bottom: 2px;
        margin-right: 5px;
      }
    }
    > div:first-of-type {
      animation: slideIn2 0.5s ease-out;
    }
    > div:nth-of-type(2) {
      animation: slideIn3 0.6s ease-out;
    }
    > div:nth-of-type(3) {
      animation: slideIn4 0.7s ease-out;
    }
    @keyframes slideIn2 {
      from {
        transform: translateY(20%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes slideIn3 {
      from {
        transform: translateY(30%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes slideIn4 {
      from {
        transform: translateY(40%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
`;

const SignUp = styled.div`
  ${containerStyles}
  width: 90px;
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
const SignIn = styled.div`
  width: 90px;
  height: 40px;
  > button {
    width: 100%;
  }
`;
export default function LandingPage() {
  const { user } = useUserState();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.id) navigate('/home');
  }, [user.id]);
  return (
    <>
      <Header>
        <div className="left">
          <Logo></Logo>
          <span>Cater town</span>
        </div>
        <div className="right">
          <SignUp
            onClick={() => {
              navigate('/signup');
            }}
          >
            <button>註冊</button>
          </SignUp>
          <SignIn
            onClick={() => {
              navigate('/signin');
            }}
          >
            <Button content="登入" />
          </SignIn>
        </div>
      </Header>
      <Main>
        <div className="top">
          <div className="left">
            <div>
              <h1>讓你的團隊協作，沒有距離</h1>
              <SignUp
                onClick={() => {
                  navigate('/signup');
                }}
              >
                <button>註冊</button>
              </SignUp>
            </div>
          </div>
          <div className="right">
            <img src="/images/map2.png" alt="" />
          </div>
        </div>
        <div className="bottom">
          <div>
            <h2>
              <img src="/images/cat-orange.svg" alt="cat-orange" />
              讓協作團隊一起在線上相聚
            </h2>
            <p>
              Cater
              town提供了一個溫暖的線上虛擬環境，不只有提供視音訊的服務，還有高達50種可愛貓咪可供選擇，讓我們不管身在何方，都能用自己最喜歡的樣貌，和夥伴們一起在線上交流。
            </p>
          </div>
          <div>
            <h2>
              <img src="/images/cat-calico.svg" alt="cat-calico" />
              獨立空間，各自討論不打擾
            </h2>
            <p>
              需要分組討論怎麼辦?不用擔心，只要進入特定空間，就不會收到外面視音訊的打擾，只能接收相同空間的訊息，讓分工作業討論變得更有效率!
            </p>
          </div>
          <div>
            <h2>
              <img src="/images/cat-grey.svg" alt="cat-grey" />
              追蹤PR，變得簡單又有趣
            </h2>
            <p>
              藉由串接GitHub webhook，當追蹤的repository 收到pull
              requests時，對應貓咪的頭上就會跑出驚嘆號的通知，讓多人協作的同時享受更多的樂趣。
            </p>
          </div>
        </div>
      </Main>
    </>
  );
}
