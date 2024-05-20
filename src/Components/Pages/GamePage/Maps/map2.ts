export const playerWidth = 60;
export const playerHeight = 60;
interface MapIndex {
  width: number;
  height: number;
  x: number;
  y: number;
  collision: boolean;
}
export const mapIndex: Record<string, MapIndex>  = {
  U: {
    width: 4,
    height: 1,
    x: 4,
    y: 0,
    collision: false,
  },
  waterPool: {
    width: 3,
    height: 3,
    x: 8,
    y: 0,
    collision: true,
  },
  floor1: {
    width: 1,
    height: 1,
    x: 9,
    y: -2,
    collision: false,
  },
  floor2: {
    width: 1,
    height: 1,
    x: 10,
    y: -1,
    collision: false,
  },
  floor3: {
    width: 1,
    height: 1,
    x: 10,
    y: -2,
    collision: false,
  },
  floor4: {
    width: 1,
    height: 1,
    x: 10,
    y: -3,
    collision: false,
  },
  floor5: {
    width: 1,
    height: 1,
    x: 11,
    y: -3,
    collision: false,
  },
  floor6: {
    width: 2,
    height: 1,
    x: 12,
    y: -1,
    collision: false,
  },
  floor7: {
    width: 1,
    height: 1,
    x: 11,
    y: -2,
    collision: false,
  },
  floor8: {
    width: 2,
    height: 1,
    x: 12,
    y: -3,
    collision: false,
  },
  floor9: {
    width: 1,
    height: 1,
    x: 13,
    y: -3,
    collision: false,
  },
  floor10: {
    width: 1,
    height: 1,
    x: 13,
    y: -1,
    collision: false,
  },
  floor11: {
    width: 1,
    height: 1,
    x: 13,
    y: -2,
    collision: false,
  },
  floor12: {
    width: 1,
    height: 1,
    x: 16,
    y: -2,
    collision: false,
  },
  floor13: {
    width: 3,
    height: 3,
    x: 3,
    y: -3,
    collision: false,
  },
  floor14: {
    width: 1,
    height: 1,
    x: 5,
    y: 0,
    collision: true,
  },
  floor15: {
    width: 1,
    height: 1,
    x: 5,
    y: -1,
    collision: true,
  },
  floor16: {
    //long green
    width: 1,
    height: 3,
    x: 15,
    y: -1,
    collision: false,
  },
  floor17: {
    //long green
    width: 3,
    height: 1,
    x: 16,
    y: 0,
    collision: false,
  },
  floor18: {
    width: 2,
    height: 2,
    x: 16,
    y: -2,
    collision: false,
  },
  floor19: {
    width: 1,
    height: 1,
    x: 14,
    y: -2,
    collision: false,
  },
  floor20: {
    width: 3,
    height: 1,
    x: 3,
    y: -6,
    collision: false,
  },
  floor21: {
    width: 1,
    height: 3,
    x: 3,
    y: -3,
    collision: false,
  },
  floor22: {
    width: 1,
    height: 4,
    x: 2,
    y: -2,
    collision: false,
  },
  floor23: {
    width: 1,
    height: 4,
    x: 1,
    y: -2,
    collision: false,
  },
  floor24: {
    width: 1,
    height: 1,
    x: 3,
    y: -6,
    collision: true,
  },
  floor25: {
    width: 1,
    height: 1,
    x: 2,
    y: -6,
    collision: true,
  },
  floor26: {
    width: 1,
    height: 1,
    x: 1,
    y: -6,
    collision: true,
  },
  floor27: {
    width: 1,
    height: 1,
    x: 14,
    y: -1,
    collision: false,
  },
  floor28: {
    width: 1,
    height: 1,
    x: 16,
    y: -1,
    collision: false,
  },
  floor29: {
    width: 1,
    height: 1,
    x: 11,
    y: -1,
    collision: false,
  },
  water: {
    width: 1,
    height: 1,
    x: 10,
    y: -5,
    collision: true,
  },
  water2: {
    width: 1,
    height: 1,
    x: 15,
    y: -6,
    collision: true,
  },
  water3: {
    width: 1,
    height: 1,
    x: 16,
    y: -5,
    collision: true,
  },
  water4: {
    width: 1,
    height: 2,
    x: 11,
    y: -4,
    collision: true,
  },
  water5: {
    width: 1,
    height: 1,
    x: 18,
    y: -2,
    collision: true,
  },
  water6: {
    width: 1,
    height: 1,
    x: 17,
    y: -2,
    collision: true,
  },
  water7: {
    width: 1,
    height: 1,
    x: 17,
    y: -1,
    collision: true,
  },
  water8: {
    width: 1,
    height: 1,
    x: 18,
    y: -1,
    collision: true,
  },
  water9: {
    width: 1,
    height: 1,
    x: 16,
    y: -6,
    collision: true,
  },
  water10: {
    width: 1,
    height: 1,
    x: 11,
    y: -6,
    collision: true,
  },
  water11: {
    width: 1,
    height: 1,
    x: 11,
    y: -5,
    collision: true,
  },
  water12: {
    width: 1,
    height: 1,
    x: 14,
    y: -4,
    collision: true,
  },
  water13: {
    width: 1,
    height: 1,
    x: 11,
    y: -4,
    collision: true,
  },
  water14: {
    width: 1,
    height: 1,
    x: 16,
    y: -4,
    collision: true,
  },
  waterIsland: {
    width: 6,
    height: 3,
    x: 16,
    y: -4,
    collision: true,
  },
  rockFloor1: {
    width: 1,
    height: 4,
    x: 0,
    y: -7,
    collision: true,
  },
  rockFloor2: {
    width: 4,
    height: 1,
    x: -1,
    y: -7,
    collision: true,
  },
  rockFloor3: {
    width: 1,
    height: 3,
    x: -5,
    y: -8,
    collision: true,
  },
  rockFloor4: {
    width: 1,
    height: 1,
    x: -4,
    y: -10,
    collision: true,
  },
  rockFloor5: {
    width: 1,
    height: 1,
    x: -1,
    y: -10,
    collision: true,
  },
  rockFloor6: {
    width: 2,
    height: 1,
    x: -2,
    y: -10,
    collision: false,
  },
  rockFloor7: {
    width: 4,
    height: 2,
    x: -1,
    y: -8,
    collision: false,
  },
  rockFloor8: {
    width: 1,
    height: 2,
    x: 0,
    y: -8,
    collision: true,
  },
  rockFloor9: {
    width: 1,
    height: 3,
    x: -5,
    y: -8,
    collision: true,
  },
  rockFloor10: {
    width: 1,
    height: 1,
    x: -5,
    y: -7,
    collision: true,
  },
  rockFloor11: {
    width: 1,
    height: 1,
    x: 0,
    y: -7,
    collision: true,
  },
  rockFloor12: {
    width: 1,
    height: 2,
    x: -5,
    y: -8,
    collision: true,
  },
  rockFloor13: {
    width: 1,
    height: 1,
    x: -5,
    y: -10,
    collision: true,
  },
  rockFloor14: {
    width: 1,
    height: 1,
    x: 0,
    y: -10,
    collision: true,
  },
  waterFloor1: {
    width: 2,
    height: 2,
    x: 9,
    y: -3,
    collision: false,
  },
  waterFloor2: {
    width: 3,
    height: 2,
    x: 7,
    y: -3.5,
    collision: false,
  },
  waterFloor3: {
    width: 2,
    height: 1,
    x: 7,
    y: -6,
    collision: false,
  },
  waterFloor4: {
    width: 2,
    height: 1,
    x: 9,
    y: -6,
    collision: false,
  },
  waterFloor5: {
    width: 1,
    height: 2,
    x: 5.9,
    y: -3.5,
    collision: false,
  },
  waterFloor6: {
    width: 2,
    height: 1,
    x: 9,
    y: -5,
    collision: false,
  },
  tree1: {
    width: 8,
    height: 2,
    x: 10,
    y: -9.8,
    collision: true,
  },
  tree2: {
    width: 2,
    height: 2,
    x: 10,
    y: -12.7,
    collision: true,
  },
  tree3: {
    width: 5,
    height: 3,
    x: 10,
    y: -15,
    collision: true,
  },
  tree4: {
    width: 5,
    height: 3,
    x: 10,
    y: -18,
    collision: true,
  },
  tree5: {
    width: 5,
    height: 3,
    x: 5,
    y: -15,
    collision: true,
  },
  tree6: {
    width: 5,
    height: 3,
    x: 5,
    y: -18,
    collision: true,
  },
  tree7: {
    width: 2,
    height: 2,
    x: 8,
    y: -12.7,
    collision: true,
  },
  tree8: {
    width: 2,
    height: 2,
    x: 6,
    y: -12.7,
    collision: true,
  },
  tree9: {
    width: 2,
    height: 2,
    x: 4,
    y: -12.7,
    collision: true,
  },
  redHouse1: {
    width: 4,
    height: 3,
    x: 13,
    y: -21,
    collision: true,
  },
  redHouse2: {
    width: 4,
    height: 3,
    x: 8.5,
    y: -21,
    collision: true,
  },
  redHouse3: {
    width: 4,
    height: 4,
    x: 18.5,
    y: -25,
    collision: true,
  },
  redHouse4: {
    width: 3,
    height: 3,
    x: 9,
    y: -25,
    collision: true,
  },
  greenHouse1: {
    width: 4,
    height: 3,
    x: 13,
    y: -29,
    collision: true,
  },
  greenHouse2: {
    width: 4,
    height: 3,
    x: 8.5,
    y: -29,
    collision: true,
  },
  greenHouse3: {
    width: 4,
    height: 4,
    x: 18.5,
    y: -33,
    collision: true,
  },
  greenHouse4: {
    width: 3,
    height: 3,
    x: 9,
    y: -33,
    collision: true,
  },
  blueHouse1: {
    width: 4,
    height: 3,
    x: 13,
    y: -37,
    collision: true,
  },
  blueHouse2: {
    width: 4,
    height: 3,
    x: 8.5,
    y: -37,
    collision: true,
  },
  blueHouse3: {
    width: 4,
    height: 4,
    x: 18.5,
    y: -41,
    collision: true,
  },
  blueHouse4: {
    width: 3,
    height: 3,
    x: 9,
    y: -41,
    collision: true,
  },
  garden1: {
    width: 4,
    height: 1,
    x: 17,
    y: -12,
    collision: true,
  },
  garden2: {
    width: 1,
    height: 1,
    x: 17,
    y: -12,
    collision: true,
  },
  garden3: {
    width: 1,
    height: 1,
    x: 16,
    y: -12,
    collision: true,
  },
  garden4: {
    width: 1,
    height: 1,
    x: 15,
    y: -12,
    collision: true,
  },
  garden5: {
    width: 1,
    height: 1,
    x: 14,
    y: -12,
    collision: true,
  },
  garden6: {
    width: 1,
    height: 1,
    x: 13,
    y: -12,
    collision: true,
  },
  garden7: {
    width: 1,
    height: 1,
    x: 12,
    y: -12,
    collision: true,
  },
  garden8: {
    width: 1,
    height: 1,
    x: 13,
    y: -18,
    collision: true,
  },
  garden9: {
    width: 1,
    height: 1,
    x: 14,
    y: -18,
    collision: true,
  },
  garden10: {
    width: 1,
    height: 1,
    x: 15,
    y: -18,
    collision: true,
  },
  garden11: {
    width: 2,
    height: 1,
    x: 13,
    y: -19,
    collision: true,
  },
  garden12: {
    width: 2,
    height: 1,
    x: 15,
    y: -19,
    collision: true,
  },
  garden13: {
    width: 2,
    height: 1,
    x: 15,
    y: -20,
    collision: true,
  },
  billboard1: {
    width: 1,
    height: 2,
    x: 12,
    y: -13,
    collision: true,
  },
  billboard2: {
    width: 1,
    height: 1,
    x: 11,
    y: -13,
    collision: true,
  },
  billboard3: {
    width: 1,
    height: 1,
    x: 11,
    y: -14,
    collision: true,
  },
  billboard4: {
    width: 1,
    height: 1,
    x: 11,
    y: -15,
    collision: true,
  },
  fence1: {
    width: 1,
    height: 1,
    x: 13,
    y: -15,
    collision: true,
  },
  fence2: {
    //|
    width: 1,
    height: 1,
    x: 13,
    y: -16,
    collision: true,
  },
  fence3: {
    width: 1,
    height: 1,
    x: 13,
    y: -17,
    collision: true,
  },
  fence4: {
    //-
    width: 1,
    height: 1,
    x: 14,
    y: -15,
    collision: true,
  },
  rock1: {
    width: 2,
    height: 2,
    x: 17.1,
    y: -18.2,
    collision: true,
  },
  rock2: {
    width: 1,
    height: 1,
    x: 17,
    y: -15,
    collision: true,
  },
  rock3: {
    width: 1,
    height: 2,
    x: 16,
    y: -14,
    collision: true,
  },
  rock4: {
    width: 2,
    height: 2,
    x: 19,
    y: -13,
    collision: true,
  },
  flower1: {
    width: 1,
    height: 2,
    x: 17,
    y: -13,
    collision: false,
  },
  flower2: {
    width: 2,
    height: 3,
    x: 2,
    y: -23,
    collision: false,
  },
  mushroom1: {
    width: 2,
    height: 1,
    x: 2,
    y: -26.5,
    collision: false,
  },
  mushroom2: {
    width: 2,
    height: 1,
    x: 2,
    y: -26.5,
    collision: false,
  },
  mushroom3: {
    width: 2,
    height: 1,
    x: 2,
    y: -30.5,
    collision: false,
  },
  fruit1: {
    width: 2,
    height: 2,
    x: 4,
    y: -21,
    collision: false,
  },
  fruit2: {
    width: 2,
    height: 2,
    x: 2,
    y: -21,
    collision: false,
  },
  fruit3: {
    width: 2,
    height: 2,
    x: 4,
    y: -23,
    collision: false,
  },
};
interface StartingPoint {
  top: number;
  left: number;
  direction: 'up' | 'down' | 'left' | 'right';
  frame: number;
}

