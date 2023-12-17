import { Loader2Icon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type LoadingBtnProps = {
  isLoading: boolean;
  btnText?: string;
} & ComponentProps<typeof Button>;

export const LoadingBtn = ({
  isLoading,
  btnText,
  ...props
}: LoadingBtnProps) => {
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <Loader2Icon
          className={cn("h-4 w-4 animate-spin", btnText && "mr-2")}
        />
      )}
      {btnText && btnText}
    </Button>
  );
};
