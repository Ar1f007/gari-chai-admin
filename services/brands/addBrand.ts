import { toast } from "sonner";
import { apiFetch } from "@/lib/apiFetch";
import { TBrandPayload, TBrand } from "@/types/brand";
import { endpoints, invalidateTag, ReqMethod, TAGS } from "..";

export async function addBrandName(payload: TBrandPayload) {
  const res = await apiFetch<TBrand>(endpoints.api.brand.createBrand, {
    method: ReqMethod.POST,
    body: payload,
  });

  if (res.status === "success") {
    invalidateTag(TAGS.brands);
    return res;
  }

  if (res.status === "validationError") {
    return res;
  }

  toast.error(res.message);
  return undefined;
}
