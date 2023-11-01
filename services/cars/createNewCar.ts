import { apiFetch } from "@/lib/apiFetch";
import { TCarServerPayload } from "@/types/car";
import { ReqMethod, TAGS, endpoints, invalidateAdminCache } from "..";

export async function createNewCar(payload: TCarServerPayload) {
  try {
    const res = await apiFetch(endpoints.api.cars.createNewCar, {
      method: ReqMethod.POST,
      body: payload,
    });

    // update the brands list so that it has the latest updated values
    invalidateAdminCache(TAGS.brands);

    return res;
  } catch (e) {
    return null;
  }
}
