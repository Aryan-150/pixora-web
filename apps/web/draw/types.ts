import { StrokeType } from "@repo/database/client";

export type Point = {
  x: number;
  y: number;
};

interface DefaultOptions {
  type: StrokeType,
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  width?: number;
  height?: number;
  centerX?: number;
  centerY?: number;
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  dx?: number;
  dy?: number;
  headlen?: number;
  angle?: number;
}

export type Shapes = DefaultOptions;

export enum selectedTooltype {
  Select = "select",
  Rect = "rect",
  Ellipse = "ellipse",
  Arrow = "arrow",
  Line = "line",
  Pencil = "pencil",
  Eraser = "eraser"
}


/**
 * Todo: better types handling
 * 
 * export type Line = {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
};
export type Rect = {
  startX?: number;
  startY?: number;
  width?: number;
  height?: number;
};
export type Circle = {
  centerX?: number;
  centerY?: number;
  radius?: number;
};
export type Ellipse = {
  centerX?: number;
  centerY?: number;
  radiusX?: number;
  radiusY?: number;
};
export type RightArrow = Line & {
  dx?: number;
  dy?: number;
  headLen?: number;
  angle?: number;
}

export type AltShape = Line & Circle & Rect;

type Shape2 = AltShape & {
  type: StrokeType;
};

 * 
 */


