// Client-safe configuration (no Node.js modules)
export const HTTP_URL = process.env.NEXT_PUBLIC_HTTP_URL || "http://localhost:8080";
export const HTTP_URL_V1 = process.env.NEXT_PUBLIC_HTTP_URL || "http://localhost:8080/api/v1";
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8081";