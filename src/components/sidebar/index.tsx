"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationLinks } from "@/utils/navigation-links";
import NavLinks from "@/components/sidebar/nav-links";
import QuickActions from "@/components/sidebar/quick-actions";
import { themeConfig } from "@/configs/theme-config";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <aside
      className={cn(
        "fixed md:static flex flex-col w-[var(--sidebarWidthCollapsed)] transition-all duration-300 ease-in-out py-2 " +
          "bg-background border-r max-h-screen overflow-hidden z-[9999]",
        {
          "w-[var(--sidebarWidth)] shadow-lg": isOpen,
        }
      )}
    >
      <div className="px-2 ml-auto">
        <Button
          variant="outline"
          onClick={toggleMenu}
          size="icon"
        >
          {isOpen ? <XIcon /> : <MenuIcon />}
        </Button>
      </div>

      <div
        className={cn(
          "invisible py-4 h-[calc(100vh_-_48px)] flex flex-col justify-between space-y-8",
          { "visible delay-100": isOpen }
        )}
      >
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-center font-bold text-primary text-2xl">
            {themeConfig.templateName}
          </h2>
          <QuickActions />
        </div>

        {/*  LINKS  */}
        <NavLinks links={navigationLinks.adminLinks} />

        {/* FOOTER */}
        <div className="flex justify-center">
          <Button
            variant="secondary"
            className="text-primary"
          >
            <ExternalLinkIcon />
            <span className="ml-2 text-lg">Visit</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
