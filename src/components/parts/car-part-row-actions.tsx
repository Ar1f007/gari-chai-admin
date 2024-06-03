import { TCarPartSchema } from "@/schemas/parts";
import { Row } from "@tanstack/react-table";
import { Fragment, TransitionStartFunction, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import {
  TAGS,
  UI_TAGS,
  endpoints,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import ConfirmDelete from "../shared/delete-alert-dialog";
import { deleteCarPart } from "@/services/cars/car-parts";
import { toast } from "sonner";
import { catchError } from "@/lib/catch-error";

type CarPartRowActionsProps = {
  row: Row<TCarPartSchema>;
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

export const CarPartRowActions = ({
  row,
  isPending,
  startTransition,
}: CarPartRowActionsProps) => {
  const carPart = row.original;

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  function handleViewDetails() {
    const pathname = endpoints.ui.baseUrl + "/parts/cars/" + carPart.slug;

    return pathname;
  }

  function handleEdit() {
    const pathname = "/parts/cars/edit/" + carPart.slug;
    return pathname;
  }

  function toggleConfirmDialog() {
    setShowConfirmDialog((prev) => !prev);
  }

  async function handleDelete() {
    try {
      row.toggleSelected(false);

      const res = await deleteCarPart({
        doc: carPart,
      });

      if (res.status === "success") {
        invalidateAdminCache([TAGS.allHomeSettings]);

        invalidateUICache({
          tags: [UI_TAGS.carParts],
        });

        toggleConfirmDialog();
        toast.success("Car Part deleted successfully");

        return;
      }

      throw new Error(res.message);
    } catch (err) {
      catchError(err);
    }
  }

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontalIcon
              className="h-4 w-4"
              aria-hidden="true"
            />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[160px]"
        >
          <DropdownMenuItem
            onClick={handleViewDetails}
            disabled={isPending}
          >
            <Link
              href={handleViewDetails()}
              target="_blank"
              className="w-full block"
            >
              View details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer w-full block"
            disabled={isPending}
          >
            <Link
              href={handleEdit()}
              className="w-full block"
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer w-full block"
            onClick={toggleConfirmDialog}
            disabled={isPending}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showConfirmDialog && (
        <ConfirmDelete
          isOpen={showConfirmDialog}
          onConfirm={() => startTransition(() => handleDelete())}
          loading={isPending}
          textWhileLoading="Deleting..."
          handleCancelBtnClick={toggleConfirmDialog}
          confirmBtnContent="Yes, Delete"
        />
      )}
    </Fragment>
  );
};
