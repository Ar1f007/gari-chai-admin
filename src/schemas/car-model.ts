import { z } from "zod";

export const carModelSchema = z.object({
  brand: z.object(
    {
      value: z.string().min(1, "Select a brand first"),
      label: z.string().min(1, "Select a brand first"),
    },
    { required_error: "required", invalid_type_error: "select a brand" }
  ),
  model: z.string().min(1, "required"),
  upcoming: z.boolean().default(false),
});

export type CarModelInputs = z.infer<typeof carModelSchema>;
