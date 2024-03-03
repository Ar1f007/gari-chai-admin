"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types";

import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { DataTableRowActions } from "./users-table-row-actions";
import { TAuthBasicUserInfo } from "@/schemas/user";

export function fetchUsersTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<TAuthBasicUserInfo, unknown>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
            // || (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    // {
    //   id: "name",
    //   accessorKey: "name",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader
    //       column={column}
    //       title="Name"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <span className="capitalize truncate font-medium">
    //       {row.getValue("name")}
    //     </span>
    //   ),
    // },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<TAuthBasicUserInfo>[] =
  [
    // {
    //   id: "launchedAt",
    //   title: "Launch Date",
    //   options: [
    //     { label: "Launched Already", value: "past" },
    //     { label: "Not Launched Yet", value: "future" },
    //   ].map((status) => ({
    //     label: status.label,
    //     value: status.value,
    //   })),
    // },
  ];

export const searchableColumns: DataTableSearchableColumn<TAuthBasicUserInfo>[] =
  [
    // {
    //   id: "name",
    //   title: "Car Name",
    // },
  ];

export const initialColumnVisibility = {
  // launchedAt: true,
};
