import { Button } from "@/components/ui/button";
import { ComponentProps, ReactElement } from "react";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

type LoadingBtnProps = {
  isLoading: boolean;
  icon?: ReactElement;
  textWhileLoading?: string;
  loaderIconClassName?: string;
  loaderIcon?: ReactElement;
} & ComponentProps<typeof Button>;
const LoadingButton = ({
  isLoading,
  textWhileLoading,
  icon: Icon,
  loaderIcon,
  loaderIconClassName,
  children,
  ...rest
}: LoadingBtnProps) => {
  const iconElement = isLoading ? (
    loaderIcon ? (
      loaderIcon
    ) : (
      <Loader2Icon
        aria-hidden="true"
        className={cn(
          "animate-spin",
          {
            "mr-2": children || textWhileLoading,
          },
          loaderIconClassName
        )}
      />
    )
  ) : Icon ? (
    Icon
  ) : null;

  const contentElement = isLoading ? textWhileLoading || children : children;

  return (
    <Button
      aria-busy={isLoading ? "true" : "false"}
      aria-label={isLoading ? "Loading" : undefined}
      disabled={isLoading}
      {...rest}
    >
      {iconElement && (
        <span aria-hidden={isLoading ? "true" : "false"}>{iconElement}</span>
      )}
      {contentElement}
    </Button>
  );
};

export default LoadingButton;
