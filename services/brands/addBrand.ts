import { toast } from "sonner";
import { apiFetch } from "@/lib/apiFetch";
import { TBrand } from "@/types/brand";
import { endpoints, invalidateAdminCache, ReqMethod, TAGS } from "..";
import { ImagePayload } from "@/types/others";
import { BrandInputs } from "@/schema/client/brand";

export type TBrandPayload = {
  name: string;
  image: ImagePayload;
};

export async function addBrandName(payload: TBrandPayload) {
  const res = await apiFetch<TBrand>(endpoints.api.brand.createBrand, {
    method: ReqMethod.POST,
    body: payload,
  });

  if (res.status === "success") {
    invalidateAdminCache([TAGS.brands]);
    return res;
  }

  if (res.status === "validationError") {
    return res;
  }

  toast.error(res.message);
  return undefined;
}
