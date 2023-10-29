import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TCarSchema, endpoints } from "..";

export type TAddToHomeSettings = {
  contentId: string;
  sectionName: string;
  content: TCarSchema;
  tags: Array<string>;
  sort: number;
};
export async function addToHomePageSettings(payload: TAddToHomeSettings) {
  try {
    const res = await apiFetch(endpoints.api.homeSettings.add, {
      method: ReqMethod.POST,
      body: payload,
    });

    return res;
  } catch (e) {
    return null;
  }
}
