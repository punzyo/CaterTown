import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SimplePRContent from './SimplePRContent';
import { usePullRequests } from '../../../../utils/zustand';
import GitHubLogo from '../../../GitHubLogo';
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
  background-color: #202540;
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
                <GitHubLogo />
              </GitHubLogoWrapper>
              <h3>導師該看PR囉</h3>
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
                  <>
                    {!showMorePRs ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 15.75 7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    )}
                  </>
                </ShowMoreBtn>
              )}
            </SimplePRWrapper>
          </SmallPRWrapper>
        </PRWRapper>
      )}
    </>
  );
}
