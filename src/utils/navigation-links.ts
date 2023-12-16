import { NavLinkItem } from "@/types";
import {
  CarIcon,
  DatabaseZapIcon,
  Dice1Icon,
  LayoutListIcon,
  LucideIcon,
} from "lucide-react";
import { routes } from "./routes";

export type Route = {
  label: string;
  href: string | NavLinkItem[];
  icon?: LucideIcon;
};

const carLinks: Route[] = [
  {
    label: "Add",
    href: routes.newCarRoutes.addCar,
  },
  {
    label: "Cars",
    href: routes.newCarRoutes.carList,
  },
];

const brandLinks: Route[] = [
  {
    label: "Add",
    href: routes.brandRoutes.add,
  },
  {
    label: "Brands",
    href: routes.brandRoutes.brands,
  },
  {
    label: "Models",
    href: routes.brandRoutes.models,
  },
  {
    label: "Body Style",
    href: routes.brandRoutes.bodyStyles,
  },
];

const homepageSettingLinks: Route[] = [
  {
    label: "Sliders",
    href: routes.homepageSettingRoutes.homePageSliders,
  },
  {
    label: "Latest Cars",
    href: routes.homepageSettingRoutes.latestCars,
  },
  {
    label: "Popular cars",
    href: routes.homepageSettingRoutes.popularCars,
  },
  {
    label: "Electric cars",
    href: routes.homepageSettingRoutes.electricCars,
  },
  {
    label: "Upcoming cars",
    href: routes.homepageSettingRoutes.upcomingCars,
  },
  {
    label: "Most Searched cars",
    href: routes.homepageSettingRoutes.mostSearchedCars,
  },
  {
    label: "Popular brands",
    href: routes.homepageSettingRoutes.popularBrands,
  },
];

const cacheLinks: Route[] = [
  {
    label: "Admin Cache",
    href: "/cache/admin",
  },
  {
    label: "UI Cache",
    href: "/cache/ui",
  },
];

const adminLinks: Route[] = [
  {
    label: "Car",
    href: carLinks,
    icon: CarIcon,
  },
  {
    label: "Brands & Others",
    href: brandLinks,
    icon: Dice1Icon,
  },
  {
    label: "Home Page Settings",
    href: homepageSettingLinks,
    icon: LayoutListIcon,
  },
  {
    label: "Cache Control",
    icon: DatabaseZapIcon,
    href: cacheLinks,
  },
];

export const navigationLinks = {
  adminLinks,
};
