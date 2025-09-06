import { HTTP_URL_V1, WS_URL } from "@repo/common/config";
import axios from "axios";
import { Rect, Shapes } from "./types";
import { getClientSideCookie } from "@lib/getCookie";
// import { prisma } from "@repo/database/client";
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

  constructor(canvas: HTMLCanvasElement, roomId: string, token: string, router: AppRouterInstance) {
    this.shapesInRoom = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.roomId = roomId;
    this.token = token;
    this.router = router;
    this.socket = this.connectWs();
    this.init();
    this.getExistingShapes();
  }

  private connectWs() {
    const ws = new WebSocket(WS_URL, this.token);

    ws.onopen = async () => {
      try {
        console.log('connection with ws established...!');

        const roomId = getClientSideCookie("roomId");
        if (!roomId) throw new Error("unautharized room access ...!");
        const resposne = await axios.get(`${HTTP_URL_V1}/room/chats/${roomId}`, {
          headers: {
            Authorization: this.token
          }
        });
        const messages = resposne.data.messages;
        console.log(messages, typeof (messages));

        const joinRoomMsgObj: ParsedMessageType = {
          type: MessageCommand.joinRoom,
          roomId: roomId
        }
        ws.send(JSON.stringify(joinRoomMsgObj));

        ws.onmessage = (ev: MessageEvent) => {
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
        ws.close();
        this.router.push("/canvas");
      }
    }
    return ws;
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
      console.log(shapes);
      
      //
      this.shapesInRoom = [...this.shapesInRoom, ...shapes];
      console.log(this.shapesInRoom);
      this.clearCanvas();

    } catch (error: any) {
      console.error(error.message);
    }

  }

  public async addShape(shape: Shapes) {
    try {
      // push it to the in-memory state:
      // this.shapesInRoom.push(shape);
      // console.log(this.shapesInRoom);
      // this.clearCanvas();
      // send to the ws be:
      this.socket?.send(JSON.stringify({
        "type": "chat",
        "roomId": this.roomId,
        "message": JSON.stringify(shape)
      }))

      // not optimal, only for testing:
      // const userId = getClientSideCookie("userId");
      // if (!userId) throw new Error("userId cookie not found...!");
      // await prisma.stroke.create({
      //   data: {
      //     message: JSON.stringify(shape),
      //     userId: userId,
      //     roomId: this.roomId
      //   }
      // })

      //TODO: push it to the redis queue, in-order to persist the db:

    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async clearCanvas() {
    try {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.shapesInRoom.map((shape) => {
        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(shape.x, shape.y, shape.w, shape.h);
      })

    } catch (error: any) {
      console.error(error.message);
    }
  }

}