/**=====================
 * Schema
 =======================*/

import { imageSchema } from "@/schema/others";
import { z } from "zod";
import { ReqMethod, TAGS, endpoints } from "..";
import { apiFetch } from "@/lib/apiFetch";
import { toast } from "sonner";

export const carBodyTypeSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: imageSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const carBodyTypesSchema = z.array(carBodyTypeSchema);

export type TCarBodyTypeSchema = z.infer<typeof carBodyTypeSchema>;

/**=====================
 * API Call
 =======================*/
export async function getCarBodyTypes(queryParams?: string) {
  try {
    const baseUrl = endpoints.api.carInformation.getBodyTypes;
    const url = queryParams ? baseUrl + `?${queryParams}` : baseUrl;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,

      next: {
        tags: [TAGS.carBodyList],
        revalidate: 3600 * 24, // every day
      },
    });

    if (res.status === "success") {
      const parsedData = carBodyTypesSchema.safeParse(res.data);

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
