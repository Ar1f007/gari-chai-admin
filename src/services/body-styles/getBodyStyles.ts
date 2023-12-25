import { z } from "zod";
import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, TAGS, endpoints } from "..";
import { carBodyStylesSchema } from "@/schemas/car-body-style";

export async function getBodyStyles(queryParams?: string) {
  try {
    const baseUrl = endpoints.api.carInformation.getBodyTypes;
    const url =
      queryParams && queryParams.length ? baseUrl + `?${queryParams}` : baseUrl;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,

      next: {
        tags: [TAGS.carBodyList],
        revalidate: 3600,
      },
    });

    if (res.status === "success") {
      const parsedData = z.array(carBodyStylesSchema).safeParse(res.data);

      if (parsedData.success) {
        return {
          message: "",
          data: parsedData.data,
        };
      } else {
        return {
          message: "Invalid Input",
          data: [],
        };
      }
    }

    return {
      message: res.message || "Something went wrong",
      data: [],
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      data: [],
    };
  }
}
