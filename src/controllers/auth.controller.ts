import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../db/db.connect";
import { registerSchema, loginSchema } from "../utils/userSchema";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const parsedResult = registerSchema.safeParse(req.body);
    if (!parsedResult.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const { username, email, password, firstname, lastname } =
      parsedResult.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "User with email already exists",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const createUser = await prisma.user.create({
      data: {
        email,
        password: hashedpassword,
        username,
        firstname,
        lastname,
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstname: true,
        lastname: true,
      },
    });

    return res.status(200).json({
      message: "User created sucessfully",
      createUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: [error, "Internal Server Error"],
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const parsedResult = loginSchema.safeParse(req.body);
    if (!parsedResult.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const { email, password } = parsedResult.data;

    if (!(email || password)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const findUser = await prisma.user.findUnique({ where: { email } });

    if (!findUser) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { userId: findUser.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, secure: true });

    return res.status(200).json({
      message: "Successfully logged in",
      token,
      email,
    });
  } catch (error) {
    return res.status(500).json({
      message: [error, "Internal Server Error"],
    });
  }
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "Successfully logged out",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
