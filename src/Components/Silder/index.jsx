import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const BackGround = styled.div`
  position: relative;
  border: 1px solid black;
  border-radius:10px;
  width: 90%;
  height: 100%;
  display:flex;
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
const ImgDiv =styled.div`
width: 40px;
height: 70px;
margin-top:20px;
background-position: -707px -65px;
background-size: 2048px 1088px;
background-image: url(/images/animals/${(props)=>props.$backgroundImage}.png);
`

export default function SimpleSlider({onSlideChange, data }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange:onSlideChange 
  };
  return (
    <BackGround>
      <Slider {...settings}>
        {data.map((image, index) =>(
            <ImgDiv key={index} $backgroundImage={`${image}`}>
            </ImgDiv>
        ))}
      </Slider>
    </BackGround>
  );
}
