import { Request, Response, NextFunction } from "express";

const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }
  next();
};

export default methodNotAllowed;
