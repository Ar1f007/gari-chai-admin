import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2Icon } from "lucide-react";
import { ReactNode } from "react";

type ConfirmDeleteProps = {
  isOpen: boolean;
  onConfirm: () => void;
  handleCancelBtnClick: () => void;

  dialogTitle?: string | ReactNode;
  dialogDescription?: string | ReactNode;
  confirmBtnContent?: string | ReactNode;
  cancelBtnContent?: string | ReactNode;
  loading?: boolean;
  textWhileLoading?: string;
};

const ConfirmDelete = ({
  isOpen = false,
  dialogTitle = "Are you absolutely sure?",
  dialogDescription = "This action cannot be undone.",
  confirmBtnContent = "Continue",
  cancelBtnContent = "Cancel",
  handleCancelBtnClick,
  onConfirm,
  loading = false,
  textWhileLoading = "",
}: ConfirmDeleteProps) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelBtnClick}>
            {cancelBtnContent}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            {textWhileLoading ? textWhileLoading : confirmBtnContent}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ConfirmDelete;
