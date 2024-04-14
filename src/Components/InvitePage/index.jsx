import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { catImages } from '../../assets/charNames';
import styled from 'styled-components';
import SimpleSlider from '../Silder';
const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  background-color: #282d4e;
  color: #fff;
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
      border-radius: 20%;
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
const MainWrapper =styled.div`
width: 800px;
height:500px;
display: flex;
flex-direction: column;
align-items: center;
padding:50px;
margin: 0 auto;
`

const Title = styled.h1`
  font-size: 40px;
  line-height:48px;
  font-weight: 700;
  letter-spacing: 6px;
  text-align: center;
  margin-bottom: 40px;
  `
const SilderWrapper = styled.div`
position: relative;
    border-radius: 10px;
    border: 1px solid black;
    width: 320px;
    height: 180px;
    color: white;
  .slick-slider {
    display: flex;
    align-items: center;
    position: static;
    height: 100%;
    button:before{
        color:white;
    }
    .slick-prev{
        left:-45px;
    }
    .slick-next{
        right:-45px;
    }
}
`;
const SliderStyle = styled.div`
  position: relative;
  border: 1px solid black;
  border-radius: 10px;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  .slick-slider {
    position: static;
  }
  button:before {
    color: black;
  }
  .slick-dots {
    height: 50px;
  }
`;
export default function InvitePage() {
  const { roomId, roomName } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleSlideChange = (index) => {
    setSelectedImageIndex(index);
  };
  return (
    <Wrapper>
      <Header>
        <div className="left">
          <img src="/images/logo.png" alt="logo" />
          <span>ChouChouZoo</span>
        </div>
        <div className="right">
          <div className="userimg">
            <img src="/images/profile.jpg" alt="" />
          </div>
        </div>
      </Header>
      <MainWrapper>
      <Title>You have been invited to the room {roomName}!</Title>
      <SilderWrapper>
        <SimpleSlider onSlideChange={handleSlideChange} data={catImages} />
      </SilderWrapper>
      </MainWrapper>
    </Wrapper>
  );
}
