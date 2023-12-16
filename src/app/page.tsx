import { themeConfig } from "@/configs/theme-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: themeConfig.templateName,
  description: themeConfig.templateName + " Admin Dashboard",
  // other metadata
};

export default function Home() {
  return <>Dashboard Content will be here</>;
}
