import { z } from "zod";
import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, brandSchema, endpoints, getCookie } from "..";
import {
  fuelTypeSchema,
  imageSchema,
  singleSpecificationSchema,
} from "@/schemas/utils";
import { TPagination } from "@/types/others";
import { carBodyStylesSchema } from "@/schemas/car-body-style";
import { carModelSchema } from "@/schemas/car-model";
import { vendorSchema } from "@/schemas/vendor";

const attributeSchema = singleSpecificationSchema.extend({
  valueType: z.object({
    value: z.enum(["boolean", "text"]),
    label: z.string(),
  }),
});

export const carSchema = z.object({
  _id: z.string(),

  name: z.string(),

  slug: z.string(),

  vendor: z.object({
    value: z.union([z.string(), vendorSchema, z.null()]),
    label: z.string(),
  }),

  brand: z.object({
    value: z.union([z.string(), brandSchema, z.null()]),
    label: z.string(),
  }),

  brandModel: z.object({
    value: z.union([z.string(), carModelSchema, z.null()]),
    label: z.string(),
  }),

  bodyStyle: z.object({
    value: z.union([z.string(), carBodyStylesSchema, z.null()]),
    label: z.string(),
  }),

  tags: z.array(z.object({ value: z.string(), label: z.string() })),

  transmission: z.string(),

  numOfDoors: z.number(),

  seatingCapacity: z.number(),

  fuel: z.array(fuelTypeSchema),

  colors: z
    .array(
      z.object({
        name: z.string(),
        imageUrls: z.array(
          z.object({
            key: z.string(),
            url: imageSchema,
          })
        ),
      })
    )
    .default([]),

  price: z.object({
    min: z.number(),
    max: z.number(),
    isNegotiable: z.boolean(),
  }),

  specificationsByGroup: z.array(
    z.object({
      groupName: z.string(),
      values: z.array(attributeSchema).default([]),
    })
  ),

  additionalSpecifications: z.array(attributeSchema),

  posterImage: z.object({
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url(),
  }),

  imageUrls: z.array(
    z.object({
      key: z.string(),
      url: imageSchema,
    })
  ),

  videos: z
    .array(
      z.object({
        thumbnailImage: z.optional(imageSchema),
        link: z.string().url(),
      })
    )
    .optional()
    .default([]),

  carType: z.enum(["new", "used"]),

  description: z.string().optional(),

  cities: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),

  launchedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),

  status: z.enum(["available", "sold", "reserved"]),
  soldAt: z.string().optional(),

  isVerified: z.boolean(),

  panoramaImages: z
    .array(imageSchema.extend({ title: z.string() }))
    .optional()
    .default([]),

  metaData: z.record(z.string().min(1), z.any()).optional().default({}),
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
    const url = queryParams?.length ? `${baseUrl}?${queryParams}` : baseUrl;

    const res = await apiFetch<GetCarsResponseData>(url, {
      method: ReqMethod.GET,
      cache: "no-store",
      // headers: { Cookie: await getCookie() },
    });

    if (res.status === "success") {
      const parsedData = carsDataSchema.safeParse(res.data.results);

      if (parsedData.success) {
        return {
          data: {
            cars: parsedData.data,
            pagination: res.data.pagination,
          },
          message: null,
        };
      } else {
        return {
          data: null,
          message: "Invalid Input",
        };
      }
    }

    return {
      data: null,
      message: res.message || "Something went wrong, please try again later.",
    };
  } catch (e) {
    return {
      data: null,
      message: "Something went wrong, please try again later.",
    };
  }
}
