import { Router } from "express";
import {
  commentOnPost,
  deleteComment,
} from "../controllers/comment.controller";

export const commentRoute = Router();

commentRoute.post("/postComment/:id", commentOnPost);
commentRoute.delete("/comment/:id", deleteComment);
