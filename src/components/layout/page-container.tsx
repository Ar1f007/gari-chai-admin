import { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className="p-4 lg:p-[var(--paddingOffset)]">{children}</section>
  );
};
export default PageContainer;
