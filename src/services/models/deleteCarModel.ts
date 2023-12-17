import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, endpoints } from "..";

export async function deleteCarModel(id: string) {
  const url = endpoints.api.models.carModels;
  return apiFetch(url, {
    method: ReqMethod.DELETE,
    body: {
      id,
    },
  });
}
