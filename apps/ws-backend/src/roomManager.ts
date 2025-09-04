import type WebSocket from "ws";
import { createClient } from "redis";
import { REDIS_ARG } from "@repo/common/redisArg";
import { MessageCommand, type Room } from "./types";

export class RoomManager {
  private static instance: RoomManager;
  private rooms: Record<string, Room>;
  private redisClient: ReturnType<typeof createClient>;
  
  private constructor(){
    this.rooms = {};
    this.redisClient = createClient();
    this.connectRedis(this.redisClient);
  }

  private async connectRedis(client: ReturnType<typeof createClient>) {
    try {
      await client.connect();
      console.log('connected to the redis...!');
    } catch (error) {
        console.log('error while connecting to the redis, pls try again..!');
    }
  }

  public static getInstance(){
    if(!RoomManager.instance){
      RoomManager.instance = new RoomManager();
    }
    return RoomManager.instance;
  }

  public async joinRoom(roomId: string, userId: string, socket: WebSocket) {
    try {
      if(!this.rooms[roomId]){
        this.rooms[roomId] = {
          sockets: [],
          messages: []
        }
      }
      // if user already in the room:
      const user = this.rooms[roomId].sockets.find((user) => user.userId === userId);
      if(user){
        user.socket = socket;
        throw new Error("user already exists, updated the socket instance only...!");
      }

      // push it to the in-memory attribute:
      this.rooms[roomId].sockets.push({
        userId: userId,
        socket: socket
      })
      console.log(this.rooms[roomId]);

      // push it to the redis queue:
      await this.redisClient.lPush(REDIS_ARG, JSON.stringify({
        type: MessageCommand.joinRoom,
        userId: userId,
        roomId: roomId
      }));

    } catch (error: any) {
      console.log(error.message);
      console.log(this.rooms[roomId]);
    }
  }

  public async sendMessage(roomId: string, userId: string, message: string) {
    try {
      if(!this.rooms[roomId]) throw new Error(`room with roomId: ${roomId} does not exists...!`);
      if(!message || message.trim() == "") throw new Error("message is empty...!");

      this.rooms[roomId].messages.push(message);  // may or may not be as useful, we'll see...
      await this.redisClient.lPush(REDIS_ARG, JSON.stringify({
        type: MessageCommand.chat,
        userId: userId,
        roomId: roomId,
        message: message
      }))
      this.rooms[roomId].sockets.forEach((s) => {
        s.socket.send(message);
      })

    } catch (error: any) {
      console.error(error.toString());
    }
  }

  public async leaveRoom(roomId: string, userId: string, socket: WebSocket) {

    try {
      if(!this.rooms[roomId])  throw new Error(`room with roomId: ${roomId} does not exists...!`);

      this.rooms[roomId].sockets = this.rooms[roomId].sockets.filter(s => s.userId !== userId && s.socket !== socket);

      await this.redisClient.lPush(REDIS_ARG, JSON.stringify({
        type: MessageCommand.leaveRoom,
        userId: userId,
        roomId: roomId
      }))

    } catch (error: any) {
      console.error(error.toString());
    }
  }

}