export type Point = {
  x: number;
  y: number;
};
export type Line = [ Point, Point ];
export type Rect = {
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

export type Shapes = Line | Rect | Circle;

export const defaultRect: Rect = {
  x: 0,
  y: 0,
  w: 0,
  h: 0
}
