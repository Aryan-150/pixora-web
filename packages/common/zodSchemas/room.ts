import { z } from "zod";

export const RoomSchema = z.object({
  roomName: z.string()
    .min(5, 'room name must be at least of 5 characters')
    .max(200, 'room name must be less than 200 characters')
})