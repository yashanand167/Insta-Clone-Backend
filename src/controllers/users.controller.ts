import { prisma } from "../db/db.connect";
import { Request, Response } from "express";
import { userdetailsSchema } from "../utils/userSchema";

import dotenv from "dotenv";
dotenv.config();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const parsedResult = userdetailsSchema.safeParse(req.body);

    if (!parsedResult.success) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }

    const { id } = parsedResult.data;

    const findUser = await prisma.user.findMany({
      where: {
        id: id,
      },
      include: {
        followedBy: {
          include: {
            follower: true,
          },
        },
        follows: {
          include: {
            following: true,
          },
        },
      },
    });

    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const userDetails = findUser.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      profile_pic: user.profile_pic || null,
      userBio: user.userBio || null,
      followedBy: user.followedBy,
      follows: user.follows,
    }));

    return res.status(200).json({
      message: "User Found",
      user: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: [error, "Internal Server Error"],
    });
  }
};

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const parsedResult = userdetailsSchema.safeParse(req.body);

    if (!parsedResult.success) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    const { id, ...updateData } = parsedResult.data;
    const findUser = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: findUser.id },
      data: updateData,
    });

    return res.status(200).json({
      message: "User details updated successfully",
      updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      message: [error, "Internal Server Error"],
    });
  }
};
