import { apiFetch } from "@/lib/api-fetch";
import {
  LoginWithEmailSchema,
  LoginWithPhoneSchema,
  TAuthBasicUserInfo,
  userBasicInfoAPIResponseSchema,
} from "@/schemas/user";
import { ReqMethod, endpoints } from "..";

import { AUTH_TOKEN_NAME } from "@/utils/constants";

export async function getUser() {
  const abortController = new AbortController();

  try {
    const res = await apiFetch<TAuthBasicUserInfo>(endpoints.api.auth.profile, {
      method: ReqMethod.GET,
      cache: "no-store",
      signal: abortController.signal,
    });

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

export type AuthenticationMethods = "email" | "phone";

type LoginUserParams = {
  loginMethod: AuthenticationMethods;
  payload: LoginWithEmailSchema | LoginWithPhoneSchema;
};
export async function login(params: LoginUserParams) {
  const url = endpoints.api.auth.login + "/" + params.loginMethod;

  return apiFetch<TAuthBasicUserInfo>(url, {
    method: ReqMethod.POST,
    body: params.payload,
  });
}

export async function logout() {
  return apiFetch(endpoints.api.auth.logout, {
    method: ReqMethod.POST,
    body: { cookieName: AUTH_TOKEN_NAME },
  });
}
