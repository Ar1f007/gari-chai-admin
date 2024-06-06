import { apiFetch } from "@/lib/api-fetch";
import { Todo } from "@/types";
import { z } from "zod";
import { endpoints } from "../endpoints";
import { ReqMethod } from "../serviceHelper";
import { TCarPartSchema, carPartSchema } from "@/schemas/parts";
import { TPagination } from "@/types/others";

export async function createCarPart(payload: Todo) {
  return apiFetch(endpoints.api.cars.parts, {
    method: ReqMethod.POST,
    body: payload,
    includeCredentials: false,
  });
}

export async function updateCarPart(payload: Todo) {
  return apiFetch(endpoints.api.cars.parts, {
    method: ReqMethod.PATCH,
    body: payload,
  });
}

type GetCarsPartsResponseData = {
  results: TCarPartSchema[];
  pagination: TPagination;
};
export async function getCarParts(queryParams?: string) {
  try {
    const baseUrl = endpoints.api.cars.parts;

    const url = queryParams?.length ? `${baseUrl}?${queryParams}` : baseUrl;

    const res = await apiFetch<GetCarsPartsResponseData>(url, {
      method: ReqMethod.GET,
      cache: "no-cache",
    });

    if (res.status === "success") {
      const parsedData = z.array(carPartSchema).safeParse(res.data.results);

      if (parsedData.success) {
        return {
          data: {
            carParts: parsedData.data,
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

export async function getCarPart(slug: string) {
  try {
    const res = await apiFetch(endpoints.api.cars.parts + "/" + slug, {
      method: ReqMethod.GET,
      cache: "no-store",
    });

    if (res.status === "success") {
      const parsedData = carPartSchema.safeParse(res.data);

      if (parsedData.success) {
        return {
          data: parsedData.data,
          message: null,
        };
      } else {
        return {
          data: null,
          message: "Parsing Failed",
        };
      }
    }

    return {
      data: null,
      message: res.message || "Something went wrong",
    };
  } catch (error) {
    return {
      data: null,
      message: "Something went wrong",
    };
  }
}

export async function deleteCarPart({ doc }: { doc: TCarPartSchema }) {
  const endpoint = endpoints.api.cars.parts + "/" + doc._id;

  return await apiFetch(endpoint, {
    method: ReqMethod.DELETE,
  });
}
