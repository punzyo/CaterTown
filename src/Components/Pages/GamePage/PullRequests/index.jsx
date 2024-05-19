import styled from 'styled-components';
import { useState } from 'react';
import SimplePRContent from './SimplePRContent';
import { usePullRequests } from '@/utils/zustand';
import GitHubIcon from '@/Components/Icons/GitHubIcon';
import ArrowDownIcon from '@/Components/Icons/ArrowDownIcon';
import ArrowUpIcon from '@/Components/Icons/ArrowUpIcon';
const PRWRapper = styled.div`
  position: absolute;
  top: 0px;
  right: 300px;
  width: 200px;

  display: flex;
  flex-direction: column;
  border-radius: px;
  background-size: cover;
  align-items: center;
  padding: 10px;
  opacity: 0.9;
  background-color: ${({ theme }) => theme.colors.backgroundBlue1};
`;
const SmallPRWrapper = styled.div`
  width: 100%;
  height: 100%;

  .title {
    position: relative;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 5px;
  }
`;
const SimplePRWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const GitHubLogoWrapper = styled.div`
  left: -10px;
  width: 32px;
  height: 32px;
`;
const ShowMoreBtn = styled.button`
  width: 100%;
  height: 15px;
  background-color: inherit;
  svg {
    width: 20px;
    height: 20px;
  }
`;

export default function PullRequests() {
  const { showPullRequests, pullRequests } = usePullRequests();
  const [showMorePRs, setShowMorePRs] = useState(false);
  return (
    <>
      {showPullRequests && pullRequests && (
        <PRWRapper>
          <SmallPRWrapper>
            <div className="title">
              <GitHubLogoWrapper>
                <GitHubIcon />
              </GitHubLogoWrapper>
              <h3>待審中的PR</h3>
            </div>
            <SimplePRWrapper>
              {pullRequests.map((pr, index) => {
                if (showMorePRs == false && index >= 3) return;
                return (
                  <SimplePRContent key={pr.id} pullRequests={pr} index={index}>
                    <a href={pr.url} target="_blank">
                      {pr.title}
                    </a>
                  </SimplePRContent>
                );
              })}

              {pullRequests.length > 3 && (
                <ShowMoreBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMorePRs(!showMorePRs);
                  }}
                >
                  <>{!showMorePRs ? <ArrowDownIcon /> : <ArrowUpIcon />}</>
                </ShowMoreBtn>
              )}
            </SimplePRWrapper>
          </SmallPRWrapper>
        </PRWRapper>
      )}
    </>
  );
}
