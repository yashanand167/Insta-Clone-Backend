import { Router } from "express";
import {
  createPost,
  deletePost,
  editPost,
} from "../controllers/posts.controller";

export const postRouter = Router();

postRouter.post("/createPost", createPost);
postRouter.delete("/deletePost/:id", deletePost);
postRouter.put("/editPost/:id", editPost);
