import { HOME_SETTINGS_OPTIONS, UI_BASE_URL } from "@/util/constants";
import { endpoints } from ".";

export const TAGS = {
  brands: "brands",
  cars: "cars",
  allHomeSettings: "home-settings",
  ...HOME_SETTINGS_OPTIONS,
};

export async function updateUIHomeSetting(sectionName: string) {
  try {
    const endpoint = endpoints.ui.revalidate;

    const searchParams = new URLSearchParams();

    searchParams.append(
      "revalidateSecret",
      process.env.NEXT_PUBLIC_REVALIDATE_SECRET!
    );
    searchParams.append("tag", sectionName);

    const path = endpoint + "?" + searchParams.toString();

    const url = UI_BASE_URL + "/api" + path;

    const res = await fetch(url);
    const jsonRes = await res.json();

    return jsonRes;
  } catch (error) {
    return undefined;
  }
}
