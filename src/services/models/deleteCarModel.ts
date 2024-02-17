import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, endpoints } from "..";

export async function deleteCarModel(id: string) {
  const url = endpoints.api.models.base;
  return apiFetch(url, {
    method: ReqMethod.DELETE,
    body: {
      id,
    },
  });
}
