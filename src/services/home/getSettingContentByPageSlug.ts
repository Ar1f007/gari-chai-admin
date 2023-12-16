import { apiFetch } from "@/lib/apiFetch";
import {
  ReqMethod,
  TAGS,
  TBrandSchema,
  TCarSchema,
  brandSchema,
  carSchema,
  endpoints,
} from "..";
import { z } from "zod";
import { homeSettingSections } from "@/utils/constants";

export const homeSettingApiSchemaSingleInstance = z.object({
  _id: z.string(),
  sectionName: homeSettingSections,
  content: carSchema.or(brandSchema),
  tags: z.array(z.string()),
  sort: z.number(),
  contentId: z.string(),
});

export const homeSettingApiMultipleInstance = z.array(
  homeSettingApiSchemaSingleInstance
);

export type THomeSettingApiSchema = z.infer<
  typeof homeSettingApiSchemaSingleInstance
>;

export async function getSettingContentByPageSlug(slug: string) {
  // check if the provided slug is allowed
  const parsedSlug = homeSettingSections.safeParse(slug);

  if (!parsedSlug.success) {
    const errMessages = parsedSlug.error.errors.map((e) => e.message);
    throw new Error(errMessages.toString());
  }

  try {
    const url = endpoints.api.homeSettings.get + "/" + slug;

    const res = await apiFetch(url, {
      method: ReqMethod.GET,
      next: {
        tags: [TAGS.allHomeSettings, slug],
        revalidate: 0,
      },
    });

    if (res.status === "success") {
      const parsedData = homeSettingApiMultipleInstance.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }

      throw new Error(slug + " Settings data missing");
    }

    if (res.status) {
      return res.message;
    }

    return undefined;
  } catch (error) {
    return (error as Error)?.message ?? undefined;
  }
}
