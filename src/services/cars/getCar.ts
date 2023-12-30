import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, carSchema, endpoints } from "..";

type TGetCarBySlugPayload = {
  slug: string;
  carType: "new-car" | "used-car";
};

export async function getCar(payload: TGetCarBySlugPayload) {
  try {
    const url =
      payload.carType === "new-car"
        ? endpoints.api.cars.base
        : endpoints.api.usedCars.base;

    const res = await apiFetch(url + "/" + payload.slug, {
      method: ReqMethod.GET,
      cache: "no-store",
    });

    if (res.status === "success") {
      const parsedData = carSchema.safeParse(res.data);

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
