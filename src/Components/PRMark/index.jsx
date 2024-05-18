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
export default function PRMark({ githubId, pullRequests }) {
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
