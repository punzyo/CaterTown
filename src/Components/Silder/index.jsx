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
const catImages = [
  'black_0',
  'black_1',
  'black_2',
  'black_3',
  'black_4',
  'blue_0',
  'blue_1',
  'blue_2',
  'blue_3',
  'brown_0',
  'brown_1',
  'brown_2',
  'brown_3',
  'brown_4',
  'brown_5',
  'brown_6',
  'brown_7',
  'brown_8',
  'calico_0',
  'cotton_candy_blue_0',
  'cotton_candy_pink_0',
  'creme_0',
  'creme_1',
  'dark_0',
  'game_boy_0',
  'game_boy_1',
  'game_boy_2',
  'ghost_0',
  'gold_0',
  'grey_0',
  'grey_1',
  'grey_2',
  'hairless_0',
  'hairless_1',
  'indigo_0',
  'orange_0',
  'orange_1',
  'orange_2',
  'orange_3',
  'peach_0',
  'pink_0',
  'radioactive_0',
  'red_0',
  'red_1',
  'seal_point_0',
  'teal_0',
  'white_0',
  'white_grey_0',
  'white_grey_1',
  'yellow_0',
];
export default function SimpleSlider({onSlideChange }) {
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
        {catImages.map((image, index) =>(
            <ImgDiv key={index} $backgroundImage={`${image}`}>
            </ImgDiv>
        ))}
      </Slider>
    </BackGround>
  );
}
