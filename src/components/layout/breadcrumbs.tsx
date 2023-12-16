"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const Breadcrumbs = () => {
  const pathname = usePathname();

  const pathArray = pathname.split("/").filter((el) => el !== "");

  const breadcrumbs = pathArray.reduce(
    (acc, pathPart) => {
      return [...acc, { label: pathPart, url: `/${pathPart}` }];
    },
    [{ label: "Dashboard", url: "/" }]
  );

  return (
    <nav className="order-0 md:order-1">
      <ul className="flex gap-2 flex-wrap">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            className="flex gap-1 items-center truncate"
          >
            {index !== breadcrumbs.length - 1 ? (
              <Fragment>
                <Link
                  href={breadcrumb.url}
                  className={cn(
                    "text-primary uppercase hover:text-primary/75 truncate max-w-[12ch] sm:max-w-none",
                    {
                      "font-medium text-neutral-300 select-none":
                        index === breadcrumbs.length - 1,
                    }
                  )}
                  {...(index === breadcrumbs.length - 1
                    ? { "aria-disabled": true }
                    : {})}
                >
                  {breadcrumb.label}
                </Link>
                <span>
                  <ChevronRightIcon
                    size={18}
                    className="text-muted-foreground"
                  />
                </span>
              </Fragment>
            ) : (
              <span className="font-medium text-muted-foreground select-none uppercase">
                {breadcrumb.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
