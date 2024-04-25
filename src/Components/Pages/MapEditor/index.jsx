import styled from 'styled-components';
import { map1, map1Index, map1Collision } from '../../Maps/map1.js';
import { useFormInput } from '../../../utils/hooks/useFormInput.js';
import { useState } from 'react';
const wrapperWidth = '3080';
const wrapperHeight = '2600';
const mapBorder = '100';
const mapWidth = (wrapperWidth - 2 * mapBorder) / map1.unit;
const mapHeight = (wrapperHeight - 2 * mapBorder) / map1.unit;
const playerWidth = '60';
const playerHeight = '60';
const startingPoint = { top: 230, left: 330, direction: 'down', frame: 0 };

const MapWrapper = styled.div`
  position: relative;
  width: ${wrapperWidth}px;
  height: ${wrapperHeight}px;
  user-select: none;

  /* margin:0 auto; */
`;
const MapImage = styled.div`
  position: absolute;
  left: 0;
  top: 40px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  background-position: ${(props) => props.$backgroundPosition};
  background-image: url(/images/map/map1_48x48.png);
  background-color: gray;
`;
export default function MapEditor() {
  const inputX = useFormInput('0');
  const inputY = useFormInput('0');
  const inputW = useFormInput('0');
  const inputH = useFormInput('0');
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
    <MapWrapper>
              <input type="text" value={inputW.value} onChange={inputW.onChange} />
      <input type="text" value={inputH.value} onChange={inputH.onChange} />
      <input type="text" value={inputX.value} onChange={inputX.onChange} />
      <input type="text" value={inputY.value} onChange={inputY.onChange} />
      <MapImage
        $width={`${inputW.value * 48}px`}
        $height={`${inputH.value * 48}px`}
        $backgroundPosition={`${inputX.value * 48}px ${inputY.value * 48}px`}
      />
      {/* {Object.keys(map1.objects).map((itemType) =>
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
    )} */}
    </MapWrapper>
  );
}
