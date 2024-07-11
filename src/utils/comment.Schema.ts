import { z } from "zod";
import { getPostsSchema } from "./postSchema";

export const postCommentSchema = z.object({
  Post: getPostsSchema,
  content: z.string().max(100, "Comment can't be more than 100 words"),
});
