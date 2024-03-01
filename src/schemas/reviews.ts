import { z } from "zod";

// this is the shape of review getting from api
export const carReviewSchema = z.object({
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
  status: z.enum(["pending", "approved", "discard"]),
  reviewType: z.string(),
  discardReason: z.string(),

  metaData: z.record(z.string().min(1), z.unknown()).optional().default({}),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TCarsReview = z.infer<typeof carReviewSchema>;
