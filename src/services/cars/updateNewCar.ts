import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, endpoints } from "..";
import { EditNewCarInputs } from "@/schemas/edit-new-car";

export async function updateNewCar(payload: EditNewCarInputs, carSlug: string) {
  try {
    const url = endpoints.api.cars.base + "/" + carSlug;
    const res = await apiFetch(url, {
      method: ReqMethod.PUT,
      body: payload,
    });

    return res;
  } catch (e) {
    return null;
  }
}
