import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { ReviewActionBtns } from "./review-action-btns";
import { TCarsReview } from "@/schemas/reviews";
import { DataTableRowActions } from "@/app/cars/_components/data-table-row-actions";

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
      cell: (info) => info.getValue() || "N/A",
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Title"
        />
      ),
      cell: (info) => info.getValue(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ReviewActionBtns review={row.original} />,
    },
  ];
}
