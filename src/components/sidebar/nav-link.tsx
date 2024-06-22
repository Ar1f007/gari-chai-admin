import Link from "next/link";
import { ComponentProps, Fragment, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLinkItem } from "@/types";
import { ChevronRightIcon } from "lucide-react";

type NavLinkProps = (
  | ({
      href: string;
    } & Omit<NavLinkItem, "href">)
  | {
      href: string;
      children: ReactNode;
    }
) &
  Omit<ComponentProps<typeof Link>, "href">;

const NavLink = (props: NavLinkProps) => {
  const { href, className: classNames, ...rest } = props;
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "sidebarLink",
        {
          "bg-muted": pathname === href,
        },
        classNames
      )}
      {...rest}
    >
      {"children" in props ? (
        props.children
      ) : (
        <Fragment>
          {props.icon ? (
            <>{<props.icon className="flex-shrink-0" />}</>
          ) : (
            <ChevronRightIcon className="flex-shrink-0" />
          )}
          <span
            title={props.label?.length > 20 ? props.label : ""}
            className="truncate"
          >
            {props.label}
          </span>
        </Fragment>
      )}
    </Link>
  );
};

export default NavLink;
