import { error } from "console";
import { prisma } from "../db/db.connect";
import { Request, Response } from "express";

export const likePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10);

    if (!postId) {
      return res.status(400).json({
        message: "Invalid post id",
        error,
      });
    }

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
