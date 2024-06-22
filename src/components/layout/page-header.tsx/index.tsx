import { ReactNode } from "react";
import Breadcrumbs from "../breadcrumbs";

const PageHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[64px] px-[var(--pagePaddingInline)] flex flex-col space-y-5 md:space-y-0 md:flex-row md:justify-between md:items-center border-b">
      <Breadcrumbs />

      <h1 className="text-xl font-semibold tracking-tight">{children}</h1>
    </div>
  );
};
export default PageHeader;