interface ObjectPosition {
  left: number;
  top: number;
}

interface Map2 {
  unit: number;
  width: number;
  height: number;
  border: number;
  unitWidth: number;
  unitHeight: number;
  startingPoint: StartingPoint;
  objects: Record<string, ObjectPosition[]>;
}
export const map2: Map2 = {
  unit: 48,
  width: 1920,
  height: 1440,
  border: 0,
  unitWidth: 40,
  unitHeight: 30,
  startingPoint: { top: 470, left: 1002, direction: 'down', frame: 0 },
  objects: {
    floor17: [
      {
        left: 15,
        top: 1,
      },
      {
        left: 21,
        top: 1,
      },
      {
        left: 24,
        top: 1,
      },
      {
        left: 18,
        top: 1,
      },
      {
        left: 15,
        top: 2,
      },
      {
        left: 18,
        top: 2,
      },
      {
        left: 21,
        top: 2,
      },
      {
        left: 24,
        top: 2,
      },
      {
        left: 15,
        top: 3,
      },
      {
        left: 18,
        top: 3,
      },
      {
        left: 24,
        top: 3,
      },
      {
        left: 20,
        top: 4,
      },
      {
        left: 14,
        top: 8,
      },
      {
        left: 17,
        top: 8,
      },
      {
        left: 23,
        top: 8,
      },
      {
        left: 28,
        top: 20,
      },
      {
        left: 28,
        top: 14,
      },
      {
        left: 28,
        top: 13,
      },
      {
        left: 27,
        top: 0,
      },
      {
        left: 30,
        top: 0,
      },
      {
        left: 33,
        top: 0,
      },
      {
        left: 30,
        top: 1,
      },
      {
        left: 30,
        top: 2,
      },
      {
        left: 30,
        top: 3,
      },
      {
        left: 30,
        top: 4,
      },
      {
        left: 30,
        top: 5,
      },
      {
        left: 30,
        top: 6,
      },
      {
        left: 33,
        top: 1,
      },
      {
        left: 33,
        top: 2,
      },
      {
        left: 33,
        top: 3,
      },
      {
        left: 33,
        top: 4,
      },
      {
        left: 33,
        top: 6,
      },
      {
        left: 33,
        top: 7,
      },
      {
        left: 33,
        top: 5,
      },
      {
        left: 27,
        top: 6,
      },
      {
        left: 27,
        top: 4,
      },
      {
        left: 27,
        top: 3,
      },
      {
        left: 27,
        top: 2,
      },
      {
        left: 27,
        top: 1,
      },
      {
        left: 27,
        top: 5,
      },
      {
        left: 27,
        top: 7,
      },
      {
        left: 3,
        top: 8,
      },
      {
        left: 0,
        top: 9,
      },
      {
        left: 3,
        top: 9,
      },
      {
        left: 8,
        top: 14,
      },
      {
        left: 24,
        top: 0,
      },
      {
        left: 21,
        top: 0,
      },
      {
        left: 18,
        top: 0,
      },
      {
        left: 15,
        top: 0,
      },
      {
        left: 12,
        top: 0,
      },
      {
        left: 12,
        top: 1,
      },
      {
        left: 12,
        top: 2,
      },
      {
        left: 12,
        top: 4,
      },
      {
        left: 12,
        top: 6,
      },
      {
        left: 11,
        top: 8,
      },
      {
        left: 5,
        top: 15,
      },
      {
        left: 5,
        top: 16,
      },
      {
        left: 2,
        top: 16,
      },
      {
        left: 2,
        top: 15,
      },
      {
        left: 1,
        top: 25,
      },
      {
        left: 1,
        top: 24,
      },
      {
        left: 1,
        top: 23,
      },
      {
        left: 1,
        top: 22,
      },
      {
        left: 1,
        top: 21,
      },
      {
        left: 1,
        top: 20,
      },
      {
        left: 4,
        top: 20,
      },
      {
        left: 4,
        top: 21,
      },
      {
        left: 4,
        top: 22,
      },
      {
        left: 4,
        top: 23,
      },
      {
        left: 4,
        top: 25,
      },
      {
        left: 1,
        top: 18,
      },
      {
        left: 4,
        top: 18,
      },
      {
        left: 1,
        top: 19,
      },
      {
        left: 4,
        top: 19,
      },
      {
        left: 5,
        top: 17,
      },
      {
        left: 2,
        top: 17,
      },
      {
        left: 3,
        top: 0,
      },
      {
        left: 9,
        top: 1,
      },
      {
        left: 9,
        top: 2,
      },
      {
        left: 9,
        top: 3,
      },
      {
        left: 9,
        top: 4,
      },
      {
        left: 9,
        top: 5,
      },
      {
        left: 9,
        top: 7,
      },
      {
        left: 9,
        top: 6,
      },
      {
        left: 6,
        top: 1,
      },
      {
        left: 3,
        top: 1,
      },
      {
        left: 3,
        top: 2,
      },
      {
        left: 3,
        top: 3,
      },
      {
        left: 3,
        top: 5,
      },
      {
        left: 3,
        top: 6,
      },
      {
        left: 3,
        top: 4,
      },
      {
        left: 6,
        top: 7,
      },
      {
        left: 6,
        top: 6,
      },
      {
        left: 6,
        top: 5,
      },
      {
        left: 6,
        top: 2,
      },
      {
        left: 6,
        top: 3,
      },
      {
        left: 6,
        top: 4,
      },
      {
        left: 8,
        top: 12,
      },
      {
        left: 0,
        top: 0,
      },
      {
        left: 0,
        top: 1,
      },
      {
        left: 0,
        top: 2,
      },
      {
        left: 0,
        top: 4,
      },
      {
        left: 0,
        top: 6,
      },
      {
        left: 6,
        top: 0,
      },
      {
        left: 9,
        top: 0,
      },
      {
        left: 0,
        top: 7,
      },
      {
        left: 8,
        top: 8,
      },
      {
        left: 0,
        top: 8,
      },
      {
        left: 12,
        top: 3,
      },
      {
        left: 12,
        top: 5,
      },
      {
        left: 0,
        top: 3,
      },
      {
        left: 0,
        top: 5,
      },
      {
        left: 8,
        top: 13,
      },
      {
        left: 4,
        top: 24,
      },
      {
        left: 3,
        top: 7,
      },
      {
        left: 12,
        top: 7,
      },
      {
        left: 21,
        top: 3,
      },
      {
        left: 30,
        top: 7,
      },
    ],
    rockFloor6: [
      {
        left: 20,
        top: 7,
      },
    ],
    rockFloor5: [
      {
        left: 19,
        top: 7,
      },
      {
        left: 18,
        top: 7,
      },
      {
        left: 17,
        top: 7,
      },
      {
        left: 16,
        top: 7,
      },
      {
        left: 15,
        top: 7,
      },
    ],
    rockFloor4: [
      {
        left: 22,
        top: 7,
      },
      {
        left: 23,
        top: 7,
      },
      {
        left: 24,
        top: 7,
      },
      {
        left: 25,
        top: 7,
      },
      {
        left: 26,
        top: 7,
      },
    ],
    rockFloor7: [
      {
        left: 19,
        top: 5,
      },
    ],
    floor16: [
      {
        left: 15,
        top: 4,
      },
      {
        left: 23,
        top: 4,
      },
      {
        left: 24,
        top: 4,
      },
      {
        left: 25,
        top: 4,
      },
      {
        left: 26,
        top: 4,
      },
      {
        left: 14,
        top: 12,
      },
      {
        left: 15,
        top: 12,
      },
      {
        left: 16,
        top: 12,
      },
      {
        left: 17,
        top: 12,
      },
      {
        left: 18,
        top: 12,
      },
      {
        left: 19,
        top: 12,
      },
      {
        left: 37,
        top: 24,
      },
      {
        left: 36,
        top: 24,
      },
      {
        left: 35,
        top: 24,
      },
      {
        left: 28,
        top: 24,
      },
      {
        left: 29,
        top: 24,
      },
      {
        left: 30,
        top: 24,
      },
      {
        left: 27,
        top: 15,
      },
      {
        left: 29,
        top: 21,
      },
      {
        left: 28,
        top: 21,
      },
      {
        left: 35,
        top: 17,
      },
      {
        left: 36,
        top: 17,
      },
      {
        left: 37,
        top: 17,
      },
      {
        left: 30,
        top: 21,
      },
      {
        left: 28,
        top: 15,
      },
      {
        left: 29,
        top: 15,
      },
      {
        left: 30,
        top: 15,
      },
      {
        left: 31,
        top: 14,
      },
      {
        left: 34,
        top: 14,
      },
      {
        left: 35,
        top: 14,
      },
      {
        left: 36,
        top: 14,
      },
      {
        left: 37,
        top: 14,
      },
      {
        left: 34,
        top: 11,
      },
      {
        left: 35,
        top: 11,
      },
      {
        left: 36,
        top: 11,
      },
      {
        left: 37,
        top: 11,
      },
      {
        left: 34,
        top: 8,
      },
      {
        left: 35,
        top: 8,
      },
      {
        left: 36,
        top: 8,
      },
      {
        left: 37,
        top: 8,
      },
      {
        left: 28,
        top: 8,
      },
      {
        left: 29,
        top: 8,
      },
      {
        left: 30,
        top: 8,
      },
      {
        left: 31,
        top: 8,
      },
      {
        left: 36,
        top: 0,
      },
      {
        left: 37,
        top: 0,
      },
      {
        left: 36,
        top: 3,
      },
      {
        left: 37,
        top: 3,
      },
      {
        left: 20,
        top: 12,
      },
      {
        left: 21,
        top: 12,
      },
      {
        left: 16,
        top: 15,
      },
      {
        left: 17,
        top: 15,
      },
      {
        left: 19,
        top: 15,
      },
      {
        left: 20,
        top: 15,
      },
      {
        left: 21,
        top: 15,
      },
      {
        left: 10,
        top: 21,
      },
      {
        left: 11,
        top: 21,
      },
      {
        left: 12,
        top: 21,
      },
      {
        left: 13,
        top: 21,
      },
      {
        left: 16,
        top: 21,
      },
      {
        left: 17,
        top: 21,
      },
      {
        left: 20,
        top: 21,
      },
      {
        left: 23,
        top: 21,
      },
      {
        left: 22,
        top: 21,
      },
      {
        left: 21,
        top: 21,
      },
      {
        left: 23,
        top: 24,
      },
      {
        left: 22,
        top: 24,
      },
      {
        left: 21,
        top: 24,
      },
      {
        left: 20,
        top: 24,
      },
      {
        left: 18,
        top: 24,
      },
      {
        left: 19,
        top: 24,
      },
      {
        left: 17,
        top: 24,
      },
      {
        left: 16,
        top: 24,
      },
      {
        left: 15,
        top: 24,
      },
      {
        left: 14,
        top: 24,
      },
      {
        left: 13,
        top: 24,
      },
      {
        left: 12,
        top: 24,
      },
      {
        left: 11,
        top: 24,
      },
      {
        left: 10,
        top: 24,
      },
      {
        left: 13,
        top: 15,
      },
      {
        left: 12,
        top: 15,
      },
      {
        left: 11,
        top: 15,
      },
      {
        left: 10,
        top: 15,
      },
      {
        left: 1,
        top: 15,
      },
      {
        left: 0,
        top: 15,
      },
      {
        left: 0,
        top: 10,
      },
      {
        left: 0,
        top: 12,
      },
      {
        left: 1,
        top: 10,
      },
      {
        left: 1,
        top: 12,
      },
      {
        left: 0,
        top: 23,
      },
      {
        left: 0,
        top: 18,
      },
      {
        left: 7,
        top: 18,
      },
      {
        left: 7,
        top: 21,
      },
      {
        left: 7,
        top: 12,
      },
      {
        left: 16,
        top: 4,
      },
      {
        left: 17,
        top: 4,
      },
      {
        left: 18,
        top: 4,
      },
      {
        left: 6,
        top: 12,
      },
    ],
    floor7: [
      {
        left: 19,
        top: 4,
      },
      {
        left: 26,
        top: 8,
      },
      {
        left: 35,
        top: 23,
      },
      {
        left: 35,
        top: 22,
      },
      {
        left: 36,
        top: 22,
      },
      {
        left: 37,
        top: 22,
      },
      {
        left: 36,
        top: 23,
      },
      {
        left: 37,
        top: 23,
      },
      {
        left: 27,
        top: 14,
      },
      {
        left: 27,
        top: 13,
      },
      {
        left: 31,
        top: 13,
      },
      {
        left: 37,
        top: 7,
      },
      {
        left: 36,
        top: 6,
      },
      {
        left: 37,
        top: 6,
      },
      {
        left: 18,
        top: 15,
      },
      {
        left: 18,
        top: 16,
      },
      {
        left: 14,
        top: 22,
      },
      {
        left: 14,
        top: 23,
      },
      {
        left: 15,
        top: 23,
      },
      {
        left: 15,
        top: 22,
      },
      {
        left: 18,
        top: 22,
      },
      {
        left: 19,
        top: 22,
      },
      {
        left: 19,
        top: 23,
      },
      {
        left: 18,
        top: 23,
      },
      {
        left: 14,
        top: 15,
      },
      {
        left: 14,
        top: 16,
      },
      {
        left: 15,
        top: 16,
      },
      {
        left: 15,
        top: 15,
      },
      {
        left: 0,
        top: 21,
      },
      {
        left: 0,
        top: 22,
      },
      {
        left: 7,
        top: 24,
      },
      {
        left: 7,
        top: 25,
      },
      {
        left: 27,
        top: 8,
      },
      {
        left: 22,
        top: 8,
      },
      {
        left: 36,
        top: 7,
      },
    ],
    flower2: [
      {
        left: 25,
        top: 4,
      },
      {
        left: 23,
        top: 4,
      },
      {
        left: 15,
        top: 4,
      },
      {
        left: 17,
        top: 4,
      },
      {
        left: 0,
        top: 16,
      },
      {
        left: 6,
        top: 21,
      },
      {
        left: 28,
        top: 2,
      },
      {
        left: 34,
        top: 5,
      },
      {
        left: 12,
        top: 3,
      },
      {
        left: 10,
        top: 22,
      },
      {
        left: 22,
        top: 22,
      },
    ],
    floor8: [
      {
        left: 18,
        top: 9,
      },
      {
        left: 16,
        top: 9,
      },
      {
        left: 14,
        top: 9,
      },
      {
        left: 24,
        top: 9,
      },
      {
        left: 22,
        top: 9,
      },
      {
        left: 35,
        top: 20,
      },
      {
        left: 29,
        top: 18,
      },
      {
        left: 27,
        top: 11,
      },
      {
        left: 29,
        top: 11,
      },
      {
        left: 12,
        top: 9,
      },
      {
        left: 10,
        top: 9,
      },
      {
        left: 8,
        top: 9,
      },
      {
        left: 3,
        top: 10,
      },
    ],
    floor4: [
      {
        left: 20,
        top: 9,
      },
      {
        left: 31,
        top: 18,
      },
      {
        left: 32,
        top: 17,
      },
      {
        left: 32,
        top: 11,
      },
      {
        left: 6,
        top: 10,
      },
    ],
    floor9: [
      {
        left: 21,
        top: 9,
      },
      {
        left: 34,
        top: 20,
      },
      {
        left: 33,
        top: 17,
      },
      {
        left: 26,
        top: 11,
      },
      {
        left: 7,
        top: 9,
      },
    ],
    floor1: [
      {
        left: 14,
        top: 10,
      },
      {
        left: 15,
        top: 10,
      },
      {
        left: 17,
        top: 10,
      },
      {
        left: 16,
        top: 10,
      },
      {
        left: 19,
        top: 10,
      },
      {
        left: 18,
        top: 10,
      },
      {
        left: 20,
        top: 10,
      },
      {
        left: 21,
        top: 10,
      },
      {
        left: 22,
        top: 10,
      },
      {
        left: 23,
        top: 10,
      },
      {
        left: 24,
        top: 10,
      },
      {
        left: 25,
        top: 10,
      },
      {
        left: 25,
        top: 11,
      },
      {
        left: 25,
        top: 12,
      },
      {
        left: 32,
        top: 20,
      },
      {
        left: 33,
        top: 20,
      },
      {
        left: 33,
        top: 21,
      },
      {
        left: 33,
        top: 22,
      },
      {
        left: 32,
        top: 22,
      },
      {
        left: 32,
        top: 21,
      },
      {
        left: 32,
        top: 18,
      },
      {
        left: 32,
        top: 19,
      },
      {
        left: 33,
        top: 18,
      },
      {
        left: 33,
        top: 19,
      },
      {
        left: 24,
        top: 11,
      },
      {
        left: 23,
        top: 12,
      },
      {
        left: 23,
        top: 13,
      },
      {
        left: 25,
        top: 13,
      },
      {
        left: 24,
        top: 13,
      },
      {
        left: 13,
        top: 10,
      },
      {
        left: 12,
        top: 10,
      },
      {
        left: 11,
        top: 10,
      },
      {
        left: 10,
        top: 10,
      },
      {
        left: 9,
        top: 10,
      },
      {
        left: 8,
        top: 10,
      },
      {
        left: 7,
        top: 10,
      },
      {
        left: 3,
        top: 13,
      },
      {
        left: 3,
        top: 12,
      },
      {
        left: 3,
        top: 11,
      },
      {
        left: 4,
        top: 13,
      },
      {
        left: 4,
        top: 12,
      },
      {
        left: 4,
        top: 11,
      },
      {
        left: 23,
        top: 11,
      },
      {
        left: 24,
        top: 12,
      },
    ],
    floor2: [
      {
        left: 31,
        top: 19,
      },
      {
        left: 32,
        top: 12,
      },
      {
        left: 22,
        top: 11,
      },
    ],
    floor3: [
      {
        left: 31,
        top: 22,
      },
      {
        left: 31,
        top: 20,
      },
      {
        left: 31,
        top: 21,
      },
      {
        left: 32,
        top: 16,
      },
      {
        left: 32,
        top: 15,
      },
      {
        left: 32,
        top: 14,
      },
      {
        left: 32,
        top: 13,
      },
      {
        left: 32,
        top: 10,
      },
      {
        left: 32,
        top: 9,
      },
      {
        left: 22,
        top: 12,
      },
      {
        left: 22,
        top: 13,
      },
      {
        left: 6,
        top: 9,
      },
      {
        left: 2,
        top: 13,
      },
      {
        left: 2,
        top: 12,
      },
      {
        left: 2,
        top: 11,
      },
    ],
    floor5: [
      {
        left: 31,
        top: 11,
      },
      {
        left: 5,
        top: 10,
      },
    ],
    floor6: [
      {
        left: 14,
        top: 11,
      },
      {
        left: 16,
        top: 11,
      },
      {
        left: 18,
        top: 11,
      },
      {
        left: 35,
        top: 21,
      },
      {
        left: 29,
        top: 19,
      },
      {
        left: 27,
        top: 12,
      },
      {
        left: 29,
        top: 12,
      },
      {
        left: 20,
        top: 11,
      },
      {
        left: 12,
        top: 11,
      },
      {
        left: 10,
        top: 11,
      },
      {
        left: 8,
        top: 11,
      },
      {
        left: 6,
        top: 11,
      },
    ],
    floor10: [
      {
        left: 34,
        top: 21,
      },
      {
        left: 26,
        top: 12,
      },
      {
        left: 5,
        top: 11,
      },
    ],
    floor11: [
      {
        left: 26,
        top: 13,
      },
      {
        left: 34,
        top: 22,
      },
      {
        left: 34,
        top: 19,
      },
      {
        left: 34,
        top: 18,
      },
      {
        left: 33,
        top: 16,
      },
      {
        left: 33,
        top: 15,
      },
      {
        left: 33,
        top: 14,
      },
      {
        left: 33,
        top: 13,
      },
      {
        left: 33,
        top: 12,
      },
      {
        left: 33,
        top: 11,
      },
      {
        left: 33,
        top: 10,
      },
      {
        left: 33,
        top: 9,
      },
      {
        left: 5,
        top: 13,
      },
      {
        left: 5,
        top: 12,
      },
    ],
    floor18: [
      {
        left: 26,
        top: 9,
      },
    ],
    floor19: [
      {
        left: 28,
        top: 18,
      },
      {
        left: 31,
        top: 17,
      },
      {
        left: 32,
        top: 8,
      },
      {
        left: 20,
        top: 8,
      },
      {
        left: 6,
        top: 8,
      },
      {
        left: 2,
        top: 10,
      },
    ],
    floor22: [
      {
        left: 24,
        top: 14,
      },
      {
        left: 25,
        top: 14,
      },
      {
        left: 23,
        top: 14,
      },
      {
        left: 32,
        top: 23,
      },
      {
        left: 33,
        top: 23,
      },
    ],
    floor23: [
      {
        left: 26,
        top: 14,
      },
      {
        left: 34,
        top: 23,
      },
    ],
    floor25: [
      {
        left: 23,
        top: 18,
      },
      {
        left: 24,
        top: 18,
      },
      {
        left: 25,
        top: 18,
      },
      {
        left: 32,
        top: 27,
      },
      {
        left: 33,
        top: 27,
      },
    ],
    floor26: [
      {
        left: 26,
        top: 18,
      },
      {
        left: 34,
        top: 27,
      },
    ],
    floor24: [
      {
        left: 22,
        top: 18,
      },
      {
        left: 31,
        top: 27,
      },
    ],
    water: [
      {
        left: 22,
        top: 19,
      },
      {
        left: 23,
        top: 19,
      },
      {
        left: 24,
        top: 19,
      },
      {
        left: 25,
        top: 19,
      },
      {
        left: 26,
        top: 19,
      },
      {
        left: 26,
        top: 20,
      },
      {
        left: 25,
        top: 20,
      },
      {
        left: 20,
        top: 19,
      },
      {
        left: 21,
        top: 19,
      },
      {
        left: 37,
        top: 29,
      },
      {
        left: 36,
        top: 29,
      },
      {
        left: 35,
        top: 29,
      },
      {
        left: 34,
        top: 29,
      },
      {
        left: 33,
        top: 29,
      },
      {
        left: 32,
        top: 29,
      },
      {
        left: 31,
        top: 29,
      },
      {
        left: 30,
        top: 29,
      },
      {
        left: 26,
        top: 21,
      },
      {
        left: 25,
        top: 21,
      },
      {
        left: 25,
        top: 22,
      },
      {
        left: 26,
        top: 22,
      },
      {
        left: 26,
        top: 23,
      },
      {
        left: 25,
        top: 23,
      },
      {
        left: 25,
        top: 26,
      },
      {
        left: 26,
        top: 26,
      },
      {
        left: 26,
        top: 27,
      },
      {
        left: 25,
        top: 27,
      },
      {
        left: 25,
        top: 28,
      },
      {
        left: 26,
        top: 28,
      },
      {
        left: 26,
        top: 29,
      },
      {
        left: 25,
        top: 29,
      },
      {
        left: 27,
        top: 29,
      },
      {
        left: 28,
        top: 29,
      },
      {
        left: 29,
        top: 29,
      },
      {
        left: 38,
        top: 29,
      },
      {
        left: 39,
        top: 29,
      },
      {
        left: 39,
        top: 28,
      },
      {
        left: 39,
        top: 27,
      },
      {
        left: 39,
        top: 26,
      },
      {
        left: 39,
        top: 25,
      },
      {
        left: 39,
        top: 24,
      },
      {
        left: 39,
        top: 23,
      },
      {
        left: 39,
        top: 22,
      },
      {
        left: 39,
        top: 20,
      },
      {
        left: 39,
        top: 19,
      },
      {
        left: 39,
        top: 21,
      },
      {
        left: 39,
        top: 18,
      },
      {
        left: 39,
        top: 17,
      },
      {
        left: 39,
        top: 16,
      },
      {
        left: 39,
        top: 15,
      },
      {
        left: 39,
        top: 14,
      },
      {
        left: 39,
        top: 0,
      },
      {
        left: 39,
        top: 1,
      },
      {
        left: 39,
        top: 2,
      },
      {
        left: 39,
        top: 3,
      },
      {
        left: 39,
        top: 4,
      },
      {
        left: 39,
        top: 5,
      },
      {
        left: 39,
        top: 7,
      },
      {
        left: 39,
        top: 6,
      },
      {
        left: 39,
        top: 8,
      },
      {
        left: 39,
        top: 9,
      },
      {
        left: 39,
        top: 10,
      },
      {
        left: 39,
        top: 11,
      },
      {
        left: 39,
        top: 12,
      },
      {
        left: 39,
        top: 13,
      },
      {
        left: 27,
        top: 28,
      },
      {
        left: 28,
        top: 28,
      },
      {
        left: 29,
        top: 28,
      },
      {
        left: 30,
        top: 28,
      },
      {
        left: 31,
        top: 28,
      },
      {
        left: 32,
        top: 28,
      },
      {
        left: 33,
        top: 28,
      },
      {
        left: 34,
        top: 28,
      },
      {
        left: 35,
        top: 28,
      },
      {
        left: 36,
        top: 28,
      },
      {
        left: 37,
        top: 28,
      },
      {
        left: 38,
        top: 28,
      },
      {
        left: 24,
        top: 28,
      },
      {
        left: 24,
        top: 29,
      },
      {
        left: 23,
        top: 29,
      },
      {
        left: 23,
        top: 28,
      },
      {
        left: 21,
        top: 29,
      },
      {
        left: 21,
        top: 28,
      },
      {
        left: 22,
        top: 28,
      },
      {
        left: 22,
        top: 29,
      },
      {
        left: 20,
        top: 29,
      },
      {
        left: 20,
        top: 28,
      },
      {
        left: 19,
        top: 28,
      },
      {
        left: 18,
        top: 29,
      },
      {
        left: 19,
        top: 29,
      },
      {
        left: 18,
        top: 28,
      },
      {
        left: 16,
        top: 29,
      },
      {
        left: 14,
        top: 29,
      },
      {
        left: 15,
        top: 28,
      },
      {
        left: 14,
        top: 28,
      },
      {
        left: 15,
        top: 29,
      },
      {
        left: 17,
        top: 28,
      },
      {
        left: 17,
        top: 29,
      },
      {
        left: 16,
        top: 28,
      },
      {
        left: 13,
        top: 28,
      },
      {
        left: 13,
        top: 29,
      },
      {
        left: 12,
        top: 29,
      },
      {
        left: 12,
        top: 28,
      },
      {
        left: 11,
        top: 28,
      },
      {
        left: 9,
        top: 29,
      },
      {
        left: 10,
        top: 28,
      },
      {
        left: 9,
        top: 28,
      },
      {
        left: 8,
        top: 28,
      },
      {
        left: 8,
        top: 29,
      },
      {
        left: 10,
        top: 29,
      },
      {
        left: 11,
        top: 29,
      },
      {
        left: 7,
        top: 28,
      },
      {
        left: 7,
        top: 29,
      },
      {
        left: 6,
        top: 29,
      },
      {
        left: 6,
        top: 28,
      },
      {
        left: 17,
        top: 19,
      },
      {
        left: 16,
        top: 19,
      },
      {
        left: 9,
        top: 19,
      },
      {
        left: 10,
        top: 19,
      },
      {
        left: 11,
        top: 19,
      },
      {
        left: 12,
        top: 19,
      },
      {
        left: 13,
        top: 19,
      },
      {
        left: 6,
        top: 27,
      },
      {
        left: 7,
        top: 27,
      },
      {
        left: 8,
        top: 27,
      },
    ],
    water3: [
      {
        left: 27,
        top: 19,
      },
      {
        left: 27,
        top: 20,
      },
      {
        left: 27,
        top: 21,
      },
      {
        left: 27,
        top: 22,
      },
      {
        left: 27,
        top: 23,
      },
      {
        left: 27,
        top: 26,
      },
      {
        left: 9,
        top: 21,
      },
      {
        left: 9,
        top: 25,
      },
      {
        left: 9,
        top: 26,
      },
      {
        left: 9,
        top: 22,
      },
      {
        left: 9,
        top: 23,
      },
      {
        left: 9,
        top: 24,
      },
      {
        left: 9,
        top: 16,
      },
      {
        left: 9,
        top: 17,
      },
    ],
    water5: [
      {
        left: 27,
        top: 18,
      },
      {
        left: 9,
        top: 15,
      },
    ],
    water9: [
      {
        left: 27,
        top: 27,
      },
      {
        left: 9,
        top: 27,
      },
      {
        left: 9,
        top: 18,
      },
    ],
    water2: [
      {
        left: 28,
        top: 27,
      },
      {
        left: 29,
        top: 27,
      },
      {
        left: 30,
        top: 27,
      },
      {
        left: 35,
        top: 27,
      },
      {
        left: 36,
        top: 27,
      },
      {
        left: 37,
        top: 27,
      },
      {
        left: 23,
        top: 27,
      },
      {
        left: 22,
        top: 27,
      },
      {
        left: 21,
        top: 27,
      },
      {
        left: 20,
        top: 27,
      },
      {
        left: 19,
        top: 27,
      },
      {
        left: 17,
        top: 27,
      },
      {
        left: 16,
        top: 27,
      },
      {
        left: 18,
        top: 27,
      },
      {
        left: 15,
        top: 27,
      },
      {
        left: 14,
        top: 27,
      },
      {
        left: 13,
        top: 27,
      },
      {
        left: 11,
        top: 27,
      },
      {
        left: 12,
        top: 27,
      },
      {
        left: 10,
        top: 27,
      },
      {
        left: 20,
        top: 18,
      },
      {
        left: 21,
        top: 18,
      },
      {
        left: 16,
        top: 18,
      },
      {
        left: 17,
        top: 18,
      },
      {
        left: 13,
        top: 18,
      },
      {
        left: 12,
        top: 18,
      },
      {
        left: 11,
        top: 18,
      },
      {
        left: 10,
        top: 18,
      },
      {
        left: 1,
        top: 26,
      },
      {
        left: 2,
        top: 26,
      },
      {
        left: 3,
        top: 26,
      },
      {
        left: 4,
        top: 26,
      },
      {
        left: 5,
        top: 26,
      },
      {
        left: 6,
        top: 26,
      },
      {
        left: 0,
        top: 26,
      },
      {
        left: 7,
        top: 26,
      },
    ],
    water10: [
      {
        left: 38,
        top: 27,
      },
      {
        left: 24,
        top: 27,
      },
      {
        left: 8,
        top: 26,
      },
    ],
    water11: [
      {
        left: 38,
        top: 26,
      },
      {
        left: 38,
        top: 25,
      },
      {
        left: 38,
        top: 24,
      },
      {
        left: 38,
        top: 23,
      },
      {
        left: 38,
        top: 22,
      },
      {
        left: 38,
        top: 21,
      },
      {
        left: 38,
        top: 20,
      },
      {
        left: 38,
        top: 19,
      },
      {
        left: 38,
        top: 18,
      },
      {
        left: 38,
        top: 17,
      },
      {
        left: 38,
        top: 16,
      },
      {
        left: 38,
        top: 15,
      },
      {
        left: 38,
        top: 14,
      },
      {
        left: 38,
        top: 13,
      },
      {
        left: 38,
        top: 12,
      },
      {
        left: 38,
        top: 11,
      },
      {
        left: 38,
        top: 10,
      },
      {
        left: 38,
        top: 9,
      },
      {
        left: 38,
        top: 7,
      },
      {
        left: 38,
        top: 8,
      },
      {
        left: 38,
        top: 6,
      },
      {
        left: 38,
        top: 5,
      },
      {
        left: 38,
        top: 4,
      },
      {
        left: 38,
        top: 3,
      },
      {
        left: 38,
        top: 2,
      },
      {
        left: 38,
        top: 1,
      },
      {
        left: 38,
        top: 0,
      },
      {
        left: 24,
        top: 22,
      },
      {
        left: 24,
        top: 23,
      },
      {
        left: 24,
        top: 26,
      },
      {
        left: 8,
        top: 25,
      },
      {
        left: 8,
        top: 23,
      },
      {
        left: 8,
        top: 24,
      },
      {
        left: 8,
        top: 22,
      },
      {
        left: 8,
        top: 21,
      },
      {
        left: 8,
        top: 20,
      },
      {
        left: 8,
        top: 19,
      },
      {
        left: 8,
        top: 18,
      },
      {
        left: 8,
        top: 17,
      },
      {
        left: 8,
        top: 16,
      },
    ],
    floor27: [
      {
        left: 31,
        top: 23,
      },
      {
        left: 28,
        top: 19,
      },
      {
        left: 22,
        top: 14,
      },
      {
        left: 2,
        top: 14,
      },
    ],
    floor21: [
      {
        left: 22,
        top: 15,
      },
      {
        left: 31,
        top: 24,
      },
    ],
    floor28: [
      {
        left: 37,
        top: 21,
      },
      {
        left: 5,
        top: 14,
      },
    ],
    floor12: [
      {
        left: 34,
        top: 17,
      },
      {
        left: 33,
        top: 8,
      },
      {
        left: 21,
        top: 8,
      },
      {
        left: 7,
        top: 8,
      },
      {
        left: 37,
        top: 20,
      },
    ],
    floor29: [
      {
        left: 31,
        top: 12,
      },
      {
        left: 3,
        top: 14,
      },
      {
        left: 4,
        top: 14,
      },
    ],
    rockFloor10: [
      {
        left: 27,
        top: 0,
      },
    ],
    rockFloor12: [
      {
        left: 27,
        top: 1,
      },
      {
        left: 27,
        top: 3,
      },
      {
        left: 27,
        top: 5,
      },
    ],
    rockFloor13: [
      {
        left: 27,
        top: 7,
      },
    ],
    waterFloor1: [
      {
        left: 18,
        top: 17,
      },
      {
        left: 14,
        top: 17,
      },
    ],
    waterFloor3: [
      {
        left: 18,
        top: 19,
      },

      {
        left: 14,
        top: 19,
      },
    ],
    waterFloor4: [
      {
        left: 18,
        top: 21,
      },
      {
        left: 14,
        top: 21,
      },
    ],
    waterFloor6: [
      {
        left: 14,
        top: 20,
      },
      {
        left: 18,
        top: 20,
      },
    ],
    water12: [
      {
        left: 20,
        top: 20,
      },
      {
        left: 21,
        top: 20,
      },
      {
        left: 22,
        top: 20,
      },
      {
        left: 23,
        top: 20,
      },
      {
        left: 10,
        top: 20,
      },
      {
        left: 11,
        top: 20,
      },
      {
        left: 12,
        top: 20,
      },
      {
        left: 13,
        top: 20,
      },
      {
        left: 16,
        top: 20,
      },
      {
        left: 17,
        top: 20,
      },
    ],
    water4: [
      {
        left: 24,
        top: 20,
      },
    ],
    water14: [
      {
        left: 9,
        top: 20,
      },
    ],
    waterIsland: [
      {
        left: 0,
        top: 27,
      },
    ],
    waterFloor2: [
      {
        left: 24,
        top: 24,
      },
    ],
    waterFloor5: [
      {
        left: 27,
        top: 24,
      },
    ],
    rockFloor14: [
      {
        left: 14,
        top: 7,
      },
    ],
    rockFloor8: [
      {
        left: 14,
        top: 5,
      },
      {
        left: 14,
        top: 3,
      },
      {
        left: 14,
        top: 1,
      },
    ],
    rockFloor11: [
      {
        left: 14,
        top: 0,
      },
    ],
    rockFloor2: [
      {
        left: 15,
        top: 0,
      },
      {
        left: 19,
        top: 0,
      },
      {
        left: 23,
        top: 0,
      },
    ],
    water6: [
      {
        left: 8,
        top: 15,
      },
    ],
    fence1: [
      {
        left: 0,
        top: 14,
      },
      {
        left: 7,
        top: 14,
      },
    ],
    fence4: [
      {
        left: 1,
        top: 14,
      },
      {
        left: 6,
        top: 14,
      },
      {
        left: 2,
        top: 14,
      },
      {
        left: 5,
        top: 14,
      },
      {
        left: 9,
        top: 8,
      },
      {
        left: 10,
        top: 8,
      },
      {
        left: 11,
        top: 8,
      },
      {
        left: 5,
        top: 8,
      },
      {
        left: 4,
        top: 8,
      },
      {
        left: 2,
        top: 8,
      },
      {
        left: 3,
        top: 8,
      },
      {
        left: 1,
        top: 8,
      },
      {
        left: 12,
        top: 8,
      },
      {
        left: 0,
        top: 8,
      },
      {
        left: 13,
        top: 8,
      },
      {
        left: 8,
        top: 8,
      },
      {
        left: 28,
        top: 8,
      },
      {
        left: 29,
        top: 8,
      },
      {
        left: 30,
        top: 8,
      },
      {
        left: 31,
        top: 8,
      },
      {
        left: 34,
        top: 8,
      },
      {
        left: 35,
        top: 8,
      },
      {
        left: 36,
        top: 8,
      },
      {
        left: 37,
        top: 8,
      },
    ],
    tree4: [
      {
        left: 0,
        top: 0,
      },
    ],
    redHouse3: [
      {
        left: 5,
        top: 0,
      },
    ],
    tree3: [
      {
        left: 9,
        top: 0,
      },
    ],
    tree2: [
      {
        left: 0,
        top: 12,
      },
      {
        left: 0,
        top: 10,
      },
      {
        left: 12,
        top: 20,
      },
      {
        left: 0,
        top: 14,
      },
      {
        left: 28,
        top: 0,
      },
      {
        left: 1,
        top: 27,
      },
      {
        left: 12,
        top: 6,
      },
    ],
    fruit1: [
      {
        left: 0,
        top: 10,
      },
      {
        left: 0,
        top: 12,
      },
    ],
    tree7: [
      {
        left: 22,
        top: 20,
      },
      {
        left: 30,
        top: 0,
      },
      {
        left: 6,
        top: 24,
      },
      {
        left: 36,
        top: 6,
      },
    ],
    redHouse4: [
      {
        left: 5,
        top: 15,
      },
    ],
    redHouse2: [
      {
        left: 19,
        top: 0,
      },
    ],
    blueHouse2: [
      {
        left: 23,
        top: 0,
      },
    ],
    greenHouse2: [
      {
        left: 15,
        top: 0,
      },
    ],
    blueHouse4: [
      {
        left: 27,
        top: 15,
      },
    ],
    greenHouse4: [
      {
        left: 35,
        top: 17,
      },
    ],
    garden7: [
      {
        left: 30,
        top: 24,
      },
      {
        left: 30,
        top: 25,
      },
      {
        left: 30,
        top: 26,
      },
      {
        left: 35,
        top: 24,
      },
      {
        left: 35,
        top: 25,
      },
      {
        left: 35,
        top: 26,
      },
      {
        left: 0,
        top: 7,
      },
      {
        left: 0,
        top: 6,
      },
      {
        left: 0,
        top: 5,
      },
      {
        left: 0,
        top: 4,
      },
      {
        left: 0,
        top: 3,
      },
    ],
    billboard1: [
      {
        left: 22,
        top: 7,
      },
    ],
    garden1: [
      {
        left: 10,
        top: 17,
      },
    ],
    garden3: [
      {
        left: 20,
        top: 17,
      },
    ],
    garden4: [
      {
        left: 21,
        top: 17,
      },
    ],
    tree8: [
      {
        left: 10,
        top: 20,
      },
      {
        left: 32,
        top: 0,
      },
    ],
    tree9: [
      {
        left: 20,
        top: 20,
      },
      {
        left: 6,
        top: 12,
      },
      {
        left: 8,
        top: 13,
      },
      {
        left: 0,
        top: 24,
      },
      {
        left: 28,
        top: 6,
      },
    ],
    greenHouse1: [
      {
        left: 34,
        top: 0,
      },
    ],
    waterPool: [
      {
        left: 11,
        top: 12,
      },
    ],
    rock3: [
      {
        left: 21,
        top: 15,
      },
    ],
    billboard2: [
      {
        left: 7,
        top: 18,
      },
    ],
    billboard4: [
      {
        left: 14,
        top: 8,
      },
    ],
    billboard3: [
      {
        left: 27,
        top: 8,
      },
    ],
    redHouse1: [
      {
        left: 34,
        top: 9,
      },
    ],
    fruit2: [
      {
        left: 8,
        top: 13,
      },
      {
        left: 6,
        top: 12,
      },
    ],
    mushroom2: [
      {
        left: 6,
        top: 20,
      },
      {
        left: 21,
        top: 26,
      },
    ],
    rock1: [
      {
        left: 10,
        top: 25,
      },
      {
        left: 36,
        top: 15,
      },
    ],
    rock2: [
      {
        left: 7,
        top: 19,
      },
      {
        left: 23,
        top: 26,
      },
    ],
    garden10: [
      {
        left: 37,
        top: 12,
      },
    ],
    garden8: [
      {
        left: 34,
        top: 12,
      },
    ],
    garden9: [
      {
        left: 36,
        top: 12,
      },
    ],
    garden2: [
      {
        left: 3,
        top: 28,
      },
    ],
  },
};

