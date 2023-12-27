"use client";

import { Fragment, useState } from "react";
import { Row } from "@tanstack/react-table";

import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmDelete from "@/components/shared/delete-alert-dialog";

import {
  TAGS,
  carSchema,
  deleteCar,
  endpoints,
  invalidateAdminCache,
} from "@/services";
import { toast } from "sonner";
import { catchError } from "@/lib/catch-error";
import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const car = carSchema.parse(row.original);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function handleViewDetails() {
    const carType = car.carType === "new" ? "cars" : "used-cars";

    const pathname = endpoints.ui.baseUrl + "/" + carType + "/" + car.slug;

    return pathname;
  }

  function handleEdit() {
    const pathname = "/cars/edit/" + car.slug;
    router.push(pathname);
  }

  function toggleConfirmDialog() {
    setShowConfirmDialog((prev) => !prev);
  }

  async function handleDelete() {
    try {
      setLoading(true);
      row.toggleSelected(false);

      const res = await deleteCar({
        doc: car,
      });

      if (res.status === "success") {
        invalidateAdminCache([
          TAGS.cars,
          TAGS.allHomeSettings,
          TAGS.brands,
          TAGS.brandModelList,
        ]);

        toggleConfirmDialog();
        toast.success("Car deleted successfully");

        return;
      }

      throw new Error(res.message);
    } catch (err: unknown) {
      catchError(err);
    } finally {
      setLoading(false);
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
          <DropdownMenuItem onClick={handleViewDetails}>
            <Link
              href={handleViewDetails()}
              target="_blank"
            >
              View details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Quick Actions</DropdownMenuSubTrigger>
            {/* <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={row.original.label}
                  onValueChange={(value) => {
                    startTransition(async () => {
                      await updateTaskLabel({
                        id: row.original.id,
                        label: value as Task["label"],
                      });
                    });
                  }}
                >
                  {tasks.label.enumValues.map((label) => (
                    <DropdownMenuRadioItem
                      key={label}
                      value={label}
                      disabled={isPending}
                      className="capitalize"
                    >
                      {label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent> */}
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={toggleConfirmDialog}>
            Delete
            {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showConfirmDialog && (
        <ConfirmDelete
          isOpen={showConfirmDialog}
          onConfirm={handleDelete}
          loading={loading}
          textWhileLoading="Deleting..."
          handleCancelBtnClick={toggleConfirmDialog}
          confirmBtnContent="Yes, Delete"
        />
      )}
    </Fragment>
  );
}
