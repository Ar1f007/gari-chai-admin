import { ModeToggle } from "@/components/theme/mode-toggle";

const TopHeader = () => {
  return (
    <header className="flex items-center justify-between gap-1 border-b px-4 py-2">
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </header>
  );
};

export default TopHeader;
