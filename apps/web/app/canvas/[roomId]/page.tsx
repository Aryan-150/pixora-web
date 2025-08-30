import Canvas from "../../../ui/components/canvas";

export default function CanvasPage() {
  return (
    <Canvas />
  )
}


// function clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, existingStrokes: Rect[]) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   existingStrokes.map((stroke) => {
//     ctx.strokeStyle = "#FFFFFF";
//     ctx.lineWidth = 2;
//     ctx.strokeRect(stroke.x, stroke.y, stroke.w, stroke.h);
//   })
// }