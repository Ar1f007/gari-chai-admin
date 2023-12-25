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
    accessorFn: (row) => row.brand.name,
    id: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Brand"
      />
    ),
    cell: (info) => (
      <span className="capitalize">{info.getValue() as string}</span>
    ),
    meta: {
      columnName: "Brand",
    },
  },

  {
    accessorFn: (row) => row.brandModel.name,
    id: "brandModel",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Model"
      />
    ),
    cell: (info) => (
      <span className="capitalize">{info.getValue() as string}</span>
    ),

    meta: {
      columnName: "Model",
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Price</div>,
    columns: [
      {
        accessorFn: (row) => row.price.min,
        id: "priceMin",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Min Price"
          />
        ),
        cell: (info) => info.getValue(),
        enableHiding: true,
        meta: {
          columnName: "Price Min",
        },
      },
      {
        accessorFn: (row) => row.price.max,
        id: "priceMax",

        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Max Price"
          />
        ),
        cell: (info) => info.getValue(),
        enableHiding: true,
        meta: {
          columnName: "Price Max",
        },
      },
      {
        accessorFn: (row) => row.price.isNegotiable,
        id: "isNegotiable",
        cell: (info) => (info.getValue() === true ? "YES" : "NO"),
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Negotiable"
          />
        ),
        enableHiding: true,
        meta: {
          columnName: "Price Negotiable",
        },
      },
    ],
  },

  {
    accessorKey: "actions",
    header(props) {
      return <div>Actions</div>;
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
