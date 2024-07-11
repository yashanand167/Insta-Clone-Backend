import { z } from "zod";
import { userdetailsSchema } from "./userSchema";

export const createPostSchema = z
  .object({
    user: userdetailsSchema,
    title: z.string().min(1, "Title is required"),
    content: z.string().optional(),
    photos: z.string().url().nullable().optional(),
    video: z.string().url().nullable().optional(),
  })
  .refine((data) => data.photos || data.video, {
    message: "At least one of photos or video must be provided",
    path: ["photos", "video"],
  });

export const getPostsSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  photos: z.string().url().optional(),
  video: z.string().url().optional(),
});
