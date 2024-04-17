import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { catImages } from '../../assets/charNames';
import { useUserState } from '../../utils/zustand';
import { useFormInput } from '../../utils/hooks/useFormInput';
import { addRoomToUser, joinRoom } from '../../firebase/firestore';
import Button from '../Button';
import styled from 'styled-components';
import SimpleSlider from '../Silder';
import { startingPoint } from '../Maps/map1.js';
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
    .userImg{
      width:40px;
      height: 40px;
      img{
        width:100%;
        height: 100%;
        border-radius: 50%;
      }
    }
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
  const GameSettings = styled.div`
  width:100%;
  margin-top:30px;
  display: flex;
  gap:20px;

  `
const SilderWrapper = styled.div`
background-color:white;
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
    .slick-list{
      width:100%;
    }
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
}`
;
const JoinButton = styled.div`
width:200px;
height:50px;
border-radius:10px;
font-weight:bold;
margin-top:30px;
`
export default function InvitePage() {
  const navigate = useNavigate();
  const charNameInput = useFormInput('')
  const{getUserData} = useUserState();
  const user = getUserData()
  const { roomId, roomName } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleSlideChange = (index) => {
    setSelectedImageIndex(index);
  };
  const JoinRoom = async() =>{
    const userId = user.id
    const charName = charNameInput.value
    const character = catImages[selectedImageIndex]
    await joinRoom({roomId,user:{
        userId,
        charName,
        character,
        position:startingPoint,
      },
    })
    const joinedRoom = await addRoomToUser({
      userId,
      roomName,
      roomId,
      character,
      charName,
    })
    if(joinedRoom){
      charNameInput.clear()
      navigate(`/chouchouzoo/${roomId}/${roomName}`)
    }
  }
  return (
    <Wrapper>
      <Header>
        <div className="left">
          <img src="/images/logo.png" alt="logo" />
          <span>ChouChouZoo</span>
        </div>
        <div className="right">
          <div className="userImg">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div>
            {user.name}
          </div>
        </div>
      </Header>
      <MainWrapper>
      <Title>You have been invited to the room {roomName}!</Title>
      
      <span>請選擇角色!</span>
      <GameSettings>
      <SilderWrapper>
        
        <SimpleSlider onSlideChange={handleSlideChange} data={catImages} />
      </SilderWrapper>
      <div >
        <div>
        <label htmlFor="name">角色名稱</label>
          <input
            type="text"
            name="name"
            id="name"
            value={charNameInput.value}
            onChange={charNameInput.onChange}
          />
        </div>
      </div>
      </GameSettings>
      <JoinButton>
        <Button clickFunc={JoinRoom} content ={'加入房間'}/>
      </JoinButton>

      </MainWrapper>
    </Wrapper>
  );
}
