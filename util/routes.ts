import { Car, Plus, LayoutList, Dice1 } from "lucide-react";

const homepageSettingsLinks = [
  {
    title: "Latest Cars",
    href: "/home-page-settings/latest-cars",
  },
  {
    title: "Popular Cars",
    href: "/home-page-settings/popular-cars",
  },
  {
    title: "Brands",
    href: "/home-page-settings/brands",
  },
];

const brandLinks = [
  {
    title: "Brands",
    href: "/brands",
    icon: LayoutList,
  },
  {
    title: "Add Brand",
    href: "/brands/add",
    icon: Plus,
  },
];

const carLinks = [
  {
    title: "Cars",
    href: "/cars",
    icon: LayoutList,
  },
  {
    title: "Add Car",
    href: "/cars/add",
    icon: Plus,
  },
];

const adminNavigation = [
  {
    isGroup: true,
    groupName: "Car",
    icon: Car,
    links: carLinks,
  },
  {
    isGroup: true,
    groupName: "Brand",
    icon: Dice1,
    links: brandLinks,
  },
  {
    isGroup: true,
    groupName: "Home Page Settings",
    icon: LayoutList,
    links: homepageSettingsLinks,
  },
];

export const navigation = {
  adminNavigation,
};
