import { Car, Plus, LayoutList, Dice1 } from "lucide-react";
const adminNavigation = [
  {
    isGroup: true,
    groupName: "Car",
    icon: Car,
    links: [
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
    ],
  },
  {
    isGroup: true,
    groupName: "Brand",
    icon: Dice1,
    links: [
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
    ],
  },
  {
    isGroup: false,
    icon: LayoutList,
    href: "/home-settings",
    title: "Home Page Settings",
  },
];

export const navigation = {
  adminNavigation,
};
