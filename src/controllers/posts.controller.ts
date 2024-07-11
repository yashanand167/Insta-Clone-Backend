import { createPostSchema } from "../utils/postSchema";
import { Request, Response } from "express";
import { prisma } from "../db/db.connect";
import { getPostsSchema } from "../utils/postSchema";

export const createPost = async (req: Request, res: Response) => {
  try {
    const parsedResult = createPostSchema.safeParse(req.body);

    if (!parsedResult.success) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }

    const { user, title, content, photos, video } = parsedResult.data;
    const authorId = user.id;

    const postData: any = {
      title,
      content,
      authorId,
    };

    if(photos){
      postData.photos = photos;
    }

    if(video){
      postData.video = video;
    }

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
    });

    return res.status(200).json({
      message: "Post created successfully",
      createdPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    const parsedResult = getPostsSchema.safeParse(req.body);

    if (!parsedResult.success) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }
    const { title, content, photos, video } = parsedResult.data;
    const postId = parseInt(req.params.id, 10);

    if (!postId) {
      return res.status(400).json({
        message: "Invalid post id",
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        photos,
        video,
      },
    });

    return res.status(200).json({
      message: "Post updated",
      updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: [error, "Internal Server Error"],
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);

    if (!postId) {
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
      deletedPost: deletedPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: [error, "Internal Server Error"],
    });
  }
};
