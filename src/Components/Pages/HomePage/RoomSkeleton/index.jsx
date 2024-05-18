import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';
const Wrapper = styled.div`
  opacity: 0.7;
`;
export default function RoomSkeleton() {
  return Array.from({ length: 6 }, (_, index) => (
    <Wrapper key={index}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 5px',
        }}
      >
        <Skeleton
          baseColor="#ddd"
          highlightColor="#f0f0f0"
          width={0}
          height={20}
        />
      </div>
      <Skeleton
        baseColor="#ddd"
        highlightColor="#f0f0f0"
        height={284}
        borderRadius={10}
        duration={1}
      />
    </Wrapper>
  ));
}
