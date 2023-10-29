import { API_BASE_URL, API_V1_URL } from "@/util/constants";

export const endpoints = {
  api: {
    baseUrl: API_BASE_URL,
    v1URL: API_V1_URL,
    homeSettings: {
      baseUrl: "/home-settings",
      add: "/home-settings",
      get: "/home-settings",
    },
    brand: {
      createBrand: "/brands",
      getBrands: "/brands",
    },
    cars: {
      createNewCar: "/cars",
      getCars: "/cars",
    },
  },
  admin: {},
  ui: {},
};
