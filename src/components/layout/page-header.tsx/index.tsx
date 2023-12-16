import { ReactNode } from "react";
import Breadcrumbs from "../breadcrumbs";

const PageHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col space-y-5 md:flex-row md:justify-between md:items-center">
      <Breadcrumbs />

      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {children}
      </h1>
    </div>
  );
};
export default PageHeader;
