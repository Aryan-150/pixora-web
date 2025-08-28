import type WebSocket from "ws";

export type TokenValidatorReturnType = {
  success: boolean;
  data?: string;
  error?: string;
}

export type ParsedMessageType = {
  type: MessageCommand;
  roomId: string;
  message?: string;
}

export enum MessageCommand {
  joinRoom = "join-room",
  chat = "chat",
  leaveRoom = "leave-room"
}

export interface UserWs {
  userId: string;
  socket: WebSocket;
}

export interface Room {
  sockets: UserWs[];
  messages: string[];
}

export type RedisInput = {
  type: MessageCommand;
  userId: string;
  roomId: string;
  message?: string;
}
