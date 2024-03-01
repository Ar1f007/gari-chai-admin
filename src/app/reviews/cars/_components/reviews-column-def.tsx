import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { ReviewActionBtns } from "./review-action-btns";
import { TCarsReview } from "@/schemas/reviews";
import { DataTableFilterableColumn } from "@/types";

export function fetchReviewTableColumns(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<TCarsReview, unknown>[] {
  return [
    {
      accessorKey: "reviewType",
      header: "Type",
      cell: (info) => (
        <span className="capitalize">
          {(info.getValue() as string) || "N/A"}{" "}
        </span>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: (info) => (
        <span className="capitalize">{info.getValue() as string}</span>
      ),
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Current Status",
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

export const filterableColumns: DataTableFilterableColumn<TCarsReview>[] = [
  {
    id: "status",
    title: "Filter By Status",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Approved", value: "approved" },
      { label: "Discarded", value: "discard" },
    ].map((status) => ({
      label: status.label,
      value: status.value,
    })),
  },
];
