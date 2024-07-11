import { Router } from "express";
import { createPost } from "../controllers/posts.controller";

export const postRouter = Router();

postRouter.post('/createPost',createPost);