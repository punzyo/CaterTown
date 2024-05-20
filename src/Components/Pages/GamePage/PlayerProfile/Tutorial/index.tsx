import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import { tutorialContent } from './tutorialContent';
import Dialog from '@/Components/Dialog';
const Wrapper = styled.div`
  position: relative;
  cursor: auto;
  width: 520px;
  height: 450px;
  background-color: #faf4e1;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .slick-slide {
    > div {
      height: 420px;
    }
  }
  .slick-slider {
    width: 80%;
    height: 90%;
    color: black;
    .slick-slide > div {
      padding: 0 10px;
    }
    h2 {
      font-size: 36px;
      text-align: center;
      margin-bottom: 30px;
    }
  }

  img,
  gif {
    width: 100%;
    height: 230px;
    border-radius: 20px;
    margin-bottom: 20px;
    object-fit: contain;
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  .slick-next,
  .slick-prev {
    transform: scale(1.5);
  }
  .slick-next {
    right: -35px;
  }
  .slick-prev {
    left: -35px;
  }
`;
const CategoryWrapper = styled.div`
  position: absolute;
  display: flex;
  top: -30px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 97%;
  height: 30px;
  z-index: -1;
  margin-left: 10px;
`;
interface CategoryProps {
  $isSelected: boolean;
  $last: boolean;
}
const Category = styled.button<CategoryProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  color: black;
  width: 33.3%;
  border-radius: 20px;
  height: 30px;
  background-color: ${({ $isSelected }) =>
    $isSelected
      ? '${({ theme }) => theme.colors.backgroundYellow0}'
      : '${({ theme }) => theme.colors.hoverYellow0}'};
  border: ${({ $isSelected }) => ($isSelected ? '1px' : '1px')} solid
    rgba(0, 0, 0, 0.4);

  border-bottom: none;
  border-radius: 15px 15px 0 0;
  z-index: ${({ $isSelected, $last }) =>
    $isSelected ? '5' : $last ? '-1' : '0'};
  margin-left: -5px;
  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? '' : '${({ theme }) => theme.colors.backgroundYellow1}'};
  }
`;
const Title = styled.h2`
  width: 100%;
  padding: 0 20px;
`;

export default function Tutorial({
  setShowTutorial,
}: {
  setShowTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const BASIC = 'basic';
  const COMMUNICATION = 'communication';
  const PERMISSION = 'permission';
  const categories = [
    { name: '基本教學', id: BASIC },
    { name: '多人通訊', id: COMMUNICATION },
    { name: '權限功能', id: PERMISSION },
  ];
  const [category, setCategory] = useState(BASIC);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const currentContent = tutorialContent[category];
  return (
    <Dialog
      onClickFunc={(e) => {
        e.stopPropagation();
        setShowTutorial(false);
      }}
    >
      <Wrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CategoryWrapper>
          {categories.map((cat, index) => (
            <Category
              key={cat.id}
              $isSelected={category === cat.id}
              onClick={() => setCategory(cat.id)}
              $last={index === categories.length - 1}
            >
              {cat.name}
            </Category>
          ))}
        </CategoryWrapper>
        <Slider {...settings} key={category}>
          {currentContent.map((item, index) => (
            <div key={index}>
              <Title>{item.title}</Title>
              {item.mediaType === 'gif' ? (
                <img
                  src={`/tutorial/${category}/${category}_${index}.gif`}
                  alt={item.title}
                />
              ) : (
                <img
                  src={`/tutorial/${category}/${category}_${index}.png`}
                  alt={item.title}
                />
              )}
              <p>{item.content}</p>
            </div>
          ))}
        </Slider>
      </Wrapper>
    </Dialog>
  );
}
