import { createPostSchema, getPostsSchema, PostId } from "../utils/postSchema";
import { Request, Response } from "express";
import { prisma } from "../db/db.connect";
import { title } from "process";

export const createPost = async (req: Request, res: Response) => {
  try {
    const parsedResult = createPostSchema.safeParse(req.body);

    if (!parsedResult.success) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: parsedResult.error.errors,
      });
    }

    const { user, title, content, photos, video } = parsedResult.data;
    const authorId = user.id;

    const postData = {
      title,
      content,
      authorId,
      photos: photos || undefined,
      video: video || undefined,
    };

    const findUser = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        message: "User not found, can't post anything",
      });
    }

    const createdPost = await prisma.post.create({
      data: postData,
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        photos: true,
        video: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({
      message: "Post created successfully",
      createdPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10);

    if (isNaN(postId)) {
      return res.status(400).json({
        message: "Invalid post id",
      });
    }

    const { title, content } = req.body;

    // Validate input here if needed, e.g., check if title and content are strings

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title, 
        content: content,
      },
    });

    return res.status(200).json({
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id, 10);

    if (isNaN(postId)) {
      return res.status(400).json({
        message: "Invalid post id",
      });
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return res.status(200).json({
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
