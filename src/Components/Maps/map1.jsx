import { map1, map1Index } from './map1';
import styled from 'styled-components';
import { mapBorder } from './map1';

const Map = styled.div`
  position: relative;
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  width: 100%;
  height: 100%;
  border: ${mapBorder}px solid gray;
  transition: top 0.2s, left 0.2s;
`;
const MapImage = styled.div`
  position: absolute;
  border: 1px solid black;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  background-position: ${(props) => props.$backgroundPosition};
  background-image: url(/images/map/map1_48x48.png);
`;
export default function Map1({ position, children }) {
  const getItemStyles = (itemName) => {
    const item = map1Index[itemName];
    if (!item) return {};

    const width = item.width * map1.unit;
    const height = item.height * map1.unit;
    const backgroundPositionX = item.x * map1.unit;
    const backgroundPositionY = item.y * map1.unit;

    return {
      width,
      height,
      backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
    };
  };
  return (
    <Map $top={`${position.top}px`} $left={`${position.left}px`}>
      {Object.keys(map1.objects).map((itemType) =>
        map1.objects[itemType].map((position, index) => {
          const itemStyles = getItemStyles(itemType);
          return (
            <MapImage
              key={`${itemType}-${index}`}
              $width={`${itemStyles.width}px`}
              $height={`${itemStyles.height}px`}
              $left={`${position.left * map1.unit}px`}
              $top={`${position.top * map1.unit}px`}
              $backgroundPosition={itemStyles.backgroundPosition}
            />
          );
        })
      )}
      {children}
    </Map>
  );
}
