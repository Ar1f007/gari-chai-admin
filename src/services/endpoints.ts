import { API_BASE_URL, API_V1_URL, UI_BASE_URL } from "@/utils/constants";

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

      sliderBaseUrl: "/sliders",

      carParts: "/home-settings/car-parts",
    },

    brand: {
      base: "/brands",
      createBrand: "/brands",
      getBrands: "/brands",

      createModel: "/models",
      getBrandModels: "/models",
    },

    models: {
      base: "/models",
      getCarModels: "/models",
    },

    cars: {
      base: "/cars",
      createNewCar: "/cars",
      getCars: "/cars",
      createCarBodyType: "/car-body-types",
      parts: "/car-parts",
    },

    usedCars: {
      base: "/used-cars",
    },

    vendors: {
      base: "/vendors",
    },

    carInformation: {
      getBodyTypes: "/car-body-types",
      carBodyType: "/car-body-types",
    },

    campaigns: {
      cars: "/campaigns/cars",
    },

    auth: {
      profile: "/users/profile",
      login: "/users/login",
      logout: "/users/logout",
      users: "/users",
    },

    reviews: {
      carReviews: "/reviews/cars",
      updateReviews: "/reviews/update",
    },
  },

  admin: {},

  ui: {
    baseUrl: UI_BASE_URL,

    baseApiUrl: UI_BASE_URL + "/api",

    revalidate: "/revalidate",
  },
};
