import { apiFetch } from "@/lib/apiFetch";
import { TCarServerPayload } from "@/types/car";
import { ReqMethod, endpoints } from "..";

export async function createNewCar(payload: TCarServerPayload) {
  try {
    const res = await apiFetch(endpoints.api.cars.createNewCar, {
      method: ReqMethod.POST,
      body: payload,
    });

    return res;
  } catch (e) {
    return null;
  }
}
