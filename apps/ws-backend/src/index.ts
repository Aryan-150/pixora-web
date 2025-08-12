import { WebSocketServer } from "ws";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common";

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", (ws, request) => {

  try {
    const url = request.url;
    if(!url)  throw new Error("url not received ...!");
    
    // extracting the query params form the url:
    const queryParams = new URLSearchParams(url.split("?")[1]);
    console.log(queryParams);
    const token = queryParams.get("token");
    if(!token) throw new Error("token not found...!");
    

    const decodedInfo = jwt.verify(token,JWT_SECRET) as JwtPayload;
    if(!decodedInfo || !decodedInfo.id) throw new Error("token verification failled ...!");
    
    
    ws.on("message", (data, isBinary) => {
      const message = data.toString();
   
      if(message == "ping")
        ws.send("pong")
      else
        ws.send(message)
    })
    
  } catch (error) {
    console.log(error);
    ws.close();
    return;
  }
})