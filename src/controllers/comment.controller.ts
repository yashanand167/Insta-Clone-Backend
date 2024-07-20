import { Request, Response } from "express";
import { prisma } from "../db/db.connect";

export const commentOnPost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10);

    if (!postId) {
      return res.status(400).json({
        message: "Invalid post id",
      });
    }

    const getpost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!getpost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const { content, commentedById } = req.body;

    if (!content) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    if (typeof commentedById !== "number") {
      return res.status(400).json({
        message: "Invalid user Id",
      });
    }

    const addComment = await prisma.comment.create({
      data: {
        content,
        commentedById,
        postId,
      },
    });

    return res.status(200).json({
      message: "Comment added on post",
      addComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.id, 10);

    if (!commentId) {
      return res.status(400).json({
        message: "Invalid comment id",
      });
    }

    const findComment = await prisma.comment.findFirst({
      where: {
        id: commentId,
      },
    });

    if (!findComment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const removeComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    return res.status(200).json({
      message: "Comment deleted successfully",
      removeComment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
