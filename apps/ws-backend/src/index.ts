import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common";
import { RoomManager } from "./roomManager";
import { MessageCommand, type ParsedMessageType, type TokenValidatorReturnType } from "./types";
import { main } from "./worker";

const wss = new WebSocketServer({ port: 8081 });
main();

// decode the token and return the userId:
function tokenValidator(token: string): TokenValidatorReturnType {
  if(!token){
    return {
      success: false,
      error: "token not found...!"
    }
  }

  const decodedInfo = jwt.verify(token, JWT_SECRET);
  if(!decodedInfo || typeof decodedInfo === "string" || !decodedInfo.id){
    return {
      success: false,
      error: "token verification failed ..!"
    }
  }

  return {
    success: true,
    data: decodedInfo.id
  };
}

wss.on("connection", async (ws, request) => {
  try {
    const token = request.headers["sec-websocket-protocol"];
    if(!token)  throw new Error("auth protocol not received...!");

    const { success, data, error } = tokenValidator(token);
    if(!success){
      throw new Error(error);
    }
    if(!data) throw new Error("userId not found...!");

    const userId = data;
    console.log(userId);
    
    const roomManager = RoomManager.getInstance();
    ws.on("message", (data) => {
      const message = data.toString();
      if(message.trim() == ""){
        return new Error("The message is empty ...!")
      }

      const parsedMessage: ParsedMessageType = JSON.parse(message);
      if(parsedMessage.type === MessageCommand.joinRoom){
        roomManager.joinRoom(parsedMessage.roomId,userId,ws);
      }

      if(parsedMessage.type === MessageCommand.leaveRoom){
        roomManager.leaveRoom(parsedMessage.roomId,userId, ws);
      }

      if(parsedMessage.type === MessageCommand.chat){
        roomManager.sendMessage(parsedMessage.roomId, userId, parsedMessage.message || "");
      }
    })
    
  } catch (error: any) {
    console.error(error.message);
    ws.close();
    console.error("connection closed...!");
    return;
  }
})

