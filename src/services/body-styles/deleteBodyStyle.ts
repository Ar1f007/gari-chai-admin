import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, endpoints } from "..";

export async function deleteBodyStyles(id: string) {
  const url = endpoints.api.carInformation.carBodyType;
  return apiFetch(url, {
    method: ReqMethod.DELETE,
    body: {
      id,
    },
  });
}
