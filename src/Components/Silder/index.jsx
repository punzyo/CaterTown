import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

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
    <>
      <Slider {...settings}>
        {data.map((image, index) =>(
            <ImgDiv key={index} $backgroundImage={`${image}`}>
            </ImgDiv>
        ))}
      </Slider>
    </>
  );
}
