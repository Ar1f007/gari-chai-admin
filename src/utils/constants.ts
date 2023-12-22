import { z } from "zod";

export const MAX_FILE_SIZE_LIMIT = 300000; // 300 kb

export const PLACEHOLDER_IMAGE = "/images/placeholder.webp";

export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://gari-chai.onrender.com";

export const API_V1_URL = API_BASE_URL + "/api/v1";

export const UI_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://gari-chai.vercel.app"
    : "http://localhost:3000";

export const PRIMARY_COLOR = "#3C50E0";

export const SearchParams = {
  getAllBrands: "get=all",
};

// Home settings

export const HOME_SETTINGS_OPTIONS = {
  latestCars: "latest-cars",
  popularCars: "popular-cars",
  electricCars: "electric-cars",
  upcomingCars: "upcoming-cars",
  services: "services",
  mostSearchedCars: "most-searched-cars",
  popularBrands: "popular-brands",
};

export const homeSettingSections = z.enum([
  HOME_SETTINGS_OPTIONS.latestCars,
  HOME_SETTINGS_OPTIONS.popularCars,
  HOME_SETTINGS_OPTIONS.electricCars,
  HOME_SETTINGS_OPTIONS.upcomingCars,
  HOME_SETTINGS_OPTIONS.services,
  HOME_SETTINGS_OPTIONS.mostSearchedCars,
  HOME_SETTINGS_OPTIONS.popularBrands,
]);

export const carCategoryOptions = [
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

export const carSubCategoryOptions = [
  {
    value: HOME_SETTINGS_OPTIONS.latestCars,
    label: "Latest Car",
  },
  {
    value: HOME_SETTINGS_OPTIONS.popularCars,
    label: "Popular Car",
  },
  {
    value: HOME_SETTINGS_OPTIONS.upcomingCars,
    label: "Upcoming Car",
  },
];

export const carTagOptions = [
  ...carCategoryOptions,
  {
    value: HOME_SETTINGS_OPTIONS.upcomingCars,
    label: "Upcoming Car",
  },
];

export const MAX_SELECTABLE_TAGS_OPTIONS = 1;
