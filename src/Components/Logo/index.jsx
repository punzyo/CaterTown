import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../../utils/zustand';
const LogoWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 20%;
    object-fit: cover;
  }
`;
export default function Logo() {
  const { user } = useUserState();
  const navigate = useNavigate();
  return (
    <LogoWrapper
      onClick={() => {
        if(user.id)
        {
          navigate('/home');
        }
        else
        navigate('/')
      }}
    >
      <img src="/images/cat_logo_64.png" alt="logo" />
    </LogoWrapper>
  );
}
