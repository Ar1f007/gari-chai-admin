import { NavLinkItem } from "@/types";
import {
  CarIcon,
  ConstructionIcon,
  DatabaseZapIcon,
  Dice1Icon,
  LayoutListIcon,
  LucideIcon,
  MessageSquare,
  UserIcon,
} from "lucide-react";
import { routes } from "./routes";

export type Route = {
  label: string;
  href: string | NavLinkItem[];
  icon?: LucideIcon;
};

// SEPARATED LINKS SECTION
// THESE SEPARATED LINKS ARE LATER COMBINED INTO ONE SECTION

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

const usedCarLinks: Route[] = [
  {
    label: "Add",
    href: routes.usedCarRoutes.addCar,
  },
  {
    label: "Cars",
    href: routes.usedCarRoutes.carList,
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

const vendorLinks: Route[] = [
  {
    label: "Add",
    href: routes.vendorRoutes.addVendor,
  },
  {
    label: "Vendors",
    href: routes.vendorRoutes.vendorList,
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

const campaignLinks: Route[] = [
  {
    label: "Create Campaign",
    href: routes.campaignRoutes.create,
  },
  {
    label: "All Campaign",
    href: routes.campaignRoutes.campaigns,
  },
];

const reviewLinks: Route[] = [
  {
    label: "Car Reviews",
    href: routes.reviewRoutes.cars,
  },
];

// ============================================

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
    label: "Vendors",
    href: vendorLinks,
  },
  {
    label: "Home Page Settings",
    href: homepageSettingLinks,
    icon: LayoutListIcon,
  },
  {
    label: "Campaign",
    icon: ConstructionIcon,
    href: campaignLinks,
  },
  {
    label: "Cache Control",
    icon: DatabaseZapIcon,
    href: cacheLinks,
  },
  {
    label: "Reviews",
    icon: MessageSquare,
    href: reviewLinks,
  },
];

const superAdminLinks: Route[] = [
  ...adminLinks,
  {
    label: "Users",
    href: [
      {
        href: "/users",
        label: "Users",
      },
      {
        href: "/users/admin",
        label: "Admins",
      },
    ],
    icon: UserIcon,
  },
];

const userLinks: Route[] = [
  {
    label: "Car",
    href: usedCarLinks,
    icon: CarIcon,
  },
];

// THIS IS THE PART WHICH ACTUALLY GETS USED
export const navigationLinks = {
  adminLinks,
  userLinks,
  superAdminLinks,
};
