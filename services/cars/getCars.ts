import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TAGS, endpoints } from "..";
import { numberOrNull } from "@/schema/others";

export const carSchema = z.object({
  _id: z.string(),

  name: z.string(),

  slug: z.string(),

  description: z.string().optional(),

  brand: z.string(),

  brandModel: z.string(),

  engine: z.object({
    type: z.string(),
    numOfCylinders: numberOrNull,
    horsePower: numberOrNull,
    torque: numberOrNull,
  }),

  transmission: z.string(),

  bodyStyle: z.string(),

  fuel: z.object({
    typeInfo: z.object({
      type: z.string(),
      fullForm: z.string(),
    }),
    economy: z.object({ city: numberOrNull, highway: numberOrNull }),
  }),

  acceleration: z.object({
    zeroTo60: numberOrNull,
    topSpeed: numberOrNull,
  }),

  mileage: z.number(),

  posterImage: z.object({
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url(),
  }),

  imageUrls: z.array(z.string()).optional(),
  color: z.string(),

  baseInteriorColor: z.string(),

  numOfDoors: z.number(),

  price: z.object({
    min: z.number(),
    max: z.number(),
    isNegotiable: z.boolean(),
  }),

  tags: z
    .array(z.object({ value: z.string(), label: z.string(), _id: z.string() }))
    .optional(),

  launchedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const carsDataSchema = z.array(carSchema);

export type TCarSchema = z.infer<typeof carSchema>;

export async function getCars(queryParams?: string) {
  try {
    const baseUrl = endpoints.api.cars.getCars;
    const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,
      next: {
        tags: [TAGS.cars],
      },
    });

    if (res.status === "success") {
      const parsedData = carsDataSchema.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }

      throw new Error("Cars data missing");
    }

    return undefined;
  } catch (e) {
    return undefined;
  }
}
