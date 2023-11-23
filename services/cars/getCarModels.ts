/**=====================
 * Schema
 =======================*/

import { imageSchema } from "@/schema/others";
import { z } from "zod";
import { ReqMethod, TAGS, endpoints } from "..";
import { apiFetch } from "@/lib/apiFetch";
import { toast } from "sonner";

export const brandModelSchema = z.object({
  _id: z.string(),
  name: z.string(),
  carCollectionCount: z.number(),
  brand: z.string(),
  upcoming: z.boolean(),
  slug: z.string(),
  image: imageSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const brandModelsSchema = z.array(brandModelSchema);

export type TBrandModelSchema = z.infer<typeof brandModelSchema>;

/**=====================
 * API Call
 =======================*/
export async function getModelsByBrand({
  docId,
  queryParams,
}: {
  docId: string;
  queryParams?: string;
}) {
  try {
    const baseUrl = endpoints.api.brand.getBrandModels + "/" + docId;
    const url = queryParams ? baseUrl + `?${queryParams}` : baseUrl;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,

      next: {
        tags: [TAGS.brandModelList],
        revalidate: 3600 * 24, // every day
      },
    });

    if (res.status === "success") {
      const parsedData = brandModelsSchema.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }
    }

    if (res.status === "fail" || res.status === "error") {
      toast.error(res.message);
    }

    return undefined;
  } catch (e) {
    return undefined;
  }
}
