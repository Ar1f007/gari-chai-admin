import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, TBrandSchema, TCarSchema, endpoints } from "..";
import { TCarPartSchema } from "@/schemas/parts";

export type TAddToHomeSettings = {
  contentId: string;
  sectionName: string;
  content: TCarSchema | TBrandSchema | TCarPartSchema;
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

export async function addCarPartsToHomeSettings(payload: TAddToHomeSettings[]) {
  try {
    const res = await apiFetch(endpoints.api.homeSettings.carParts, {
      method: ReqMethod.POST,
      body: payload,
    });

    return res;
  } catch (error) {
    return null;
  }
}
