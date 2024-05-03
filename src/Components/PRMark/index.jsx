import styled from 'styled-components';
import { useEffect } from 'react';
import { usePullRequests } from '../../utils/zustand';
const Wrapper = styled.div`
  position: absolute;
  z-index: 15;
  top: -25px;
  width: 60px;
  height: 40px;
  > img {
    width: 100%;
    height: 100%;
  }
  cursor: pointer;
  color: white;
`;
export default function PRMark({ githubId, pullRequests }) {
  const { toggleShowPullRequests } = usePullRequests();
  const openPullRequests = pullRequests[githubId]?.prs 

  //show PRMArks if pr is opened
  return (
    <>
      {openPullRequests?.length > 0 && (
        <Wrapper
          onClick={() => {
            toggleShowPullRequests(githubId);
          }}
        >
          <img src="/PR_mark.webp" alt="exclamation mark" />
        </Wrapper>
      )}
    </>
  );
}
