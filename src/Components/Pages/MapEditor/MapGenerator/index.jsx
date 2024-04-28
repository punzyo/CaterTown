import styled from 'styled-components';
import { map2 } from '../../GamePage/Maps/map2';
import { useState } from 'react';
import { useFormInput } from '../../../../utils/hooks/useFormInput';
import { mapIndex } from '../../GamePage/Maps/map1';

// 這裡放置你的地圖資料和其他所需的 import

const wrapperWidth = 1920; // 更新寬度
const wrapperHeight = 1440; // 更新高度
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
  z-index:10;
  
`;

const MapTile = styled.div.attrs((props) => ({
  style: {
    left: `${props.$left}px`,
    top: `${props.$top}px`,

 
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
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  background-position: ${(props) => props.$backgroundPosition};
  background-image: url(/images/map/map1_48x48.png);
  background-color: inherit;
`;

export default function MapEditor() {
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [objects, setObjects] = useState(map2.objects);
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
  
    // 检查当前素材类型的位置信息是否已经存在
    if (newObjects[currentType]) {
      // 如果已经存在，则将新的位置信息追加到现有位置信息的后面
      newObjects[currentType] = [
        ...newObjects[currentType],
        ...selectedPositions.map(({ x, y }) => ({ left: x, top: y })),
      ];
    } else {
      // 如果不存在，则创建一个新的位置信息数组
      newObjects[currentType] = selectedPositions.map(({ x, y }) => ({
        left: x,
        top: y,
      }));
    }
  
    setObjects(newObjects); // 更新objects状态
  };
  const handleDeleteClick = (x, y) => {
    // 过滤掉与被点击位置相同的素材位置
    setSelectedPositions([])
    const newObjects = {};
    for (const itemType in objects) {
      const updatedPositions = objects[itemType].filter(
        (pos) => pos.left !== x || pos.top !== y
      );
      if (updatedPositions.length > 0) {
        newObjects[itemType] = updatedPositions;
      }
    }
    setObjects(newObjects);
  
    console.log('Delete button clicked at position:', x, y); // 添加调试语句
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
          <div style={{ position: 'relative' }} key={`${x}-${y}`}>
            <MapTile
              $left={x * gridSize}
              $top={y * gridSize}
              selected={isSelected} // 这里使用isSelected，确保背景颜色根据选中状态变化
              onClick={() => handleTileClick(x, y)}
            />
            {isSelected && (
              <button
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1000, // 确保按钮在最上层
                }}
                onClick={() => handleDeleteClick(x, y)} // 绑定删除按钮的点击事件
              >
                Delete
              </button>
            )}
          </div>
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
    const item = mapIndex[itemName];
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
  function processMap() {
    const collisions = {};
    
    for (const key in objects) {
        const object = objects[key];
        const { width, height, collision } = mapIndex[key];
        
        if (collision) {
            for (let i = 0; i < object.length; i++) {
                const { left, top } = object[i];
                for (let x = left; x < left + width; x++) {
                    for (let y = top; y < top + height; y++) {
                        collisions[`${x},${y}`] = true;
                    }
                }
            }
        }
    }
    
    console.log(collisions); 
}






  return (
    <>
    <button onClick={processMap}>產出碰撞座標</button>
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
