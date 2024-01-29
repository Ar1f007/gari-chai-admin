import { UI_BASE_URL } from "@/utils/constants";
import { ReqMethod, endpoints } from ".";

export const TAGS = {
  brands: "brands",
  cars: "cars",
  allHomeSettings: "home-settings",
  carBodyList: "car-body-list",
  brandModelList: "brand-model-list",
  sliders: "sliders",
  vendors: "vendors",
};

export async function invalidateUICache({
  tags = [],
  paths = [],
}: {
  tags?: string[];
  paths?: {
    path: string;
    type?: "layout" | "page" | undefined;
  }[];
}) {
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
      body: JSON.stringify({ tags, paths }),
    });

    const jsonRes = await res.json();

    return jsonRes;
  } catch (error) {
    return undefined;
  }
}
