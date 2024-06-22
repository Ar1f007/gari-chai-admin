import { z } from "zod";
import { ReqMethod, TAGS, endpoints } from "..";
import { apiFetch } from "@/lib/api-fetch";
import { toast } from "sonner";
import { carModelSchema } from "@/schemas/car-model";

export const brandModelsSchema = z.array(carModelSchema);

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
