import { z } from "zod";
import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, TAGS, endpoints, invalidateAdminCache } from "..";
import { imageSchema } from "@/schemas/utils";

export type AddCarBodyTypeParams = {
  name: string;
  image?: z.infer<typeof imageSchema>;
};

export async function addCarBodyType(payload: AddCarBodyTypeParams) {
  try {
    const res = await apiFetch(endpoints.api.cars.createCarBodyType, {
      method: ReqMethod.POST,
      body: payload,
      includeCredentials: false,
    });

    invalidateAdminCache([TAGS.carBodyList]);

    return res;
  } catch (e) {
    return null;
  }
}
