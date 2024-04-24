import styled from 'styled-components';
import Cat from '../../Cat';
import useValidatedInput from '../../../utils/hooks/useValidatedInput';
import { registerUsertoAuth } from '../../../firebase/auth';
import { saveUserToFirestore } from '../../../firebase/firestore';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-image: url('/signInBg.png');
  background-size: cover;
`;
const SignInWrapper = styled.div`
  width: 360px;
  height: 510px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 15px;
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
  font-size: 36px;
  line-height: 42px;
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  >p:first-of-type{
    font-size: 40px;
  }
  >p{
    display: flex;
    font-family: "Jersey 25", sans-serif;
  font-weight: 400;
  }
  >p:nth-of-type(even){
    padding-right:20px;
    justify-content: flex-end;
    
  }
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
const InputWrapper = styled.div`
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
        ${(props) =>
          props.$value ? (props.$isValid ? 'green' : 'red') : '#1e84d8'};
    }
  }
`;
const SignInUpButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #191d33;
  font-size: 18px;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #242b53;
  }
`;
export default function SignUpPage() {
  const name = useValidatedInput('', /^[A-Za-z' -]+$/);
  const email = useValidatedInput('', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const password = useValidatedInput('', /^.{6,}$/);

  const signIn = async ({ e, name, email, password }) => {
    e.preventDefault();

    const authID = await registerUsertoAuth({ email, password });
    if (authID) {
      const isSaveSucess = await saveUserToFirestore({ authID, name, email });
      alert(isSaveSucess===true?'註冊大成功':'註冊大失敗')
    }
  };
  return (
    <Wrapper>
      <SignInWrapper>
        <Top>
          <Cat image="brown_8" />
          <Cat image="brown_8" />
          <Cat image="brown_8" />
        </Top>
        <Middle>
          <p>Choose</p>
          <p>ChouChou Zoo</p>
          <p>No more</p>
          <p>Monday blue</p>
        </Middle>
        <Bottom>
          <form
            onSubmit={(e) => {
              signIn({
                e,
                name: name.value,
                email: email.value,
                password: password.value,
              });
            }}
          >
            <InputWrapper $isValid={name.isValid} $value={name.value}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="John"
                value={name.value}
                onChange={name.onChange}
              />
            </InputWrapper>
            <InputWrapper $isValid={email.isValid} $value={email.value}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="chou@gmail.com"
                value={email.value}
                onChange={email.onChange}
              />
            </InputWrapper>
            <InputWrapper $isValid={password.isValid} $value={password.value}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="******"
                value={password.value}
                onChange={password.onChange}
              />
            </InputWrapper>
            <SignInUpButton type="submit">Sign up</SignInUpButton>
          </form>
        </Bottom>
      </SignInWrapper>
    </Wrapper>
  );
}
