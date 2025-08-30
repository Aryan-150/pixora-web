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

export const defaultRect: Rect = {
  x: 0,
  y: 0,
  w: 0,
  h: 0
}
