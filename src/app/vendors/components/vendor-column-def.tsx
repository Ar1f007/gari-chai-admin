import * as React from "react";
import { TVendorSchema } from "@/schemas/vendor";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";

export function fetchVendorTableColumns(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<TVendorSchema, unknown>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Name"
        />
      ),
      cell: (info) => info.getValue(),
    },

    {
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Phone"
        />
      ),
      cell: (info) => info.getValue(),
    },

    {
      accessorKey: "carCollectionCount",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Total Cars"
        />
      ),
      cell: (info) => info.getValue(),
    },

    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Email"
        />
      ),
      cell: ({ row }) => <span>{row.getValue("email") || "N/A"}</span>,
    },
    {
      accessorKey: "address",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Address"
        />
      ),
      cell: ({ row }) => <span>{row.getValue("address") || "N/A"}</span>,
    },
  ];
}
