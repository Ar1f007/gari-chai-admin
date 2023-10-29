import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TAGS, endpoints } from "..";

export const carSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  name: z.string(),

  year: z.number(),
  registrationYear: z.number(),
  description: z.string().optional(),
  brand: z.object({
    name: z.string(),
    slug: z.string(),
  }),
  modelNumber: z.number(),

  mileage: z.number(),
  imageUrls: z.array(z.string().url()).optional(),
  color: z.string(),
  baseInteriorColor: z.string(),
  numberOfDoors: z.number(),

  engine: z.object({
    type: z.string(),
    displacement: z.number(),
    horsePower: z.number(),
    torque: z.number(),
  }),

  transmission: z.string(),
  bodyStyle: z.string(),
  fuel: z.object({
    type: z.string(),
    economy: z.object({
      city: z.number(),
      highway: z.number(),
    }),
  }),
  acceleration: z.object({
    zeroTo60: z.number(),
    topSpeed: z.number(),
  }),
  safetyFeatures: z.string(),
  infotainmentSystem: z.string(),

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
