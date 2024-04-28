import styled from 'styled-components';
import { mapIndex } from '../../GamePage/Maps/map1';

const Wrapper = styled.div`
  width: 100vh;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const MapImage = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  background-position: ${(props) => props.$backgroundPosition};
  background-image: url(/images/map/map1_48x48.png);
  background-color: gray;
`;
function MapImages() {
  return (
    <Wrapper>
      {Object.entries(mapIndex).map(
        ([key, { width, height, x, y, collision }]) => (
          <div key={key}>
            <MapImage
              $width={`${width * 48}px`}
              $height={`${height * 48}px`}
              $backgroundPosition={`${x * 48}px ${y * 48}px`}
            />
            <div>{key}</div>
            <div>{collision ? 'T' : 'F'}</div>
          </div>
        )
      )}
    </Wrapper>
  );
}

export default MapImages;
