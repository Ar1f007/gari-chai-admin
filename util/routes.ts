import { Car, LayoutList, Dice1, DatabaseZap } from "lucide-react";
import { HOME_SETTINGS_OPTIONS } from "./constants";

const homepageSettingsLinks = [
  {
    title: "Latest Cars",
    href: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.latestCars,
  },
  {
    title: "Popular Cars",
    href: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.popularCars,
  },
  {
    title: "Electric Cars",
    href: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.electricCars,
  },
  {
    title: "Upcoming Cars",
    href: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.upcomingCars,
  },
  {
    title: "Most Searched Cars",
    href: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.mostSearchedCars,
  },
  {
    title: "Popular Brands",
    href: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.popularBrands,
  },
  {
    title: "Services",
    href: "/home-page-settings/" + HOME_SETTINGS_OPTIONS.services,
  },
];

const brandLinks = [
  {
    title: "Brands",
    href: "/brands",
  },
  {
    title: "Add Brand",
    href: "/brands/add",
  },
];

const carLinks = [
  {
    title: "Cars",
    href: "/cars",
  },
  {
    title: "Add Car",
    href: "/cars/add",
  },
];

const cacheLinks = [
  {
    title: "Admin Cache",
    href: "/cache/admin",
  },
  {
    title: "UI Cache",
    href: "/cache/ui",
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
  {
    isGroup: true,
    groupName: "Cache Control",
    icon: DatabaseZap,
    links: cacheLinks,
  },
];

export const navigation = {
  adminNavigation,
};
