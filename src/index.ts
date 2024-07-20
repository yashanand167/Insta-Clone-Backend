import express from "express";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import userRouter from "./routes/users.route";
import { postRouter } from "./routes/posts.route";
import { commentRoute } from "./routes/comment.route";
import cors from "cors";
import helmet from "helmet";
dotenv.config();

const app = express();
const port = process.env.PORT ?? 5000;

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);
app.use("/api/v1", commentRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Connection Successful",
  });
});

app.listen(port, () => {
  console.log(`Server is up and listening on http://localhost:${port}`);
});
