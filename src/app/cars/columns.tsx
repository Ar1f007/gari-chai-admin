"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/data-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { TCarSchema } from "@/services";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    accessorKey: "posterImage",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Image"
      />
    ),
    cell: ({ row }) => {
      const src =
        (row.getValue("posterImage") as TCarSchema["posterImage"])
          .thumbnailUrl ??
        (row.getValue("posterImage") as TCarSchema["posterImage"]).originalUrl;
      return (
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={src}
            alt={row.getValue("name")}
          />
          <AvatarFallback>{row.getValue("name")}</AvatarFallback>
        </Avatar>
      );
    },
    enableSorting: false,
    meta: {
      columnName: "Image",
    },
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
    meta: {
      columnName: "Brand",
    },
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
    meta: {
      columnName: "Model",
    },
  },
  {
    accessorKey: "actions",
    header(props) {
      return <div>Actions</div>;
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
