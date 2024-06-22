import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, endpoints } from "..";

export async function deleteBrand(id: string) {
  const url = endpoints.api.brand.base;
  return apiFetch(url, {
    method: ReqMethod.DELETE,
    body: {
      id,
    },
  });
}
