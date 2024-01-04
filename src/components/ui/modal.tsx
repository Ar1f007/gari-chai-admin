import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SettingsIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";

type ModalProps = {
  // required
  open: boolean;
  children: React.ReactNode;

  // optionals
  variant?: "standard" | "alert" | "full-screen";
  mode?: "create" | "update" | "change" | "delete" | "info";

  // Title
  title?: string;
  titleIcon?: React.ReactNode;
  showTitle?: boolean;
  showTitleIcon?: boolean;

  // Visibility
  showHeader?: boolean;
  showFooter?: boolean;
  showOkButton?: boolean;
  showCancelButton?: boolean;
  enableOverlayClick?: boolean;
  footerFillButtons?: boolean;

  // Text
  alertContent?: React.ReactNode;
  okButtonText?: string;
  cancelButtonText?: string;

  // Custom Icons & Classes
  closeIcon?: React.ReactNode;
  closeIconClasses?: string;
  contentClasses?: string;
  headerClasses?: string;
  titleClasses?: string;
  footerClasses?: string;
  okButtonClasses?: string;
  cancelButtonClasses?: string;

  // Loading State
  isLoading?: boolean;

  // Callbacks
  onClose?: () => void;
  onSubmit?: () => void;
};

const Modal = (props: ModalProps) => {
  const {
    open,
    children,

    mode = "create",
    variant = "standard",

    title = "",
    titleIcon = <SettingsIcon />,
    showTitle = true,
    showTitleIcon = true,

    showHeader = true,
    showFooter = true,
    showOkButton = true,
    showCancelButton = true,
    footerFillButtons = true,
    enableOverlayClick = false,

    alertContent,
    okButtonText = "Submit",
    cancelButtonText = "Cancel",

    closeIcon = <XIcon className="size-7" />,
    closeIconClasses = "",
    contentClasses = "",
    titleClasses = "",
    headerClasses = "",
    footerClasses = "",
    okButtonClasses = "",
    cancelButtonClasses = "",

    isLoading = false,

    onSubmit,
    onClose,
  } = props;

  const headerClass = cn(
    "grid items-center p-4 max-h-[64px]",
    {
      "bg-secondary":
        (mode === "create" || mode === "info") && variant === "standard",
      "bg-primary":
        (mode === "update" || mode === "change") && variant === "standard",
      "bg-destructive": mode === "delete" && variant === "standard",
    },
    headerClasses
  );

  const contentClass = cn(
    "overflow-hidden",
    {
      "p-0 gap-0": variant === "standard",
      "p-4": variant === "alert",
      "p-0 max-w-full min-h-screen sm:rounded-none": variant === "full-screen",
    },
    contentClasses
  );

  const closeIconClass = cn(
    "absolute right-4 top-2 rounded-sm opacity-70 " +
      "transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 " +
      "focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none " +
      "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
    {
      "ring-offset-foreground": mode === "update" || mode === "delete",
      "ring-offset-accent":
        mode === "create" || mode === "change" || mode === "info",
    },
    closeIconClasses
  );

  const footerClass = cn(
    {
      "sm:space-x-0 *:flex-1 *:rounded-none": variant === "standard",
    },
    footerClasses
  );

  return (
    <Dialog
      open={open}
      onOpenChange={() => enableOverlayClick && onClose?.()}
    >
      <DialogContent className={contentClass}>
        {showHeader && (
          <DialogHeader className={headerClass}>
            <DialogTitle
              className={cn("flex items-center space-x-2", titleClasses)}
            >
              {showTitleIcon && <i>{titleIcon}</i>}
              {showTitle && <span className="text-truncate">{title}</span>}
            </DialogTitle>

            {variant === "alert" && alertContent && (
              <DialogDescription>{alertContent}</DialogDescription>
            )}

            {variant !== "alert" && (
              <DialogClose
                onClick={() => onClose?.()}
                className={closeIconClass}
              >
                {closeIcon}
                <span className="sr-only">Close</span>
              </DialogClose>
            )}
          </DialogHeader>
        )}

        {/* MAIN CONTENT */}
        {children}

        {showFooter && (
          <DialogFooter className={footerClass}>
            {showCancelButton && (
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={footerFillButtons ? "secondary" : "outline"}
                  onClick={() => onClose?.()}
                  className={cancelButtonClasses}
                >
                  {cancelButtonText}
                </Button>
              </DialogClose>
            )}

            {showOkButton && (
              <LoadingButton
                isLoading={isLoading}
                onClick={() => onSubmit?.()}
                variant={footerFillButtons ? "default" : "outline"}
                className={okButtonClasses}
              >
                {okButtonText}
              </LoadingButton>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
