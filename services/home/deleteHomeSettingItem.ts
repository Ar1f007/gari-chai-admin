import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, endpoints, invalidateCache } from "..";

type DeletePayload = {
  itemId: string;
  sectionName: string;
};

export async function deleteHomeSettingItem(payload: DeletePayload) {
  try {
    const url = endpoints.api.homeSettings.baseUrl + "/" + payload.sectionName;
    const res = await apiFetch(url, {
      method: ReqMethod.DELETE,
      body: { itemId: payload.itemId },
    });

    return res;
  } catch (error) {
    return undefined;
  }
}
