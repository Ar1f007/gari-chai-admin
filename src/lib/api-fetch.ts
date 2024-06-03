import { getCookie } from "@/services";
import { TApiData, TApiError } from "@/types/others";
import { API_V1_URL, AUTH_TOKEN_NAME } from "@/utils/constants";

type FetchExtendedOptions = {
  isFormData?: boolean;
  body?: any;
  baseApiUrl?: string;
  includeCredentials?: boolean;
} & Omit<RequestInit, "body">;

export async function apiFetch<Data = unknown, ErrData = TApiError>(
  endpoint: string,
  options: FetchExtendedOptions
) {
  const {
    isFormData = false,
    baseApiUrl = API_V1_URL,
    includeCredentials = true,
    body,
    headers,
    ...rest
  } = options;

  const fetchOptions: FetchExtendedOptions = {
    credentials: "include",

    headers: {
      Accept: "application/json",
      "Content-type": isFormData ? "multipart/form-data" : "application/json",
      authorization: includeCredentials
        ? `Bearer ${await getCookie(AUTH_TOKEN_NAME)}`
        : "",
      ...headers,
    },

    body: isFormData ? constructFormData(body) : JSON.stringify(body),

    ...rest,
  };

  try {
    const url = baseApiUrl + endpoint;

    const res = await fetch(url, { ...fetchOptions });

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
