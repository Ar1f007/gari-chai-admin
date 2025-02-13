import { HOME_SETTINGS_OPTIONS, UI_BASE_URL } from "@/utils/constants";
import { ReqMethod, endpoints } from ".";

export const TAGS = {
  all: "all",
  brands: "brands",
  cars: "cars",
  allHomeSettings: "home-settings",
  carBodyList: "car-body-list",
  brandModelList: "brand-model-list",
  sliders: "sliders",
  vendors: "vendors",
  carCampaigns: "car-campaign",
  carParts: HOME_SETTINGS_OPTIONS.carParts,
};

export const UI_TAGS = {
  carBodyTypes: "car-body-types",
  allAndPopularBrands: "all-and-popular-brands",
  sliders: "sliders",

  latestCars: "latest-cars",
  popularCars: "popular-cars",
  electricCars: "electric-cars",
  services: "services",
  mostSearchedCars: "most-searched-cars",
  popularBrands: "popular-brands",
  upcomingCars: "upcoming-cars",
  carParts: HOME_SETTINGS_OPTIONS.carParts,
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
    return {
      success: false,
      message: "Failed to update",
    };
  }
}
