import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, TBrandSchema, TCarSchema, endpoints } from "..";

export type TAddToHomeSettings = {
  contentId: string;
  sectionName: string;
  content: TCarSchema | TBrandSchema;
  tags: Array<string>;
  sort: number;
};

export async function addToHomePageSettings(payload: TAddToHomeSettings) {
  try {
    const res = await apiFetch(endpoints.api.homeSettings.add, {
      method: ReqMethod.POST,
      body: payload,
      includeCredentials: false,
    });

    return res;
  } catch (e) {
    return null;
  }
}

export async function addPopularBrandsToHomePageSettings(
  payload: TAddToHomeSettings[]
) {
  try {
    const res = await apiFetch(endpoints.api.homeSettings.addPopularBrands, {
      method: ReqMethod.POST,
      body: payload,
    });

    return res;
  } catch (e) {
    return null;
  }
}
