import styled from 'styled-components';
import { usePullRequests } from '@/utils/zustand';
import type { PullRequests } from '@/types';
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

interface PRMarkProps {
  gitHubId: string;
  pullRequests: PullRequests;
}

export default function PRMark({ gitHubId, pullRequests }: PRMarkProps) {
  const { toggleShowPullRequests } = usePullRequests();
  const openPullRequests = pullRequests[gitHubId]?.prs;
  const handlePRMarkClick = () => {
    toggleShowPullRequests(gitHubId);
  };
  return (
    <>
      {openPullRequests?.length > 0 && (
        <Wrapper onClick={handlePRMarkClick}>
          <img src="/images/PR_mark.webp" alt="exclamation mark" />
        </Wrapper>
      )}
    </>
  );
}
