import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TAGS, endpoints } from "..";
import { carModelSchema } from "@/schemas/car-model";
import { z } from "zod";

export async function getCarModels(queryParams?: string) {
  try {
    const baseUrl = endpoints.api.models.getCarModels;
    const url =
      queryParams && queryParams.length ? baseUrl + `?${queryParams}` : baseUrl;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,

      next: {
        tags: [TAGS.brandModelList],
        revalidate: 3600,
      },
    });

    if (res.status === "success") {
      const parsedData = z.array(carModelSchema).safeParse(res.data);

      if (parsedData.success) {
        return {
          message: "",
          data: parsedData.data,
        };
      } else {
        return {
          message: "Invalid input",
          data: [],
        };
      }
    }

    return {
      message: res.message,
      data: [],
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      data: [],
    };
  }
}
