import { useState } from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #909ce2;
  border-radius: 10px;
  background-color: #242b53;
`;
const DetailPRWrapper = styled.div`
  position: absolute;
  right: 200px;
  width: 300px;
  height: 300px;
  background-color: #242b53;
  opacity: 0.9;
  border-radius: 10px;
  padding: 10px;
`;
const DetailPR = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
`;
const DetailPRTop = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  padding-left:30px;
  img {
    position: absolute;
    left: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;
const DetailPRBottom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid white;
  >div{
    width: 100%;
  }
  .branch{
    display: flex;
    flex-direction: column;
    
  }
`;
export default function SimplePRContent({ pullRequests, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Wrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <DetailPRWrapper>
          <DetailPR>
            <DetailPRTop>
              <img src={pullRequests.avatar_url} alt="" />
              {pullRequests.title}
            </DetailPRTop>
            <DetailPRBottom>
                <div>
                    <span>repo: {pullRequests.repo}</span>
                </div>
              <div className='branch'>
                <span>headBranch: {pullRequests.headBranch}</span>
                <span>baseBranch: {pullRequests.baseBranch}</span>
              </div>
            </DetailPRBottom>
          </DetailPR>
        </DetailPRWrapper>
      )}
    </Wrapper>
  );
}
