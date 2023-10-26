import { TApiData, TApiError } from "@/types/others";
import { API_V1_URL } from "@/util/constants";
import { toast } from "sonner";

type FetchExtendedOptions = {
  isFormData?: boolean;
  body?: any;
  baseApiUrl?: string;
} & Omit<RequestInit, "body">;

export async function apiFetch<Data = unknown, ErrData = TApiError>(
  endpoint: string,
  options: FetchExtendedOptions
) {
  const { isFormData = false, baseApiUrl = API_V1_URL, body, headers, ...rest } = options;

  const fetchOptions: FetchExtendedOptions = {
    headers: {
      Accept: "application/json",
      "Content-type": isFormData ? "multipart/form-data" : "application/json",
      ...headers,
    },
    body: isFormData ? constructFormData(body) : JSON.stringify(body),
    ...rest,
  };

  try {
    const url = baseApiUrl + endpoint;

    const res = await fetch(url, fetchOptions);

    const jsonRes: TApiData<Data> | ErrData = await res.json();

    return jsonRes;
  } catch (e: any) {
    toast.error(e.message ?? "Something went wrong");
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
