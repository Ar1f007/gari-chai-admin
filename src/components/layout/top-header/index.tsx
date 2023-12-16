import { ModeToggle } from "@/components/theme/mode-toggle";
import Breadcrumbs from "./breadcrumbs";

const TopHeader = () => {
  return (
    <header className="flex items-center justify-between gap-1 border-b px-4 py-2">
      <Breadcrumbs />
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
};

export default TopHeader;
