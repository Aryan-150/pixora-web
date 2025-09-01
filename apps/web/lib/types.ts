export interface Options {
  shapeId: string;
  shape: ShapeTypeEnum;
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

export enum ShapeTypeEnum {
  line = "line",
  rect = "rect",
  circle = "circle"
}

export type Shapes = ShapeRect

export interface ShapeRect extends Options {
  startX: number;
  startY: number;
  width: number;
  height: number;
}