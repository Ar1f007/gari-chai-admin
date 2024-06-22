import { apiFetch } from "@/lib/api-fetch";
import { endpoints, ReqMethod } from "..";
import { TCarModelSchema } from "@/schemas/car-model";

type TUpdateCarModelInfoParams = {
  modelId: string;
  brand: string;
  name: TCarModelSchema["name"];
  upcoming: TCarModelSchema["upcoming"];
};

export async function updateCarModelInfo(payload: TUpdateCarModelInfoParams) {
  try {
    const url = endpoints.api.models.base + "/" + payload.modelId;

    const res = await apiFetch<TCarModelSchema>(url, {
      method: ReqMethod.PATCH,
      body: payload,
    });

    return res;
  } catch (error) {
    return undefined;
  }
}
