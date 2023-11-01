import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, endpoints } from "..";

type TUpdateHomeSettingItem = {
  contentId: string;
  sectionName: string;
  tags: Array<string>;
  sort: number;
};

export async function updateHomeSettingItem(payload: TUpdateHomeSettingItem) {
  try {
    const url = endpoints.api.homeSettings.baseUrl + "/" + payload.sectionName;

    const res = await apiFetch(url, {
      method: ReqMethod.PUT,
      body: payload,
    });

    return res;
  } catch (e) {
    return null;
  }
}
