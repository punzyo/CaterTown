import styled from 'styled-components';
import Cat from '../../Cat';
import { useFormInput } from '../../../utils/hooks/useFormInput';
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
  width: 350px;
  height: 395px;
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
  margin: 10px 0;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 1px;
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
      border: 1px solid #1e84d8;
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
export default function SignInPage() {
  const name = useFormInput('');
  const email = useFormInput('');
  const password = useFormInput('');

  const signIn = async (e) => {
    e.preventDefault();
    const name = name.value
    const email = email.value
    const password = password.value
    const authID = registerUsertoAuth({email, password})
    if(authID){
        const dbUser = await saveUserToFirestore({authID,name,email})
        alert('存到firestore成功', dbUser)
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
          <p>Get Start!</p>
        </Middle>
        <Bottom>
          <form onSubmit={signIn}>
            <InputWrapper>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="John"
                value={name.value}
                onChange={name.onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="chou@gmail.com"
                value={email.value}
                onChange={email.onChange}
              />
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                placeholder="******"
                value={password.value}
                onChange={password.onChange}
              />
            </InputWrapper>
            <SignInUpButton type="submit">Sign in</SignInUpButton>
          </form>
        </Bottom>
      </SignInWrapper>
    </Wrapper>
  );
}
