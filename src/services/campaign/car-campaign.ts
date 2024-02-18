import { apiFetch } from "@/lib/api-fetch";
import { ReqMethod, endpoints } from "..";

export async function createNewCarCampaign(payload: any) {
  try {
    const res = await apiFetch(endpoints.api.campaigns.cars, {
      method: ReqMethod.POST,
      body: payload,
    });

    return res;
  } catch (e) {
    return null;
  }
}