export const map2Collision:Record<string, boolean> = {
  '19,7': true,
  '18,7': true,
  '17,7': true,
  '16,7': true,
  '15,7': true,
  '22,7': true,
  '23,7': true,
  '24,7': true,
  '25,7': true,
  '26,7': true,
  '23,18': true,
  '24,18': true,
  '25,18': true,
  '32,27': true,
  '33,27': true,
  '26,18': true,
  '34,27': true,
  '22,18': true,
  '31,27': true,
  '22,19': true,
  '23,19': true,
  '24,19': true,
  '25,19': true,
  '26,19': true,
  '26,20': true,
  '25,20': true,
  '20,19': true,
  '21,19': true,
  '37,29': true,
  '36,29': true,
  '35,29': true,
  '34,29': true,
  '33,29': true,
  '32,29': true,
  '31,29': true,
  '30,29': true,
  '26,21': true,
  '25,21': true,
  '25,22': true,
  '26,22': true,
  '26,23': true,
  '25,23': true,
  '25,26': true,
  '26,26': true,
  '26,27': true,
  '25,27': true,
  '25,28': true,
  '26,28': true,
  '26,29': true,
  '25,29': true,
  '27,29': true,
  '28,29': true,
  '29,29': true,
  '38,29': true,
  '39,29': true,
  '39,28': true,
  '39,27': true,
  '39,26': true,
  '39,25': true,
  '39,24': true,
  '39,23': true,
  '39,22': true,
  '39,20': true,
  '39,19': true,
  '39,21': true,
  '39,18': true,
  '39,17': true,
  '39,16': true,
  '39,15': true,
  '39,14': true,
  '39,0': true,
  '39,1': true,
  '39,2': true,
  '39,3': true,
  '39,4': true,
  '39,5': true,
  '39,7': true,
  '39,6': true,
  '39,8': true,
  '39,9': true,
  '39,10': true,
  '39,11': true,
  '39,12': true,
  '39,13': true,
  '27,28': true,
  '28,28': true,
  '29,28': true,
  '30,28': true,
  '31,28': true,
  '32,28': true,
  '33,28': true,
  '34,28': true,
  '35,28': true,
  '36,28': true,
  '37,28': true,
  '38,28': true,
  '24,28': true,
  '24,29': true,
  '23,29': true,
  '23,28': true,
  '21,29': true,
  '21,28': true,
  '22,28': true,
  '22,29': true,
  '20,29': true,
  '20,28': true,
  '19,28': true,
  '18,29': true,
  '19,29': true,
  '18,28': true,
  '16,29': true,
  '14,29': true,
  '15,28': true,
  '14,28': true,
  '15,29': true,
  '17,28': true,
  '17,29': true,
  '16,28': true,
  '13,28': true,
  '13,29': true,
  '12,29': true,
  '12,28': true,
  '11,28': true,
  '9,29': true,
  '10,28': true,
  '9,28': true,
  '8,28': true,
  '8,29': true,
  '10,29': true,
  '11,29': true,
  '7,28': true,
  '7,29': true,
  '6,29': true,
  '6,28': true,
  '17,19': true,
  '16,19': true,
  '9,19': true,
  '10,19': true,
  '11,19': true,
  '12,19': true,
  '13,19': true,
  '6,27': true,
  '7,27': true,
  '8,27': true,
  '27,19': true,
  '27,20': true,
  '27,21': true,
  '27,22': true,
  '27,23': true,
  '27,26': true,
  '9,21': true,
  '9,25': true,
  '9,26': true,
  '9,22': true,
  '9,23': true,
  '9,24': true,
  '9,16': true,
  '9,17': true,
  '27,18': true,
  '9,15': true,
  '27,27': true,
  '9,27': true,
  '9,18': true,
  '28,27': true,
  '29,27': true,
  '30,27': true,
  '35,27': true,
  '36,27': true,
  '37,27': true,
  '23,27': true,
  '22,27': true,
  '21,27': true,
  '20,27': true,
  '19,27': true,
  '17,27': true,
  '16,27': true,
  '18,27': true,
  '15,27': true,
  '14,27': true,
  '13,27': true,
  '11,27': true,
  '12,27': true,
  '10,27': true,
  '20,18': true,
  '21,18': true,
  '16,18': true,
  '17,18': true,
  '13,18': true,
  '12,18': true,
  '11,18': true,
  '10,18': true,
  '1,26': true,
  '2,26': true,
  '3,26': true,
  '4,26': true,
  '5,26': true,
  '6,26': true,
  '0,26': true,
  '7,26': true,
  '38,27': true,
  '24,27': true,
  '8,26': true,
  '38,26': true,
  '38,25': true,
  '38,24': true,
  '38,23': true,
  '38,22': true,
  '38,21': true,
  '38,20': true,
  '38,19': true,
  '38,18': true,
  '38,17': true,
  '38,16': true,
  '38,15': true,
  '38,14': true,
  '38,13': true,
  '38,12': true,
  '38,11': true,
  '38,10': true,
  '38,9': true,
  '38,7': true,
  '38,8': true,
  '38,6': true,
  '38,5': true,
  '38,4': true,
  '38,3': true,
  '38,2': true,
  '38,1': true,
  '38,0': true,
  '24,22': true,
  '24,23': true,
  '24,26': true,
  '8,25': true,
  '8,23': true,
  '8,24': true,
  '8,22': true,
  '8,21': true,
  '8,20': true,
  '8,19': true,
  '8,18': true,
  '8,17': true,
  '8,16': true,
  '27,0': true,
  '27,1': true,
  '27,2': true,
  '27,3': true,
  '27,4': true,
  '27,5': true,
  '27,6': true,
  '27,7': true,
  '20,20': true,
  '21,20': true,
  '22,20': true,
  '23,20': true,
  '10,20': true,
  '11,20': true,
  '12,20': true,
  '13,20': true,
  '16,20': true,
  '17,20': true,
  '24,20': true,
  '24,21': true,
  '9,20': true,
  '0,27': true,
  '0,28': true,
  '0,29': true,
  '1,27': true,
  '1,28': true,
  '1,29': true,
  '2,27': true,
  '2,28': true,
  '2,29': true,
  '3,27': true,
  '3,28': true,
  '3,29': true,
  '4,27': true,
  '4,28': true,
  '4,29': true,
  '5,27': true,
  '5,28': true,
  '5,29': true,
  '14,7': true,
  '14,5': true,
  '14,6': true,
  '14,3': true,
  '14,4': true,
  '14,1': true,
  '14,2': true,
  '14,0': true,
  '15,0': true,
  '16,0': true,
  '17,0': true,
  '18,0': true,
  '19,0': true,
  '20,0': true,
  '21,0': true,
  '22,0': true,
  '23,0': true,
  '24,0': true,
  '25,0': true,
  '26,0': true,
  '8,15': true,
  '0,14': true,
  '7,14': true,
  '1,14': true,
  '6,14': true,
  '2,14': true,
  '5,14': true,
  '9,8': true,
  '10,8': true,
  '11,8': true,
  '5,8': true,
  '4,8': true,
  '2,8': true,
  '3,8': true,
  '1,8': true,
  '12,8': true,
  '0,8': true,
  '13,8': true,
  '8,8': true,
  '28,8': true,
  '29,8': true,
  '30,8': true,
  '31,8': true,
  '34,8': true,
  '35,8': true,
  '36,8': true,
  '37,8': true,
  '0,0': true,
  '0,1': true,
  '0,2': true,
  '1,0': true,
  '1,1': true,
  '1,2': true,
  '2,0': true,
  '2,1': true,
  '2,2': true,
  '3,0': true,
  '3,1': true,
  '3,2': true,
  '4,0': true,
  '4,1': true,
  '4,2': true,
  '5,0': true,
  '5,1': true,
  '5,2': true,
  '5,3': true,
  '6,0': true,
  '6,1': true,
  '6,2': true,
  '6,3': true,
  '7,0': true,
  '7,1': true,
  '7,2': true,
  '7,3': true,
  '8,0': true,
  '8,1': true,
  '8,2': true,
  '8,3': true,
  '9,0': true,
  '9,1': true,
  '9,2': true,
  '10,0': true,
  '10,1': true,
  '10,2': true,
  '11,0': true,
  '11,1': true,
  '11,2': true,
  '12,0': true,
  '12,1': true,
  '12,2': true,
  '13,0': true,
  '13,1': true,
  '13,2': true,
  '0,12': true,
  '0,13': true,
  '1,12': true,
  '1,13': true,
  '0,10': true,
  '0,11': true,
  '1,10': true,
  '1,11': true,
  '12,21': true,
  '13,21': true,
  '0,15': true,
  '1,15': true,
  '28,0': true,
  '28,1': true,
  '29,0': true,
  '29,1': true,
  '12,6': true,
  '12,7': true,
  '13,6': true,
  '13,7': true,
  '22,21': true,
  '23,21': true,
  '30,0': true,
  '30,1': true,
  '31,0': true,
  '31,1': true,
  '6,24': true,
  '6,25': true,
  '7,24': true,
  '7,25': true,
  '36,6': true,
  '36,7': true,
  '37,6': true,
  '37,7': true,
  '5,15': true,
  '5,16': true,
  '5,17': true,
  '6,15': true,
  '6,16': true,
  '6,17': true,
  '7,15': true,
  '7,16': true,
  '7,17': true,
  '19,1': true,
  '19,2': true,
  '20,1': true,
  '20,2': true,
  '21,1': true,
  '21,2': true,
  '22,1': true,
  '22,2': true,
  '23,1': true,
  '23,2': true,
  '24,1': true,
  '24,2': true,
  '25,1': true,
  '25,2': true,
  '26,1': true,
  '26,2': true,
  '15,1': true,
  '15,2': true,
  '16,1': true,
  '16,2': true,
  '17,1': true,
  '17,2': true,
  '18,1': true,
  '18,2': true,
  '27,15': true,
  '27,16': true,
  '27,17': true,
  '28,15': true,
  '28,16': true,
  '28,17': true,
  '29,15': true,
  '29,16': true,
  '29,17': true,
  '35,17': true,
  '35,18': true,
  '35,19': true,
  '36,17': true,
  '36,18': true,
  '36,19': true,
  '37,17': true,
  '37,18': true,
  '37,19': true,
  '30,24': true,
  '30,25': true,
  '30,26': true,
  '35,24': true,
  '35,25': true,
  '35,26': true,
  '0,7': true,
  '0,6': true,
  '0,5': true,
  '0,4': true,
  '0,3': true,
  '22,8': true,
  '10,17': true,
  '11,17': true,
  '12,17': true,
  '13,17': true,
  '20,17': true,
  '21,17': true,
  '10,21': true,
  '11,21': true,
  '32,0': true,
  '32,1': true,
  '33,0': true,
  '33,1': true,
  '20,21': true,
  '21,21': true,
  '6,12': true,
  '6,13': true,
  '7,12': true,
  '7,13': true,
  '8,13': true,
  '8,14': true,
  '9,13': true,
  '9,14': true,
  '0,24': true,
  '0,25': true,
  '1,24': true,
  '1,25': true,
  '28,6': true,
  '28,7': true,
  '29,6': true,
  '29,7': true,
  '34,0': true,
  '34,1': true,
  '34,2': true,
  '35,0': true,
  '35,1': true,
  '35,2': true,
  '36,0': true,
  '36,1': true,
  '36,2': true,
  '37,0': true,
  '37,1': true,
  '37,2': true,
  '11,12': true,
  '11,13': true,
  '11,14': true,
  '12,12': true,
  '12,13': true,
  '12,14': true,
  '13,12': true,
  '13,13': true,
  '13,14': true,
  '21,15': true,
  '21,16': true,
  '7,18': true,
  '14,8': true,
  '27,8': true,
  '34,9': true,
  '34,10': true,
  '34,11': true,
  '35,9': true,
  '35,10': true,
  '35,11': true,
  '36,9': true,
  '36,10': true,
  '36,11': true,
  '37,9': true,
  '37,10': true,
  '37,11': true,
  '10,25': true,
  '10,26': true,
  '11,25': true,
  '11,26': true,
  '36,15': true,
  '36,16': true,
  '37,15': true,
  '37,16': true,
  '7,19': true,
  '23,26': true,
  '37,12': true,
  '34,12': true,
  '36,12': true,
};

export const map2Room:Record<string, string> = {
  '7,7': 'room1',
  '6,7': 'room1',
  '32,7': 'room2',
  '33,7': 'room2',
  '4,15': 'room3',
  '3,15': 'room3',
  '14,21': 'room4',
  '15,21': 'room4',
  '18,21': 'room4',
  '19,21': 'room4',
  '23,24': 'room4',
  '23,25': 'room4',
  '3,14': '',
  '4,14': '',
  '6,8': '',
  '7,8': '',
  '14,20': '',
  '15,20': '',
  '18,20': '',
  '19,20': '',
  '24,25': '',
  '24,24': '',
  '32,8': '',
  '33,8': '',
};
