import { z } from "zod";

const addPart = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price is required"),
  stock: z
    .string()
    .min(1, "Please specify how many you have available in stock"),
  status: z.boolean().default(true),
  warranty: z.string().optional(),
  manufacturer: z.string().optional(),
  description: z.string().optional(),
  posterImage: z.instanceof(File, { message: "Image is required" }),
  imageUrls: z.array(z.string()).optional(),
});
