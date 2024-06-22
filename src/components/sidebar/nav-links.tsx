import React from "react";
import { NavLinkItem } from "@/types";
import NavLinkGroup from "@/components/sidebar/nav-link-group";
import NavLink from "@/components/sidebar/nav-link";
import { userStore } from "@/store";
import { getNavigationLinks } from "@/lib/utils";

// type NavLinksProps = {
//   links: Route[];
// };

const NavLinks = () => {
  const links = getNavigationLinks(userStore.user);

  function renderGroupMenu(item: NavLinkItem) {
    if (item.href.length === 0) return null;

    let depthLevel = 0;

    return (
      <NavLinkGroup
        icon={item.icon}
        groupName={item.label}
        links={item.href as NavLinkItem[]}
        depthLevel={depthLevel}
      />
    );
  }
  function renderSingleMenu(item: NavLinkItem) {
    if (!item.href) return null;

    return (
      <NavLink
        label={item.label}
        href={item.href as string}
        icon={item.icon}
      />
    );
  }

  return (
    <ul className="overflow-y-auto h-full border-b transition-[height] ease-linear duration-300 min-h-[300px]">
      {links.map((item, idx) => (
        <li key={idx}>
          {Array.isArray(item.href)
            ? renderGroupMenu(item)
            : renderSingleMenu(item)}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
