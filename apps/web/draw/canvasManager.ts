import { HTTP_URL_V1 } from "@repo/common/config";
import axios from "axios";
import { Point, selectedTooltype, Shapes } from "./types";
import { getClientSideCookie } from "@lib/getCookie";
import { MessageCommand, ParsedMessageType } from "ws-backend/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { StrokeType } from "@repo/database/client";

export class CanvasManager {
  private shapesInRoom: Shapes[];
  private roomId: string;
  private token: string;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private socket: WebSocket;
  private router: AppRouterInstance;

  private clicked: boolean;
  private start: Point;
  public selectedTool: selectedTooltype;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket, router: AppRouterInstance) {
    this.shapesInRoom = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    const token = getClientSideCookie("token");
    this.token = token;
    this.socket = socket;
    this.router = router;

    this.clicked = false;
    this.start = { x: 0, y: 0 };
    this.selectedTool = selectedTooltype.Select;
    this.init();
    this.handleWs();
    this.getExistingShapes();
    this.addEventListeners();
  }

  private init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    window.onresize = (e: UIEvent) => {
      e.preventDefault();
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.clearCanvas();
    }
    document.addEventListener("visibilitychange", (e) => {
      e.preventDefault();
      if (document.visibilityState == "hidden") {
        console.log("hidden");
      }
      if (document.visibilityState == "visible") {
        console.log("visible");
      }
    })
  }

  public addEventListeners() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

  mouseDownHandler = (e: MouseEvent) => {
    e.preventDefault();
    this.clearCanvas();
    this.clicked = true;
    this.start.x = e.offsetX;
    this.start.y = e.offsetY;
  }

  mouseUpHandler = (e: MouseEvent) => {
    e.preventDefault();
    this.clicked = false;
    const width = e.offsetX - this.start.x;
    const height = e.offsetY - this.start.y;
    let shape: Shapes | null = null;
    switch (this.selectedTool) {
      case selectedTooltype.Rect:
        shape = {
          type: StrokeType.rect,
          startX: this.start.x,
          startY: this.start.y,
          width: width,
          height: height
        }
        break;

      case selectedTooltype.Line:
        let endX = e.offsetX;
        let endY = e.offsetY;
        shape = {
          type: StrokeType.line,
          startX: this.start.x,
          startY: this.start.y,
          endX: endX,
          endY: endY
        }
        break;

      case selectedTooltype.Ellipse:
        const radiusX = Math.abs(e.offsetX - this.start.x) / 2;
        const radiusY = Math.abs(e.offsetY - this.start.y) / 2;
        const ellipseCenterX = (e.offsetX + this.start.x) / 2;
        const ellipseCenterY = (e.offsetY + this.start.y) / 2;
        shape = {
          type: StrokeType.ellipse,
          centerX: ellipseCenterX,
          centerY: ellipseCenterY,
          radiusX: radiusX,
          radiusY: radiusY
        }
        break;

      case selectedTooltype.Arrow:
        const dx = e.offsetX - this.start.x;
        const dy = e.offsetY - this.start.y;
        const headlen = (Math.sqrt(dx * dx + dy * dy) * 0.3) < 15 ? (Math.sqrt(dx * dx + dy * dy) * 0.3) : 15;
        const angle = Math.atan2(dy, dx);

        shape = {
          type: StrokeType.arrow,
          startX: this.start.x,
          startY: this.start.y,
          endX: e.offsetX,
          endY: e.offsetY,
          dx: dx,
          dy: dy,
          headlen: headlen,
          angle: angle
        }
        break;

      default:
        break;
    }
    if (shape) {
      this.addShape(shape);
    } else {
      console.log("The shape is null");
    }
  }

  mouseMoveHandler = (e: MouseEvent) => {
    e.preventDefault();
    if (!this.clicked) return;
    const width = e.offsetX - this.start.x;
    const height = e.offsetY - this.start.y;
    switch (this.selectedTool) {
      case selectedTooltype.Rect:
        console.log("hii there form rect");

        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.lineWidth = 2;
        this.clearCanvas();
        this.ctx.strokeRect(this.start.x, this.start.y, width, height);
        break;

      case selectedTooltype.Line:
        this.clearCanvas();
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x, this.start.y);
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        break;

      case selectedTooltype.Ellipse:
        let radiusX = Math.abs(e.offsetX - this.start.x) / 2;
        let radiusY = Math.abs(e.offsetY - this.start.y) / 2;
        const ellipseCenterX = (e.offsetX + this.start.x) / 2;
        const ellipseCenterY = (e.offsetY + this.start.y) / 2;
        this.clearCanvas();
        this.ctx.beginPath();
        this.ctx.ellipse(ellipseCenterX, ellipseCenterY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        break;

      case selectedTooltype.Arrow:
        const dx = e.offsetX - this.start.x;
        const dy = e.offsetY - this.start.y;

        const headlen = (Math.sqrt(dx * dx + dy * dy) * 0.3) < 15 ? (Math.sqrt(dx * dx + dy * dy) * 0.3) : 15;
        const angle = Math.atan2(dy, dx);

        this.clearCanvas();
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.start.x, this.start.y);
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(
          e.offsetX - headlen * Math.cos(angle - Math.PI / 6),
          e.offsetY - headlen * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.lineTo(
          e.offsetX - headlen * Math.cos(angle + Math.PI / 6),
          e.offsetY - headlen * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.stroke();

      default:
        break;
    }
  }

  public cleanUp() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  private handleWs() {
    this.socket.onopen = async (e) => {
      e.preventDefault();
      try {
        console.log('connection with ws established...!');
        const joinRoomMsgObj: ParsedMessageType = {
          type: MessageCommand.joinRoom,
          roomId: this.roomId
        }
        this.socket.send(JSON.stringify(joinRoomMsgObj));
        console.log("joined the room");

        this.socket.onmessage = (ev: MessageEvent) => {
          ev.preventDefault();
          const message = ev.data;
          console.log(message);

          // handle the broadcast:
          const shape: Shapes = JSON.parse(message);
          this.shapesInRoom.push(shape);
          console.log(this.shapesInRoom);
          this.clearCanvas();
        }

      } catch (error: any) {
        console.error(error.message);
        this.socket.close();
        this.router.push("/canvas");
      }
    }
  }

  public async getExistingShapes() {
    try {
      const response = await axios.get(`${HTTP_URL_V1}/room/chats/${this.roomId}`, {
        headers: {
          Authorization: this.token
        }
      });
      const strokes = response.data.strokes;
      const shapes = strokes.map((msg: any) => {
        let shape: Shapes | null = null;
        switch (msg.type) {
          case StrokeType.rect:
            shape = {
              type: StrokeType.rect,
              startX: msg.rect.startX,
              startY: msg.rect.startY,
              width: msg.rect.width,
              height: msg.rect.height
            }
            break;
          case StrokeType.line:
            shape = {
              type: StrokeType.line,
              startX: msg.line.startX,
              startY: msg.line.startY,
              endX: msg.line.endX,
              endY: msg.line.endY
            }
            break;

          case StrokeType.ellipse:
            shape = {
              type: StrokeType.ellipse,
              centerX: msg.ellipse.centerX,
              centerY: msg.ellipse.centerY,
              radiusX: msg.ellipse.radiusX,
              radiusY: msg.ellipse.radiusY
            }
            break;

          case StrokeType.arrow:
            shape = {
              type: StrokeType.arrow,
              startX: msg.arrow.startX,
              startY: msg.arrow.startY,
              endX: msg.arrow.endX,
              endY: msg.arrow.endY,
              dx: msg.arrow.dx,
              dy: msg.arrow.dy,
              headlen: msg.arrow.headlen,
              angle: msg.arrow.angle
            }
            break;

          default:
            console.error("Invalid shape");
            break;
        }

        return shape;
      })

      this.shapesInRoom = [...this.shapesInRoom, ...shapes];
      console.log(this.shapesInRoom);
      this.clearCanvas();

    } catch (error: any) {
      console.error(error.message);
    }

  }

  public async addShape(shape: Shapes) {
    try {
      console.log(shape);
      this.socket?.send(JSON.stringify({
        "type": "chat",
        "roomId": this.roomId,
        "message": JSON.stringify(shape)
      }))
      console.log("shape is being sent");

    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async clearCanvas() {
    try {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.shapesInRoom.map((shape) => {
        switch (shape.type) {
          case StrokeType.rect:
            this.ctx.strokeStyle = "#FFFFFF";
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(shape.startX!, shape.startY!, shape.width!, shape.height!);
            break;
          case StrokeType.line:
            this.ctx.beginPath();
            this.ctx.moveTo(shape.startX!, shape.startY!);
            this.ctx.lineTo(shape.endX!, shape.endY!);
            this.ctx.strokeStyle = "#FFFFFF"
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            break;
          case selectedTooltype.Ellipse:
            this.ctx.beginPath();
            this.ctx.ellipse(shape.centerX!, shape.centerY!, shape.radiusX!, shape.radiusY!, 0, 0, 2 * Math.PI);
            this.ctx.strokeStyle = "#FFFFFF";
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            break;
          case selectedTooltype.Arrow:
            this.ctx.strokeStyle = "#FFFFFF";
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(shape.startX!, shape.startY!);
            this.ctx.lineTo(shape.endX!, shape.endY!);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(
              shape.endX! - shape.headlen! * Math.cos(shape.angle! - Math.PI / 6),
              shape.endY! - shape.headlen! * Math.sin(shape.angle! - Math.PI / 6)
            );
            this.ctx.lineTo(shape.endX!, shape.endY!);
            this.ctx.lineTo(
              shape.endX! - shape.headlen! * Math.cos(shape.angle! + Math.PI / 6),
              shape.endY! - shape.headlen! * Math.sin(shape.angle! + Math.PI / 6)
            );
            this.ctx.stroke();
            break;

          default:
            break;
        }
      })

    } catch (error: any) {
      console.error(error.message);
    }
  }

}

