import { z } from "zod";
import { getPostsSchema } from "./postSchema";
import { userdetailsSchema } from "./userSchema";

export const postCommentSchema = z.object({
  post: getPostsSchema,
  content: z.string().max(100, "Comment can't be more than 100 words"),
  postId: z.number(),
  commentedBy: userdetailsSchema,
});
