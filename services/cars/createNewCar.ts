import { apiFetch } from "@/lib/apiFetch";
import { TCarCreatePayload } from "@/types/car";
import { ReqMethod, TAGS, endpoints, invalidateAdminCache } from "..";

export async function createNewCar(payload: TCarCreatePayload) {
  try {
    const res = await apiFetch(endpoints.api.cars.createNewCar, {
      method: ReqMethod.POST,
      body: payload,
    });

    invalidateAdminCache([TAGS.brands, TAGS.cars]);

    return res;
  } catch (e) {
    return null;
  }
}
