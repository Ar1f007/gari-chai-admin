import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TAGS, carSchema, endpoints } from "..";
import { z } from "zod";
import { sectionNameEnum } from "@/types/others";

export const homeSettingApiSchemaSingleInstance = z.object({
  _id: z.string(),
  sectionName: sectionNameEnum,
  content: carSchema,
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
  const parsedSlug = sectionNameEnum.safeParse(slug);

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
      },
    });

    if (res.status === "success") {
      const parsedData = homeSettingApiMultipleInstance.safeParse(res.data);

      if (parsedData.success) {
        return parsedData.data;
      }
      throw new Error("Settings data missing");
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}
