import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TAGS, endpoints, invalidateAdminCache } from "..";

export async function addCarBodyType(payload: { name: string }) {
  try {
    const res = await apiFetch(endpoints.api.cars.createCarBodyType, {
      method: ReqMethod.POST,
      body: payload,
    });

    invalidateAdminCache([TAGS.carBodyList]);

    return res;
  } catch (e) {
    return null;
  }
}
