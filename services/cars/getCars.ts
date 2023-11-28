import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TAGS, endpoints } from "..";
import { numberOrNull, singleSpecificationSchema } from "@/schema/others";
import { brandSchema } from "@/schema/server";
import { brandModelSchema } from "./getCarModels";

const attributeSchema = singleSpecificationSchema.extend({
  valueType: z.enum(["boolean", "text"]),
});

export const carSchema = z.object({
  _id: z.string(),

  name: z.string(),

  slug: z.string(),

  description: z.string().optional(),

  brand: z.object({
    id: z.union([z.string(), brandSchema]),
    name: z.string(),
  }),

  brandModel: z.object({
    id: z.union([z.string(), brandModelSchema]),
    name: z.string(),
  }),

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

  posterImage: z.object({
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url(),
  }),

  imageUrls: z.array(z.string()).optional(),

  colors: z
    .array(
      z.object({
        name: z.string(),
        imageUrls: z.array(z.string().url()).optional(),
      })
    )
    .default([]),

  numOfDoors: z.number(),

  price: z.object({
    min: z.number(),
    max: z.number(),
    isNegotiable: z.boolean(),
  }),

  tags: z
    .array(z.object({ value: z.string(), label: z.string(), _id: z.string() }))
    .optional(),

  specificationsByGroup: z
    .array(
      z.object({
        groupName: z.string(),
        values: z.array(attributeSchema).optional(),
      })
    )
    .optional(),

  additionalSpecifications: z.array(attributeSchema).optional(),

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
      cache: "no-store",
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
