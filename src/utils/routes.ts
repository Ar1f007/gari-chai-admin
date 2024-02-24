import { HOME_SETTINGS_OPTIONS } from "./constants";

const homepageSettingRoutes = {
  homePageSliders: "/home-page-settings/sliders",
  latestCars: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.latestCars,
  popularCars: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.popularCars,
  electricCars: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.electricCars,
  upcomingCars: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.upcomingCars,
  mostSearchedCars:
    "/home-page-settings/" + HOME_SETTINGS_OPTIONS.mostSearchedCars,
  popularBrands: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.popularBrands,
};

const newCarRoutes = {
  addCar: "/cars/add",
  carList: "/cars",
};

const vendorRoutes = {
  addVendor: "/vendors/add",
  vendorList: "/vendors",
};

const brandRoutes = {
  add: "/brands-and-others/add",
  brands: "/brands-and-others/brands",
  models: "/brands-and-others/models",
  bodyStyles: "/brands-and-others/body-styles",
};

const campaignRoutes = {
  create: "/campaigns/create",
  campaigns: "/campaigns",
};

const authRoutes = {
  login: "/login",
  profile: "/profile",
};

export const routes = {
  homepageSettingRoutes,
  newCarRoutes,
  brandRoutes,
  vendorRoutes,
  campaignRoutes,
  authRoutes,
};
