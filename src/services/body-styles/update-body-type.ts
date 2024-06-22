import { apiFetch } from "@/lib/api-fetch";
import { endpoints, ReqMethod } from "..";
import { TCarBodyStylesSchema } from "@/schemas/car-body-style";

export type TCarBodyStylesSchemaParams = {
  name: TCarBodyStylesSchema["name"];
  image: TCarBodyStylesSchema["image"];
  itemId: TCarBodyStylesSchema["_id"];
};

export async function updateCarBodyTypeInfo(
  payload: TCarBodyStylesSchemaParams
) {
  try {
    const url = endpoints.api.carInformation.carBodyType + "/" + payload.itemId;

    const res = await apiFetch<TCarBodyStylesSchema>(url, {
      method: ReqMethod.PATCH,
      body: payload,
    });

    return res;
  } catch (error) {
    return undefined;
  }
}
