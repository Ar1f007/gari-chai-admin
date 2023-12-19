import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TAGS, endpoints } from "..";
import { numberOrNull, singleSpecificationSchema } from "@/schema/others";
import { brandSchema } from "@/schema/server";
import { brandModelSchema } from "./getCarModels";
import { TPagination } from "@/types/others";
import { carBodyStylesSchema } from "@/schemas/car-body-style";

const attributeSchema = singleSpecificationSchema.extend({
  valueType: z.enum(["boolean", "text"]),
});

export const carSchema = z.object({
  _id: z.string(),

  name: z.string(),

  slug: z.string(),

  description: z.string().optional(),

  brand: z.object({
    id: z.union([z.string(), brandSchema, z.null()]),
    name: z.string(),
  }),

  brandModel: z.object({
    id: z.union([z.string(), brandModelSchema, z.null()]),
    name: z.string(),
  }),

  transmission: z.string(),

  bodyStyle: z.object({
    id: z.union([z.string(), carBodyStylesSchema, z.null()]),
    name: z.string(),
  }),

  fuel: z.object({
    typeInfo: z.object({
      type: z.string(),
      fullForm: z.string(),
    }),
  }),

  posterImage: z.object({
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url().optional(),
  }),

  imageUrls: z.array(z.string()).optional(),

  videoUrls: z
    .array(
      z.object({
        thumbnailUrl: z.string().url().optional(),
        url: z.string().url(),
      })
    )
    .optional()
    .default([]),

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

  carType: z.enum(["new", "used"]),

  launchedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),

  status: z.enum(["available", "sold", "reserved"]).optional(),
  soldAt: z.string().optional(),
  cities: z.array(z.string()).optional(),
});

const carsDataSchema = z.array(carSchema);

export type TCarSchema = z.infer<typeof carSchema>;

type GetCarsResponseData = {
  results: TCarSchema[];
  pagination: TPagination;
};

export async function getCars(queryParams?: string) {
  try {
    const baseUrl = endpoints.api.cars.getCars;
    const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;

    const res = await apiFetch<GetCarsResponseData>(url, {
      method: ReqMethod.GET,
      next: {
        tags: [TAGS.cars],
      },
      cache: "no-store",
    });

    if (res.status === "success") {
      const parsedData = carsDataSchema.safeParse(res.data.results);

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
