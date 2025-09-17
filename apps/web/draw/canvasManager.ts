import { HTTP_URL_V1 } from "@repo/common/config";
import axios from "axios";
import { Point, Rect, Shapes } from "./types";
import { getClientSideCookie } from "@lib/getCookie";
import { MessageCommand, ParsedMessageType } from "ws-backend/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket, router: AppRouterInstance) {
    console.log('constructor gets called...!');

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
    this.init();
    this.handleWs();
    this.getExistingShapes();
  }

  public addEventListeners() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHanbler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

  mouseDownHandler(e: MouseEvent) {
    e.preventDefault();
    this.clicked = true;
    console.log(this.clicked);

    this.start.x = e.clientX;
    this.start.y = e.clientY;
  }

  mouseUpHanbler(e: MouseEvent) {
    e.preventDefault();
    this.clicked = false;
    const width = e.clientX - this.start.x;
    const height = e.clientY - this.start.y;
    const shape: Shapes = {
      type: "rect",
      startX: this.start.x,
      startY: this.start.y,
      width: width,
      height: height
    }
    this.addShape(shape);
  }

  mouseMoveHandler(e: MouseEvent) {
    e.preventDefault();
    console.log(this.clicked);

    if (!this.clicked) return;
    const width = e.clientX - this.start.x;
    const height = e.clientY - this.start.y;
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.lineWidth = 2;
    this.clearCanvas();
    this.ctx.strokeRect(this.start.x, this.start.y, width, height);
  }

  public cleanUp() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHanbler);
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
          console.log("message received");

          const message = ev.data;
          console.log(message, typeof message);
          // handle the broadcast:
          const shape: Rect = JSON.parse(message);
          console.log(shape);
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

  public init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    window.onresize = (e: UIEvent) => {
      e.preventDefault();
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.clearCanvas();
    }
  }

  public async getExistingShapes() {
    try {
      const response = await axios.get(`${HTTP_URL_V1}/room/chats/${this.roomId}`, {
        headers: {
          Authorization: this.token
        }
      });
      const messages = response.data.messages;
      console.log(messages, typeof messages);
      const shapes = messages.map((msg: any) => {
        return JSON.parse(msg.message)
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
      this.socket?.send(JSON.stringify({
        "type": "chat",
        "roomId": this.roomId,
        "message": JSON.stringify(shape)
      }))
      console.log("shape is being sent");


      //TODO: push it to the redis queue, in-order to persist the db:

    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async clearCanvas() {
    try {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.shapesInRoom.map((shape) => {
        if (shape.type == "rect") {
          this.ctx.strokeStyle = "#FFFFFF";
          this.ctx.lineWidth = 2;
          this.ctx.strokeRect(shape.startX!, shape.startY!, shape.width!, shape.height!);
        }
        else if (shape.type == "circle") {
          this.ctx.beginPath();
          this.ctx.arc(shape.centreX!, shape.centreY!, shape.radius!, 0, 2 * Math.PI, false);
          this.ctx.strokeStyle = "#FFFFFF";
          this.ctx.lineWidth = 2;
          this.ctx.stroke();
        }
      })

    } catch (error: any) {
      console.error(error.message);
    }
  }

}