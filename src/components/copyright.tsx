import { themeConfig } from "@/configs/theme-config";
import { CopyrightIcon } from "lucide-react";

const Copyright = () => {
  return (
    <footer className="px-4 mt-auto mb-2">
      <div className="py-3 px-4 bg-muted rounded-xl">
        <p className="text-sm flex items-center gap-1">
          <i>
            <CopyrightIcon size={18} />
          </i>
          <span className="font-semibold">
            {themeConfig.templateName} {new Date().getFullYear()}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Copyright;
