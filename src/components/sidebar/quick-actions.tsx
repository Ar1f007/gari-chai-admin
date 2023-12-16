import Link from "next/link";
import { routes } from "@/utils/routes";
import {
  CalendarIcon,
  LogOutIcon,
  RefreshCcwIcon,
  SandwichIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <h6 className="text-sm text-muted-foreground font-medium">
        Quick Actions
      </h6>

      <div className="flex gap-2 items-center justify-center flex-wrap">
        {/* <Link
          href={routes.orders}
          title="Orders"
        >
          <SandwichIcon />
        </Link>

        <Link
          href={routes.orders}
          title="Reservations"
        >
          <CalendarIcon />
        </Link> */}

        <Link
          href="#"
          title="refresh"
        >
          <RefreshCcwIcon />
        </Link>

        <Button
          size="icon"
          variant="ghost"
        >
          <LogOutIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
