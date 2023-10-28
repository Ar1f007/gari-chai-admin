import { apiFetch } from "@/lib/apiFetch";
import { ReqMethod, TCarSchema, endpoints } from "..";

type TAddToHomeSettings = {
  payload: TCarSchema;
  settingsType: string;
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
