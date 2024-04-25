import styled from 'styled-components';
import { useState } from 'react';
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
  const { setPullRequests, toggleShowPullRequests } =
    usePullRequests();
  const openPullRequests = pullRequests[githubId]?.prs.filter(
    (pr) => pr.state === 'open'
  );
  return (
    <Wrapper
      onClick={() => {
        toggleShowPullRequests(githubId);
        setPullRequests(openPullRequests)
      }}
    >
      {openPullRequests?.length > 0 && (
        <>
          <img src="/PR_mark.webp" alt="exclamation mark" />
        </>
      )}
    </Wrapper>
  );
}
