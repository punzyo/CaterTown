import styled from 'styled-components';
import { usePullRequests } from '@/utils/zustand';
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
interface PullRequest {
  title: string;
  baseBranch: string;
  id: number;
  avatar_url: string;
  repo: string;
  description: string;
  user: string;
  createdAt: string;
  state: string;
  url: string;
  action: string;
  headBranch: string;
}

interface PullRequestsByGitHubId {
  [key: string]: {
    prs: PullRequest[];
  };
}

interface PRMarkProps {
  githubId: string;
  pullRequests: PullRequestsByGitHubId;
}

export default function PRMark({ githubId, pullRequests }: PRMarkProps) {
  const { toggleShowPullRequests } = usePullRequests();
  const openPullRequests = pullRequests[githubId]?.prs;
  const handlePRMarkClick = () => {
    toggleShowPullRequests(githubId);
  };
  return (
    <>
      {openPullRequests?.length > 0 && (
        <Wrapper onClick={handlePRMarkClick}>
          <img src="/PR_mark.webp" alt="exclamation mark" />
        </Wrapper>
      )}
    </>
  );
}
