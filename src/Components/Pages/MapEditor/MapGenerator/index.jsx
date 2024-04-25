import styled from 'styled-components';
import { map1Index } from '../../../Maps/map1';
import { useState } from 'react';
import { useFormInput } from '../../../../utils/hooks/useFormInput';

// 這裡放置你的地圖資料和其他所需的 import

const wrapperWidth = 2080; // 更新寬度
const wrapperHeight = 1560; // 更新高度
const gridSize = 48; // 每格大小

const MapWrapper = styled.div.attrs({
  style: {
    width: `${wrapperWidth}px`,
    height: `${wrapperHeight}px`,
  },
})`
  position: relative;
  top: 50px;
  user-select: none;
`;

const MapTile = styled.div.attrs((props) => ({
  style: {
    left: `${props.$left}px`,
    top: `${props.$top}px`,
    backgroundColor: props.selected ? 'blue' : 'gray', // 根據是否選中來改變背景顏色
  },
}))`
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: ${gridSize}px;
  height: ${gridSize}px;
  cursor: pointer; // 添加點選游標
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
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [objects, setObjects] = useState({});
  const itemTypeInput = useFormInput(''); // 使用hook来处理输入

  const handleTileClick = (x, y) => {
    // 只检查位置，不涉及类型
    const index = selectedPositions.findIndex(
      (pos) => pos.x === x && pos.y === y
    );
    if (index !== -1) {
      // 如果已选中该位置，取消选择
      setSelectedPositions((prev) => prev.filter((_, i) => i !== index));
    } else {
      // 添加新位置，不关联具体类型
      setSelectedPositions((prev) => [...prev, { x, y }]);
    }
  };
  const handleSubmit = () => {
    setSelectedPositions([])
    const currentType = itemTypeInput.value; // 获取当前输入的物品类型
    if (!currentType) {
      alert('Please enter an item type before saving.');
      return; // 确保在保存前输入了物品类型
    }
  
    // 创建新的素材对象，确保每个素材类型的位置信息独立
    const newObjects = { ...objects };
  
    // 获取当前素材类型的位置信息
    const currentTypePositions = selectedPositions.map(({ x, y }) => ({
      left: x,
      top: y,
    }));
  
    // 更新或添加当前素材类型的位置信息
    newObjects[currentType] = currentTypePositions;
  
    setObjects(newObjects); // 更新objects状态
    console.log(newObjects); // 打印或处理新的地图数据
  };
  
  

  const renderMapTiles = () => {
    const tiles = [];
    for (let y = 0; y < wrapperHeight / gridSize; y++) {
      for (let x = 0; x < wrapperWidth / gridSize; x++) {
        // 检查此位置是否被选中
        const isSelected = selectedPositions.some(
          (pos) => pos.x === x && pos.y === y
        );
        tiles.push(
          <MapTile
            key={`${x}-${y}`}
            $left={x * gridSize}
            $top={y * gridSize}
            selected={isSelected} // 这里使用isSelected，确保背景颜色根据选中状态变化
            onClick={() => handleTileClick(x, y)}
          />
        );
      }
    }
    return tiles;
  };
  const renderMapObjects = () => {
    return Object.keys(objects).flatMap(itemType => {
      // 获取当前物件类型的位置信息数组
      const positions = objects[itemType];
      // 对每个位置信息生成相应的 MapImage 组件
      return positions.map((position, index) => (
        <MapImage
          key={`${itemType}-${index}`}
          $width={`${getItemStyles(itemType).width}px`}
            $height={`${getItemStyles(itemType).height}px`}
          $left={`${position.left * gridSize}px`} // 根据位置的左边距计算实际像素左边距
          $top={`${position.top * gridSize}px`} // 根据位置的上边距计算实际像素上边距
          $backgroundPosition={getItemStyles(itemType).backgroundPosition} // 获取物件的背景位置
        />
      ));
    });
  };
  

  const getItemStyles = (itemName) => {
    console.log(itemName, '321');
    const item = map1Index[itemName];
    if (!item) return {};

    const width = item.width * 48;
    const height = item.height * 48;
    const backgroundPositionX = item.x * 48;
    const backgroundPositionY = item.y * 48;

    return {
      width,
      height,
      backgroundPosition: `${backgroundPositionX}px ${backgroundPositionY}px`,
    };
  };

  return (
    <>
      <input
        value={itemTypeInput.value}
        onChange={itemTypeInput.onChange}
        placeholder="Enter item type"
      />
      <button onClick={handleSubmit}>Save Map</button>
      <MapWrapper>
      {renderMapTiles()}
        {renderMapObjects()}
      </MapWrapper>
    </>
  );
}
