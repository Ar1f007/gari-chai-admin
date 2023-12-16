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
      const url = `${acc[acc.length - 1].url}/${pathPart}`;
      return [...acc, { label: pathPart, url }];
    },
    [{ label: "Dashboard", url: "/" }]
  );

  return (
    <nav className="hidden md:block">
      <ul className="flex gap-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={index}
            className="flex gap-1 items-center"
          >
            {index !== breadcrumbs.length - 1 ? (
              <Fragment>
                <Link
                  href={breadcrumb.url}
                  className={cn(
                    "text-primary uppercase hover:text-primary/75",
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
