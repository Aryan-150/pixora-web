export type Point = {
  x: number;
  y: number;
};
export type Line = [ Point, Point ];
export type Rect = {
  type: "rect",
  x: number;
  y: number;
  w: number;
  h: number;
};
export type Circle = {
  cx: number;
  cy: number;
  rad: number;
}

interface DefaultOptions {
  type: "rect" | "line" | "circle",
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  width?: number;
  height?: number;
  centreX?: number;
  centreY?: number;
  radius?: number;
}

export type Shapes = DefaultOptions;

