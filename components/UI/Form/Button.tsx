import LoaderWithText from "@/components/loaders/WithText";
import clsx from "clsx";
import { HTMLAttributes } from "react";

type Props = {
  title: string;
  loading?: boolean;
  type?: "submit" | "button" | "reset";
  loadingText?: string;
  onClick?: () => void;
  classes?: string;
};

const Button = ({
  loading = false,
  title,
  type = "button",
  loadingText = "Loading...",
  onClick,
  classes,
}: Props) => {
  return (
    <button
      className={clsx(
        "bg-primary hover:bg-primary/75 p-3 disabled:opacity-50 transition inline-flex items-center justify-center space-x-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:z-10 shrink-0 focus:ring-blue-600 text-white font-medium rounded-md",
        classes
      )}
      disabled={loading}
      type={type}
      onClick={onClick}
    >
      {loading ? <LoaderWithText text={loadingText} /> : title}
    </button>
  );
};
export default Button;
