import express from "express";
import cors from "cors";
import { mainRouter } from "./routes/mainRouter";

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(PORT, () => {
  console.log(`server is listening at port: ${PORT}`);
})