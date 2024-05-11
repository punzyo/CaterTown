import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
const Mask = styled.div`
  position: fixed;
  top: -140px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: auto;
`;
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
  video {
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
const Category = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  color: black;
  width: 33.3%;
  border-radius: 20px;
  height: 30px;
  background-color: ${(props) => (props.$isSelected ? '#f1d67e' : '#eee3bf')};
  border: ${(props) => (props.$isSelected ? '1px' : '1px')} solid
    rgba(0, 0, 0, 0.4);

  border-bottom: none;
  border-radius: 15px 15px 0 0;
  z-index: ${(props) => (props.$isSelected ? '5' : props.$last ? '-1' : '0')};
  margin-left: -5px;
  &:hover {
    background-color: ${(props) => (props.$isSelected ? '' : '#edda9c')};
  }
`;
const Title = styled.h2`
  width: 100%;
  padding: 0 20px;
`;
const sliderContent = {
  basic: [
    {
      title: "角色移動",
      content: "可以透過WASD，或是方向鍵的上、下、左、右對角色進行移動，碰到障礙物或是地圖邊界時則會停下。",
      mediaType:'video'
    },
    {
      title: "獲取邀請連結",
      content: "點擊上方的圖示可以獲得此房間的邀請連結。"
    },
    {
      title: "控制側邊欄",
      content: "點擊下方欄的圖示以隱藏/顯示側邊欄。"
    },
    {
      title: "離開房間",
      content: "點擊右下角圖示即可離開房間。"
    },
    {
      title: "傳遞文字訊息",
      content: "可以透過全體頻道向所有人發送訊息，或是點擊他人頭像進行一對一的聊天。"
    },
    {
      title: "打開個人面板",
      content: "這裡可以輸入您的GitHub，如果權限為teacher以上，可以使用權限相關的系統。"
    },
    {
      title: "Pull request系統",
      content: "當設置好 GitHub webhook後，若您的角色有至少一則pull request，頭上將會冒出驚嘆號通知，自己或是權限為teacher以上的角色都會看到。"
    }
  ],
  communication:[
    {
      title: "加入多人通訊",
      content: "按下多人通訊的按鈕，連線成功後即可以進行多人視/音訊連線。"
    }, {
      title: "視/音訊距離",
      content: "當進入多人通訊後，只要角色彼此在兩格內的距離，就能看到對方的通訊畫面。"
    }, {
      title: "房間系統",
      content: "島上共有四個獨立的空間，房間內的角色只能接收同個空間的視/音訊，無視距離。"
    },{
      title: "通訊裝置選擇",
      content: "可以點擊圖標右側的按鈕選擇視音訊的輸入源。"
    },
    
    {
      title: "螢幕分享",
      content: "點擊下方螢幕圖示可以對畫面進行分享。"
    },
  
    {
      title: "全螢幕，音量控制",
      content: "點擊視訊畫面右下角可以進行全螢幕，左下角則是音量控制。"
    },
    {
      title: "退出多人通訊",
      content: "點擊右方的按鈕將會離開多人通訊，將不會發送/接收通訊內容。"
    }
  ]
};

export default function Tutorial() {
  const BASIC = 'basic';
  const COMMUNICATION = 'communication';
  const PERMISSION = 'permission';
  const [category, setCategory] = useState(BASIC);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const currentContent = sliderContent[category];
  return (
    <Mask
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Wrapper>
        <CategoryWrapper>
          <Category
            $isSelected={category === BASIC}
            onClick={() => {
              setCategory(BASIC);
            }}
          >
            基本教學
          </Category>
          <Category
            $isSelected={category === COMMUNICATION}
            onClick={() => {
              setCategory(COMMUNICATION);
            }}
          >
            多人通訊
          </Category>
          <Category
            $isSelected={category === PERMISSION}
            onClick={() => {
              setCategory(PERMISSION);
            }}
            $last={true}
          >
            權限功能
          </Category>
        </CategoryWrapper>
        <Slider {...settings} key={category}>
        {currentContent.map((item, index) => (
          <div key={index}>
            <Title>{item.title}</Title>
            {item.mediaType === 'video' ? (
              <video src={`/tutorial/${category}/${category}_${index}.mp4`} />
            ) : (
              <img src={`/tutorial/${category}/${category}_${index}.png`} alt="" />
            )}
            <p>{item.content}</p>
          </div>
        ))}
      </Slider>
        {/* <Slider>
         
          <div key={14}>
            <Title>通訊裝置選擇</Title>
            <p>可以點擊圖標右側的按鈕選擇視音訊的輸入源</p>
          </div>

          <div key={15}>
            <Title>發布廣播</Title>
            <p>
              選擇廣播標題、時長、和內容後，點擊發佈廣播即可在畫面上方看到廣播內容。註:廣播內容接受Markdown語法
            </p>
          </div>
          <div key={16}>
            <Title>刪除廣播</Title>
            <p>若您是發佈廣播者，對廣播內容點擊左鍵，即可刪除此通知</p>
          </div>
          <div key={17}>
            <Title>獲取GitHub webhook link</Title>
            <p>
              點擊此按鈕即可獲得webhook link連結，可在欲追蹤的repostory進行設置
            </p>
          </div>
          <div key={18}>
            <Title>設置 repository webhook</Title>
            <p>
              到GitHub repository的settings，選擇左邊的webhooks後，點選Add
              webhook按鈕， 在裡面的Payload URL 貼上連結，並將Content
              type設置為application/json，接著 在下方點選Let me select
              individual events，並只將Pull requests 打勾，點擊Add
              webhook後即設置成功。
            </p>
          </div>

          <div key={20}>
            <Title>更改權限</Title>
            <p>
              只有房間創始者可以將成員權限提升到admin，以及降階admin的成員，admin成員可以將teacher降階為student，teacher最多只能將student提升為teacher。
            </p>
          </div>
        </Slider> */}
      </Wrapper>
    </Mask>
  );
}
