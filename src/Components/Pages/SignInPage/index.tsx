import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Cat from '@/Components/Cat';
import useValidatedInput from '@/utils/hooks/useValidatedInput';
import { signInToAuth } from '@/utils/firebase/auth';
import { getUserFromFirestore } from '@/utils/firebase/firestore';
import { useUserState } from '@/utils/zustand';
import Logo from '@/Components/Logo';
import type { InputWrapperProps } from '@/types';
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-image: url('/images/signInBg.png');
  background-size: cover;
  > button {
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;
const SignInWrapper = styled.div`
  width: 360px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 25px;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  > div:first-of-type {
    background-position: -1470px 250px;
  }
  > div:nth-of-type(2) {
    background-position: -1280px 250px;
  }
  > div:nth-of-type(3) {
    background-position: -1410px 250px;
  }
`;

const Middle = styled.div`
  width: 100%;
  font-size: 32px;
  line-height: 42px;
  font-weight: bold;
  text-align: center;
`;
const Bottom = styled.div`
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  label {
    display: block;
  }
`;

const InputWrapper = styled.div<InputWrapperProps>`
  width: 100%;
  input {
    outline: none;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
    &:focus {
      border: 1px solid
        ${({ $value, $isValid }) =>
          $value ? ($isValid ? 'green' : 'red') : '#1e84d8'};
    }
  }
`;
const SignInUpButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.backgroundBlue0};
  font-size: 18px;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBlue0};
  }
`;

const SignUpButton = styled.button`
  display: block;
  width: 60px;
  height: 40px;
  margin: -5px auto 0px auto;
  background-color: inherit;
  font-size: 14px;
  text-decoration-line: underline;
  color: #aaa;
  border: none;
  cursor: pointer;
`;
export default function SignInPage() {
  const { setUser } = useUserState();
  const navigate = useNavigate();
  const emailInput = useValidatedInput('test01@mail.com', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const passwordInput = useValidatedInput('000000', /^.{6,}$/);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.isValid) {
      alert('請輸入正確的電子郵件');
      return;
    }
    if (!passwordInput.isValid) {
      alert('請輸入密碼');
      return;
    }

    
    const user = await signInToAuth(emailInput.value, passwordInput.value);
    if (!user) return;
    const userData = await getUserFromFirestore(user.uid);
    if (!userData) return;
    setUser(userData);
    navigate('/');
    emailInput.clear();
    passwordInput.clear();
  };
  const handleSignUpClick = () => {
    navigate('/signUp');
  };
  return (
    <Wrapper>
      <Logo />
      <SignInWrapper>
        <Top>
          <Cat image="gold_0" />
          <Cat image="gold_0" />
          <Cat image="gold_0" />
        </Top>
        <Middle>
          <p>Sign in</p>
        </Middle>
        <Bottom>
          <form
            onSubmit={(e) => {
              handleSignIn(e);
            }}
          >
            <InputWrapper
              $isValid={emailInput.isValid}
              $value={emailInput.value}
            >
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="chou@gmail.com"
                value={emailInput.value}
                onChange={emailInput.onChange}
              />
            </InputWrapper>
            <InputWrapper
              $isValid={passwordInput.isValid}
              $value={passwordInput.value}
            >
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="******"
                value={passwordInput.value}
                onChange={passwordInput.onChange}
              />
            </InputWrapper>
            <SignInUpButton type="submit">Sign in</SignInUpButton>
          </form>
          <SignUpButton onClick={handleSignUpClick}>Sign up</SignUpButton>
        </Bottom>
      </SignInWrapper>
    </Wrapper>
  );
}
