import { API_BASE_URL, API_V1_URL } from "@/util/constants";

export const endpoints = {
  api: {
    baseUrl: API_BASE_URL,
    v1URL: API_V1_URL,
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
