import Map1 from "../Maps/map1.jsx"
import styled from "styled-components"
const Wrapper  = styled.main`
width: 100%;
height: 100%;
display:flex;
align-items: center;
justify-content: center;
background-color:gray;
`
const BottomBar = styled.div`
width: 100%;
height: 100px;
display: flex;
position:absolute;
bottom: 0;
background-color:#202540;
border-top: 1px solid white;
`
const SideBar = styled.div`
width:200px;
height: 100%;
position: absolute;
right: 0;
top: 0;
`
export default function GamePage() {
  return (
   <Wrapper>
   <Map1/>
   <BottomBar/>
   <SideBar/>
   </Wrapper>
  )
}
