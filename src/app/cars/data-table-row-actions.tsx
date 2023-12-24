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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmDelete from "@/components/shared/delete-alert-dialog";

import { carSchema } from "@/services";

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
    const pathname = "/cars" + car.slug;
    router.push(pathname);
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
    } catch (error) {}
  }

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[160px]"
        >
          <DropdownMenuItem onClick={handleViewDetails}>
            View details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={toggleConfirmDialog}>
            Delete
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
