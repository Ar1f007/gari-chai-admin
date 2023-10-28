import { z } from "zod";
import { toast } from "sonner";

import { apiFetch } from "@/lib/apiFetch";
import { endpoints, ReqMethod, TAGS } from "..";
import { imageSchema } from "@/schema/others";
import { TBrand } from "@/types/brand";

/**=====================
 * Schema
 =======================*/

export const brandSchema = z.object({
  _id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  slug: z.string(),
  image: imageSchema.optional(),
});

export const brandsSchema = z.array(brandSchema);

export type TBrandSchema = z.infer<typeof brandSchema>;

/**=====================
 * API Call
 =======================*/
export async function getBrands(queryParams?: string) {
  try {
    const baseUrl = endpoints.api.brand.getBrands;
    const url = queryParams ? baseUrl + `?${queryParams}` : baseUrl;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,

      next: {
        tags: [TAGS.brands],
      },
    });

    if (res.status === "success") {
      const parsedData = brandsSchema.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }

      throw new Error("Error getting data");
    }

    if (res.status === "error" || res.status === "fail") {
      toast.error(res.message);
      return undefined;
    }
  } catch (e) {
    return undefined;
  }
}
