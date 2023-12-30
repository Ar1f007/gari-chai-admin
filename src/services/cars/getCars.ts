import { z } from "zod";
import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, brandSchema, endpoints } from "..";
import { singleSpecificationSchema } from "@/schemas/utils";
import { brandModelSchema } from "./getCarModels";
import { TPagination } from "@/types/others";
import { carBodyStylesSchema } from "@/schemas/car-body-style";

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

  description: z.string().optional(),

  brand: z.object({
    value: z.union([z.string(), brandSchema, z.null()]),
    label: z.string(),
  }),

  brandModel: z.object({
    value: z.union([z.string(), brandModelSchema, z.null()]),
    label: z.string(),
  }),

  transmission: z.string(),

  bodyStyle: z.object({
    value: z.union([z.string(), carBodyStylesSchema, z.null()]),
    label: z.string(),
  }),

  fuel: z.object({
    typeInfo: z.object({
      value: z.object({
        type: z.string(),
        fullForm: z.string(),
      }),
      label: z.string(),
    }),
  }),

  posterImage: z.object({
    originalUrl: z.string().url(),
    thumbnailUrl: z.string().url().optional(),
  }),

  imageUrls: z.array(z.string()),

  videoUrls: z
    .array(
      z.object({
        thumbnailUrl: z.string().url().optional(),
        url: z.string().url(),
      })
    )
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

  seatingCapacity: z.number(),

  price: z.object({
    min: z.number(),
    max: z.number(),
    isNegotiable: z.boolean(),
  }),

  tags: z.array(z.object({ value: z.string(), label: z.string() })),

  specificationsByGroup: z.array(
    z.object({
      groupName: z.string(),
      values: z.array(attributeSchema).default([]),
    })
  ),

  additionalSpecifications: z.array(attributeSchema),

  carType: z.enum(["new", "used"]),

  launchedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),

  status: z.enum(["available", "sold", "reserved"]),
  soldAt: z.string().optional(),
  cities: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
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
      // next: {
      //   tags: [TAGS.cars],
      // },
      cache: "no-store",
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
