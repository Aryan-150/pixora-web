import { Router } from "express";
import { signupSchema, signinSchema } from "@repo/common/schema";
import { prisma } from "@repo/database/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common";
import userMiddleware from "../middlewares/userMiddleware";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { success, error } = signupSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      msg: error.message
    });
    return;
  }

  try {
    const { username, email, password } = req.body;

    // Check username
    const existingUsername = await prisma.user.findUnique({
      where: {
        username: username
      }
    });


    // Check email
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existingUsername || existingEmail) {
      return res.status(400).json({
        msg: existingUsername ? "Username already taken" : "Email already registered"
      });
    }

    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password
      }
    })
    res.json({
      msg: "signup completed...!"
    })
  } catch (error) {
    res.status(500).json({
      msg: error
    });
  }

})

userRouter.post("/signin", async (req, res) => {
  const { success, error } = signinSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      msg: error.message
    });
    return;
  }

  try {
    const { email, password } = req.body;

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if(!userWithEmail) throw new Error("user with given email does not exists...!");
    const passwordMatch = userWithEmail.password === password;
    if(!passwordMatch) throw new Error("incorrect password...!");

    // create a jwt:
    const userJwtToken = jwt.sign({
      id: userWithEmail.id
    }, JWT_SECRET);
    
    res.json({
      msg: "signin completed...!",
      token: userJwtToken
    })
  } catch (error) {
    res.status(500).json({
      msg: error
    })
  }  
})

userRouter.post("/create-room",userMiddleware, async (req, res) => {
  const userId = req.userId;

  res.json({
    msg: "create room endpoint",
    userId: userId
  })
})