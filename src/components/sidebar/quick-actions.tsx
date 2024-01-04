import { LogOutIcon, RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  function handleRefresh() {
    window.location.reload();
  }

  async function handleLogout() {}

  return (
    <div className="flex flex-col items-center space-y-3">
      <h6 className="text-sm text-muted-foreground font-medium">
        Quick Actions
      </h6>

      <div className="flex gap-2 items-center justify-center flex-wrap">
        <Button
          size="icon"
          variant="ghost"
          title="Refresh"
          onClick={handleRefresh}
        >
          <div className="sr-only">Refresh</div>
          <RefreshCcwIcon />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={handleLogout}
          title="Logout"
        >
          <div className="sr-only">Logout</div>
          <LogOutIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
