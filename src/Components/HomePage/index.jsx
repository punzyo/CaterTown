import styled from 'styled-components';

const DIV = styled.div`
height: 50px;
border-radius: 10px;
font-size:20px;
padding: 5px 10px;
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
`;
const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
`;
const Header = styled.header`
  width: 100%;
  height: 80px;
  background-color: #fd823d;
  display: flex;
  justify-content: space-between;
  .left {
    width: 400px;
    height:100%
  }
  .right {
    display: flex;
    justify-content: space-between;
    width: 600px;
    height: 100%;
  }
`;
const Button = styled.button`
${DIV}

  border-radius: 10px;
  box-shadow: 0 4px #c1a23c;
  font-size:20px;
  color: #5e4800;
  background-color: #ffd95e;
  padding: 5px 10px;
  border-radius: 5px;
 
  transition: all .2s ease;
  &:active {
    box-shadow: 0 1px #c1a23c;
    transform: translateY(3px);
  }
`;
export default function HomePage() {
  return (
    <Wrapper>
      <Header>
        <div className='left'></div>
        <div className='right'>
            <Button>Create space</Button>
        </div>
      </Header>
    </Wrapper>
  );
}
