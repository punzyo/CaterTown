import styled from 'styled-components';
const LogoWrapper = styled.div`
display:flex;
align-items:center;
gap:10px;
img {
    width: 50px;
    height: 50px;
    border-radius: 20%;
    object-fit: cover;
  }
`;
export default function Logo({children}) {
  return (
    <LogoWrapper>
      <a href="/"><img src="/images/cat_logo_64.png" alt="logo" /></a>
      {children}
    </LogoWrapper>
  );
}
