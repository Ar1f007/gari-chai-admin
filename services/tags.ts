import { UI_BASE_URL } from "@/util/constants";
import { ReqMethod, endpoints } from ".";

export const TAGS = {
  brands: "brands",
  cars: "cars",
  allHomeSettings: "home-settings",
};

export async function invalidateUICache(tags: string[]) {
  try {
    const endpoint = endpoints.ui.revalidate;

    const searchParams = new URLSearchParams();

    searchParams.append(
      "revalidateSecret",
      process.env.NEXT_PUBLIC_REVALIDATE_SECRET!
    );

    const path = endpoint + "?" + searchParams.toString();

    const url = UI_BASE_URL + "/api" + path;

    const res = await fetch(url, {
      method: ReqMethod.POST,
      body: JSON.stringify({ tags }),
    });

    const jsonRes = await res.json();

    return jsonRes;
  } catch (error) {
    return undefined;
  }
}
