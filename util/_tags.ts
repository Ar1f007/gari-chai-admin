// Testing purpose

const TAGS = {
  brands: "brands",
  cars: "cars",
  allHomeSettings: "home-settings",
  carBodyTypes: "car-body-types",
};

const HOME_SETTINGS_OPTIONS = {
  latestCars: "latest-cars",
  popularCars: "popular-cars",
  electricCars: "electric-cars",
  upcomingCars: "upcoming-cars",
  services: "services",
  mostSearchedCars: "most-searched-cars",
  popularBrands: "popular-brands",
};

// prefix tag name with their parent section
enum Tags {
  // Home page
  HomeAllSettings = "home-all",
  HomeLatestCars = "home-latest-cars",
  HomePopularCars = "home-popular-cars",
  HomeElectricCars = "home-electric-cars",
  HomeUpcomingCars = "home-upcoming-cars",
  HomePopularBrands = "home-popular-brands",
  HomeMostSearchedCars = "home-most-searched-cars",
  HomeServices = "home-services",
}

// Get api tag value from Pathname
const mapPathToTagValue = {
  [HOME_SETTINGS_OPTIONS.latestCars]: "home-latest-cars",
  [HOME_SETTINGS_OPTIONS.popularCars]: "home-popular-brands",
  [HOME_SETTINGS_OPTIONS.electricCars]: "home-electric-cars",
  [HOME_SETTINGS_OPTIONS.mostSearchedCars]: "home-most-searched-cars",
  [HOME_SETTINGS_OPTIONS.upcomingCars]: "home-upcoming-cars",
  [HOME_SETTINGS_OPTIONS.services]: "home-services",
  [HOME_SETTINGS_OPTIONS.popularBrands]: "home-popular-brands",
};
