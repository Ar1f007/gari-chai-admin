"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/data-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { TCarSchema } from "@/services";
import { ColumnDef } from "@tanstack/react-table";

export const carTableColumns: ColumnDef<TCarSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),

    cell: ({ row }) => (
      <div className="max-w-[80px]">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },

  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Brand"
      />
    ),
    cell: ({ row }) => (
      <div>{(row.getValue("brand") as TCarSchema["brand"]).name}</div>
    ),
  },

  {
    accessorKey: "brandModel",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Model"
      />
    ),
    cell: ({ row }) => (
      <div>{(row.getValue("brandModel") as TCarSchema["brandModel"]).name}</div>
    ),
  },
  {
    accessorKey: "actions",
    header(props) {
      return <div>Actions</div>;
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
