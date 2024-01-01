import { z } from "zod";

import { apiFetch } from "@/lib/api-fetch";
import { endpoints, ReqMethod, TAGS } from "..";
import { imageSchema } from "@/schemas/utils";

/**=====================
 * Schema
 =======================*/

export const brandSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  carCollectionCount: z.number(),
  image: imageSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const brandsSchema = z.array(brandSchema);

export type TBrandSchema = z.infer<typeof brandSchema>;

/**=====================
 * API Call
 =======================*/
export async function getBrands(queryParams?: string) {
  try {
    const baseUrl = endpoints.api.brand.getBrands;
    const url =
      queryParams && queryParams.length ? baseUrl + `?${queryParams}` : baseUrl;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,

      next: {
        tags: [TAGS.brands],
        revalidate: 3600,
      },
    });

    if (res.status === "success") {
      const parsedData = brandsSchema.safeParse(res.data);

      if (parsedData.success) {
        return {
          message: "",
          data: parsedData.data,
        };
      } else {
        return {
          message: "Invalid Input",
          data: [],
        };
      }
    }

    return {
      message: res.message || "Something went wrong",
      data: [],
    };
  } catch (e) {
    return {
      message: "Something went wrong",
      data: [],
    };
  }
}

/**=====================================================================
 * Get popular brands
 */

/**
 * Single Brand response from `Home Setting table`
 */
export const homeSettingApiBrandSchemaSingleInstance = z.object({
  _id: z.string(),
  sectionName: z.string(),
  sort: z.number(),
  content: brandSchema,
  tags: z.array(z.string()),
  contentId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type THomeSettingApiBrandSchemaSingleInstance = z.infer<
  typeof homeSettingApiBrandSchemaSingleInstance
>;
/**
 * End Brands schema - Home page
 */

export async function getPopularBrands() {
  try {
    const url = endpoints.api.homeSettings.getPopularBrands;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,
      cache: "no-store",
    });

    if (res.status === "success") {
      const parsedData = z
        .array(homeSettingApiBrandSchemaSingleInstance)
        .safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }
      throw new Error(`Error: Popular brands data missing`);
    }

    return undefined;
  } catch (e) {
    return undefined;
  }
}
