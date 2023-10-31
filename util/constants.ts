import { THomeSettingSectionNames } from "@/types/others";

export const MAX_FILE_SIZE_LIMIT = 300000; // 300 kb

export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://gari-chai.onrender.com";

export const API_V1_URL = API_BASE_URL + "/api/v1";

export const UI_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://gari-chai.vercel.app";

export const PRIMARY_COLOR = "#3C50E0";

export const SearchParams = {
  getAllBrands: "get=all",
};

// Home settings

export const HOME_SETTINGS_OPTIONS = {
  latestCars: "latest-cars",
  popularCars: "popular-cars",
  electricCars: "electric-cars",
  services: "services",
  mostSearched: "most-searched",
  popularBrands: "popular-brands",
};

export const settingsSectionToAddOptions = [
  {
    value: HOME_SETTINGS_OPTIONS.latestCars,
    label: "Latest Car",
  },
  {
    value: HOME_SETTINGS_OPTIONS.popularCars,
    label: "Popular Car",
  },
  {
    value: HOME_SETTINGS_OPTIONS.electricCars,
    label: "Electric Car",
  },
];
