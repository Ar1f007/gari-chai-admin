"use client";

import { NavLinkItem } from "@/types";
import NavLink from "@/components/sidebar/nav-link";
import { Fragment, useState } from "react";
import { ChevronsUpDownIcon, LayersIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavLinkGroupProps = {
  groupName: string;
  links: NavLinkItem[];
  icon?: LucideIcon;
  depthLevel?: number;
};

const NavLinkGroup = ({
  groupName,
  links,
  icon: Icon,
  depthLevel = 0,
}: NavLinkGroupProps) => {
  depthLevel += 1;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleToggle();
    }
  };

  return (
    <Fragment>
      <div
        role="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={cn("sidebarLink flex items-center justify-between pr-4")}
        style={{
          paddingLeft:
            depthLevel > 1
              ? `calc(var(--paddingLeftOffset) * ${depthLevel})`
              : "",
        }}
      >
        <span className="flex gap-2 truncate">
          {Icon ? <>{<Icon />}</> : <LayersIcon />}

          <span className="truncate flex-1">{groupName}</span>
        </span>

        <span>
          <ChevronsUpDownIcon className="h-4 w-4" />
          <span className="sr-only">Toggle</span>
        </span>
      </div>

      <ul
        className={cn("transition-[max-height] duration-300 ease-linear", {
          "max-h-0 overflow-hidden": !isOpen,
          "max-h-256": isOpen,
        })}
      >
        {links.map((item, index) => (
          <li
            key={index}
            className={cn("opacity-0", { "animate-fade-in": isOpen })}
            style={{
              animationDelay: `${index * 35}ms`,
            }}
          >
            {Array.isArray(item.href) ? (
              <NavLinkGroup
                groupName={item.label}
                links={item.href}
                icon={item.icon}
                depthLevel={depthLevel}
              />
            ) : (
              <NavLink
                label={item.label}
                href={item.href as string}
                icon={item.icon}
                style={{
                  paddingLeft:
                    depthLevel > 1
                      ? `calc(var(--paddingLeftOffset) * ${depthLevel + 1})`
                      : `calc(var(--paddingLeftOffset) * ${2})`,
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default NavLinkGroup;
