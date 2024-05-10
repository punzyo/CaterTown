import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Mask = styled.div`
  position: fixed;
  top: -150px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: auto;
`;
const Wrapper = styled.div`
  cursor: auto;
  width: 500px;
  height: 500px;
  background-color: #faf4e1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .slick-slider {
    width: 80%;
    height: 300px;
    background-color: white;
    color: black;
  }
  img, video {
    width: 100%;
    border-radius: 20px;
  }
`;
export default function Tutorial() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Mask
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Wrapper>
        <Slider {...settings}>
          <div key={0}>
            <h3>角色移動</h3>
            <video src="/images/tutorial/01.mp4" autoPlay loop></video>
            
            <p>
              可以透過WASD，或是方向鍵的上、下、左、右對角色進行移動，碰到障礙物或是地圖邊界時則會停下。
            </p>
          </div>
          <div key={1}>
            <h3>獲取邀請連結</h3>
            <p>點擊上方的圖示可以獲得此房間的邀請連結</p>
          </div>
          <div key={2}>
            <h3>控制側邊欄</h3>
            <p>點擊下方欄的圖示以隱藏/顯示側邊欄</p>
          </div>
          <div key={4}>
            <h3>離開房間</h3>
            <p>點擊右下角圖示即可離開房間</p>
          </div>
          <div key={5}>
            <h3>加入多人通訊</h3>
            <p>按下多人通訊的按鈕，連線成功後即可以進行多人視/音訊連線</p>
          </div>
          <div key={6}>
            <h3>打開個人面板</h3>
            <p>
              點擊個人圖示，即可打開個人面板，在這裡可以輸入您的GitHub
              ID，這將影響到您的PR功能，
              如果權限為teacher或是admin，可以使用權限相關的系統，
              點擊回到起點會回到最初在島上的位置
            </p>
          </div>
          <div key={7}>
            <h3>傳遞文字訊息</h3>
            <p>
              可以透過全體頻道向所有人發送訊息，或是點擊他人頭像進行一對一的聊天
            </p>
          </div>
          <div key={19}>
            <h3>Pull request系統</h3>
            <p>
              當設置好 repository webhook後，若您的角色open/reopen一則pull
              request，頭上將會冒出驚嘆號通知，自己或是權限為teacher以上的角色都會看到，
              點擊後會看到PR標題，可藉由點選PR標題前往該PR頁面。
            </p>
          </div>



          <div key={8}>
            <h3>視/音訊距離</h3>
            <p>
              當進入多人通訊後，只要角色彼此在兩格內的距離，就能看到對方的通訊畫面
            </p>
          </div>
          <div key={9}>
            <h3>房間系統</h3>
            <p>
              島上共有四個獨立的空間，房間內的角色只能接收同個空間的視/音訊，無視距離
            </p>
          </div>
          <div key={10}>
            <h3>螢幕分享</h3>
            <p>點擊下方螢幕圖示可以對畫面進行分享</p>
          </div>
          <div key={11}>
            <h3>通訊裝置選擇</h3>
            <p>可以點擊圖標右側的按鈕選擇視音訊的輸入源</p>
          </div>
          <div key={12}>
            <h3>全螢幕，音量控制</h3>
            <p>點擊視訊畫面右下角可以進行全螢幕，左下角則是音量控制</p>
          </div>
          <div key={13}>
            <h3>退出多人通訊</h3>
            <p>點擊右方的按鈕將會離開多人通訊，將不會發送/接收通訊內容</p>
          </div>
          <div key={14}>
            <h3>通訊裝置選擇</h3>
            <p>可以點擊圖標右側的按鈕選擇視音訊的輸入源</p>
          </div>





          <div key={15}>
            <h3>發布廣播</h3>
            <p>
              選擇廣播標題、時長、和內容後，點擊發佈廣播即可在畫面上方看到廣播內容。註:廣播內容接受Markdown語法
            </p>
          </div>
          <div key={16}>
            <h3>刪除廣播</h3>
            <p>若您是發佈廣播者，對廣播內容點擊左鍵，即可刪除此通知</p>
          </div>
          <div key={17}>
            <h3>獲取GitHub webhook link</h3>
            <p>
              點擊此按鈕即可獲得webhook link連結，可在欲追蹤的repostory進行設置
            </p>
          </div>
          <div key={18}>
            <h3>設置 repository webhook</h3>
            <p>
              到GitHub repository的settings，選擇左邊的webhooks後，點選Add
              webhook按鈕， 在裡面的Payload URL 貼上連結，並將Content
              type設置為application/json，接著 在下方點選Let me select
              individual events，並只將Pull requests 打勾，點擊Add
              webhook後即設置成功。
            </p>
          </div>
        
          <div key={20}>
            <h3>更改權限</h3>
            <p>
              只有房間創始者可以將成員權限提升到admin，以及降階admin的成員，admin成員可以將teacher降階為student，teacher最多只能將student提升為teacher。
            </p>
          </div>
        </Slider>
      </Wrapper>
    </Mask>
  );
}
