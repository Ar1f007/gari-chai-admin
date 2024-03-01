import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { ReviewActionBtns } from "./review-action-btns";
import { TCarsReview } from "@/schemas/reviews";

export function fetchReviewTableColumns(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<TCarsReview, unknown>[] {
  return [
    {
      accessorKey: "reviewType",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Type"
        />
      ),
      cell: (info) => (
        <span className="capitalize">
          {(info.getValue() as string) || "N/A"}{" "}
        </span>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Title"
        />
      ),
      cell: (info) => (
        <span className="capitalize">{info.getValue() as string}</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Current Status"
        />
      ),
      cell: (info) => (
        <span className="capitalize">
          {(info.getValue() as string) || "N/A"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ReviewActionBtns
          review={row.original}
          isPending={isPending}
          startTransition={startTransition}
        />
      ),
    },
  ];
}
