import { ReactNode } from "react";
import Breadcrumbs from "../breadcrumbs";

const PageHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[64px] px-4 flex flex-col space-y-5 md:space-y-0 md:flex-row md:justify-between md:items-center">
      <Breadcrumbs />

      <h1 className="text-xl font-semibold tracking-tight">{children}</h1>
    </div>
  );
};
export default PageHeader;
