import { z } from "zod";
import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TAGS, endpoints } from "..";

export async function deleteBodyStyles(id: string) {
  const url = endpoints.api.carInformation.carBodyType;
  return apiFetch(url, {
    method: ReqMethod.DELETE,
    body: {
      id,
    },
  });
}
