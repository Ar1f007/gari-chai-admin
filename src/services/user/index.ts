import { apiFetch } from "@/lib/api-fetch";
import {
  LoginWithEmailSchema,
  LoginWithPhoneSchema,
  TAuthBasicUserInfo,
  userBasicInfoAPIResponseSchema,
} from "@/schemas/user";
import { ReqMethod, endpoints, getCookie } from "..";

import { AUTH_TOKEN_NAME } from "@/utils/constants";
import { z } from "zod";
import { TPagination } from "@/types/others";

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
  } finally {
    abortController.abort();
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

type GetUsersResponseData = {
  results: TAuthBasicUserInfo[];
  pagination: TPagination;
};

export async function getUsers(queryParams?: string) {
  try {
    const baseUrl = endpoints.api.auth.users;
    const url = queryParams?.length ? `${baseUrl}?${queryParams}` : baseUrl;

    const res = await apiFetch<GetUsersResponseData>(url, {
      method: ReqMethod.GET,
      cache: "no-store",
    });

    if (res.status === "success") {
      const parsedData = z
        .array(userBasicInfoAPIResponseSchema)
        .safeParse(res.data.results);

      if (parsedData.success) {
        return {
          data: {
            cars: parsedData.data,
            pagination: res.data.pagination,
          },
          message: null,
        };
      } else {
        return {
          data: null,
          message: "Invalid Input",
        };
      }
    }

    return {
      data: null,
      message: res.message || "Something went wrong, please try again later.",
    };
  } catch (e) {
    return {
      data: null,
      message: "Something went wrong, please try again later.",
    };
  }
}
