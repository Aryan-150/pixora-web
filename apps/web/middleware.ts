import { NextRequest, NextResponse } from "next/server";

export default function Middleware(request: NextRequest) {
  console.log("middleware called ..!");
  console.log(request.nextUrl);
  
  try {
    if(!request.cookies.has("token")){
      throw new Error("Access denied ...!");
    }
    if(request.nextUrl.pathname.startsWith("/canvas")){
      const segments = request.nextUrl.pathname.split("/");
      if(segments.length === 3){
        const roomId = segments[2];
        if(!roomId?.trim()) throw new Error("pls give correct roomId...!");
        if(!request.cookies.has("roomId")) throw new Error("cookie error...!");
        
        const roomIdFromCookie = request.cookies.get("roomId");
        if(!roomIdFromCookie) throw new Error("cookie access error...!");
        const match = roomId == roomIdFromCookie.value;
        if(!match) throw new Error("give roomId doesn't match with the cookie...!");
        // more checks needed, and also may be a better way:
        
      }
    }
    return NextResponse.next();
    
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.redirect(`${request.nextUrl.origin}/signin`);
  }
}

export const config = {
  matcher: '/canvas/:path?'
}