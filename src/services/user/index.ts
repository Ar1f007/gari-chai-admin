import { apiFetch } from "@/lib/api-fetch";
import {
  TAuthBasicUserInfo,
  userBasicInfoAPIResponseSchema,
} from "@/schemas/user";
import { ReqMethod, endpoints } from "..";

export async function getUser() {
  const abortController = new AbortController();

  try {
    const res = await apiFetch<TAuthBasicUserInfo>(endpoints.api.auth.profile, {
      method: ReqMethod.GET,
      cache: "no-store",
      signal: abortController.signal,
    });

    console.log(res);

    if (res.status === "success") {
      const parsedData = userBasicInfoAPIResponseSchema.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}
