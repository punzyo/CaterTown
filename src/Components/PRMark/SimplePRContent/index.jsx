import { useState } from 'react';
import styled from 'styled-components';
import Markdown from 'react-markdown';
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  background-color: #242b53;
  letter-spacing: 0.5px;
`;
const DetailPRWrapper = styled.div`
  position: absolute;
  right: 200px;
  width: 300px;
  z-index: 500;
  background-color: #242b53;
  opacity: 0.9;
  border-radius: 10px;
  padding: 10px;
`;
const DetailPR = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

`;
const DetailPRTop = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 30px;
  > img {
    position: absolute;
    left: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;
const DetailPRBottom = styled.div`
  padding: 5px;
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  > div {
    width: 100%;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
.description{
  width: 100%;
  flex-grow: 1;
  background-color: white;
  border-radius: 5px ;
  color: black;
  letter-spacing: 0;
  font-size: 12px;
  font-weight: bold;
padding:5px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;  
    height: 8px; 
}

/* 设置滚动条轨道的样式 */
&::-webkit-scrollbar-track {
    background: inherit; 
}

/* 设置滚动条滑块的样式 */
&::-webkit-scrollbar-thumb {
    background: #888; 
}

/* 当鼠标悬停在滚动条上时，改变滑块的颜色 */
&::-webkit-scrollbar-thumb:hover {
    background: #222; /* 滑块悬停时的颜色 */
}
}
`;
export default function SimplePRContent({ pullRequests, children, index }) {
  const [isHovered, setIsHovered] = useState(true);

  return (
    <Wrapper
    // onMouseEnter={() => setIsHovered(true)}
    // onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && index === 3 && (
        <DetailPRWrapper>
          <DetailPR>
            <DetailPRTop>
              <img src={pullRequests.avatar_url} alt="" />
              {pullRequests.title}
            </DetailPRTop>
            <DetailPRBottom>
              <div className="info">
                <span>Repo: {pullRequests.repo}</span>
                <span>GitHub: {pullRequests.user}</span>
                <span>Head branch: {pullRequests.headBranch}</span>
                <span>Base branch: {pullRequests.baseBranch}</span>
                <span>Description:</span>
              </div>
              <div className='description'>
                <Markdown>{pullRequests.description}</Markdown>
              </div>
            </DetailPRBottom>
          </DetailPR>
        </DetailPRWrapper>
      )}
    </Wrapper>
  );
}
