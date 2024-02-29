import { z } from "zod";
import { userBasicInfoAPIResponseSchema } from "./user";

// this is the shape of review getting from api
const carReviewBody = z.object({
  _id: z.string(),
  title: z.string(),
  review: z.string(),
  rating: z.number(),
  userId: z.string(),
  carId: z.string(),
  isFeatured: z.boolean().optional(),
  helpfulCount: z.number().optional(),
  unhelpfulCount: z.number().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const carReviewSchema = carReviewBody;

export type TCarsReview = z.infer<typeof carReviewSchema>;
