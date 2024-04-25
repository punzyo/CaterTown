import styled from 'styled-components';
import { useState } from 'react';
import SimplePRContent from './SimplePRContent';
const Wrapper = styled.div`
  position: absolute;
  z-index: 15;
  top: -25px;
  width: 60px;
  height: 40px;
  >img {
    width: 100%;
    height: 100%;
  }
  cursor: pointer;
  color: white;
`;
const PRWRapper = styled.div`
  position: absolute;
  bottom: -0px;
  left: 50px;
  width: 200px;

  display: flex;
  flex-direction: column;
  border-radius: 10%;
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

const GitHubLogo = styled.div`
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
export default function PRMark({ githubId, pullRequests }) {
  const [showPR, setShowPR] = useState(false);
  const [showMorePRs, setShowMorePRs] = useState(false);
  const openPullRequests = pullRequests[githubId]?.prs.filter(
    (pr) => pr.state === 'open'
  );
  console.log(githubId, openPullRequests);
  return (
    <Wrapper onClick={()=>{setShowPR(!showPR)}}>
      {openPullRequests?.length > 0 && (
        <>
          <img src="/PR_mark.webp" alt="exclamation mark" />
          {showPR && <PRWRapper>
            <SmallPRWrapper>
              {console.log(openPullRequests.length)}
              <div className="title">
                <GitHubLogo>
                  <svg viewBox="0 0 16 16">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                  </svg>
                </GitHubLogo>
                <h3>別再P圖快看PR</h3>
              </div>
              <SimplePRWrapper>
                {openPullRequests.map((pr, index) => {
                  if (showMorePRs == false && index >= 3) return;
                  return (
                    <SimplePRContent key={pr.id} pullRequests={pr} index={index}>{pr.title}</SimplePRContent>
                  );
                })}
                
                  <ShowMoreBtn
                    onClick={(e) => {
                      e.stopPropagation()
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
              </SimplePRWrapper>
            </SmallPRWrapper>
          </PRWRapper>}
        </>
      )}
    </Wrapper>
  );
}
