import { HTTP_URL_V1 } from "@repo/common/config";
import axios from "axios";
import { Shapes } from "./types";

export class CanvasManager {
  private static instance: CanvasManager;
  private shapesInRoom: Map<string, Shapes[]>; 

  private constructor() {
    this.shapesInRoom = new Map();
  }

  public static getInstance() {
    if(!CanvasManager.instance){
      CanvasManager.instance = new CanvasManager();
    }
    return CanvasManager.instance;
  }

  public async getExistingShapes(roomId: string) {
    const resposne = await axios.get(`${HTTP_URL_V1}/room/chats/${roomId}`);
    const messages = resposne.data.messages;

    try {
      if(!this.shapesInRoom.get(roomId)){
        
      }
      
    } catch (error) {
      
    }

  }
}