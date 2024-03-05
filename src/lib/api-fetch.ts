import { TApiData, TApiError } from "@/types/others";
import { API_V1_URL } from "@/utils/constants";
import { routes } from "@/utils/routes";
import { catchError } from "./catch-error";
import { redirect } from "next/navigation";

type FetchExtendedOptions = {
  isFormData?: boolean;
  body?: any;
  baseApiUrl?: string;
} & Omit<RequestInit, "body">;

export async function apiFetch<Data = unknown, ErrData = TApiError>(
  endpoint: string,
  options: FetchExtendedOptions
) {
  const {
    isFormData = false,
    baseApiUrl = API_V1_URL,
    body,
    headers,
    ...rest
  } = options;

  const fetchOptions: FetchExtendedOptions = {
    headers: {
      Accept: "application/json",
      "Content-type": isFormData ? "multipart/form-data" : "application/json",
      ...headers,
    },

    body: isFormData ? constructFormData(body) : JSON.stringify(body),
    credentials: "include",
    ...rest,
  };

  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const url = baseApiUrl + endpoint;

    const res = await fetch(url, { ...fetchOptions, signal });

    if (res.status === 429) {
      throw Error(res.statusText);
    }

    if (res.status === 401 || res.status === 403) {
      // if (typeof window !== "undefined") {
      //   window.location.href = routes.authRoutes.login;
      // } else {
      //   const payload: TApiError = {
      //     status: "unauthorized",
      //     message: res.statusText,
      //   };
      //   return payload;
      // }
    }

    const jsonRes: TApiData<Data> | ErrData = await res.json();

    return jsonRes;
  } catch (e: any) {
    throw e;
  } finally {
    controller.abort();
  }
}

function constructFormData(body: BodyInit | null | undefined) {
  if (!body) {
    return null;
  }

  const fd = new FormData();

  Object.keys(body).forEach((key) => {
    fd.append(key, body[key as keyof typeof body]);
  });

  return fd;
}
