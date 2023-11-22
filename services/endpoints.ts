import { API_BASE_URL, API_V1_URL, UI_BASE_URL } from "@/util/constants";

export const endpoints = {
  api: {
    baseUrl: API_BASE_URL,
    v1URL: API_V1_URL,
    homeSettings: {
      baseUrl: "/home-settings",
      add: "/home-settings",
      get: "/home-settings",
      addPopularBrands: "/home-settings/popular-brands",
      getPopularBrands: "/home-settings/popular-brands",
    },
    brand: {
      createBrand: "/brands",
      getBrands: "/brands",

      createModel: "/models",
      getBrandModels: "/models",
    },
    cars: {
      createNewCar: "/cars",
      getCars: "/cars",
      createCarBodyType: "/car-info/body-types",
    },
  },
  admin: {},
  ui: {
    baseUrl: UI_BASE_URL,
    baseApiUrl: UI_BASE_URL + "/api",
    revalidate: "/revalidate",
  },
};
