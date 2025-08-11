import express from "express";
import { prisma } from "@repo/database/client";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/users", async(req,res) => {
  try {
    // db call:
    const users = await prisma.user.findMany();

    res.json({
      users: users
    })
  } catch (error) {
    res.status(411).json({
      error: error
    })
  }
})

app.listen(PORT, () => {
  console.log(`server is listening at port: ${PORT}`);
})