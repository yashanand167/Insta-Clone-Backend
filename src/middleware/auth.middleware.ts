import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export interface AuthRequest extends Request {
  user?: { userId: string };
}

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "Server error: missing secret" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded as { userId: string };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" }); 
  }
};
