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
      cache: "no-store",
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
        console.log("parsed", parsedData.error);
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

export async function deleteCarPart({ doc }: { doc: TCarPartSchema }) {
  const endpoint = endpoints.api.cars.parts + "/" + doc._id;

  return await apiFetch(endpoint, {
    method: ReqMethod.DELETE,
  });
}
