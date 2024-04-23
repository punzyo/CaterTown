import styled from "styled-components";
const Wrapper = styled.div`
position: absolute;
top: -25px;
    width: 60px;
    height: 40px;
    img{
        width: 100%;
        height: 100%;
    }
`
export default function PRMark({ githubId, pullRequests }) {
  return (
    <Wrapper>
      {pullRequests[githubId] && (
        <img src="/PR_mark.webp" alt="exclamation mark" />
      )}
    </Wrapper>
  );
}
