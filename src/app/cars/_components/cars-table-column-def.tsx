"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types";

import { VisibilityState, type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { TCarSchema } from "@/services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableRowActions } from "./data-table-row-actions";
import { formatDate } from "@/lib/utils";

export function fetchCarsTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<TCarSchema, unknown>[] {
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
    {
      id: "posterImage",
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
          (row.getValue("posterImage") as TCarSchema["posterImage"])
            .originalUrl;
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
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Name"
        />
      ),
      cell: ({ row }) => (
        <span className="capitalize truncate font-medium">
          {row.getValue("name")}
        </span>
      ),
    },
    {
      id: "brand.label",
      accessorFn: (row) => row.brand.label,
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
      id: "brandModel.label",
      accessorFn: (row) => row.brandModel.label,
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
      id: "price",
      accessorKey: "price",
      header: () => <div className="text-center">Price</div>,
      columns: [
        {
          accessorFn: (row) => row.price.min,
          id: "price.min",
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Min Price"
            />
          ),
          cell: (info) => info.getValue(),
          meta: {
            columnName: "Price Min",
          },
        },
        {
          accessorFn: (row) => row.price.max,
          id: "price.max",

          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Max Price"
            />
          ),
          cell: (info) => info.getValue(),

          meta: {
            columnName: "Price Max",
          },
        },
        {
          accessorFn: (row) => row.price.isNegotiable,
          id: "price.isNegotiable",
          cell: (info) => (info.getValue() === true ? "YES" : "NO"),
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title="Negotiable"
            />
          ),

          meta: {
            columnName: "Price Negotiable",
          },
        },
      ],
      enableSorting: false,
    },

    {
      id: "launchedAt",
      accessorKey: "launchedAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Launch Date"
        />
      ),
      cell: (info) => (
        <span>
          {formatDate(
            info.row.getValue("launchedAt"),
            "ddd, MMM D, YYYY h:mm A"
          )}
        </span>
      ),
      enableHiding: true,
      meta: {
        columnName: "Launched Status",
      },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<TCarSchema>[] = [
  {
    id: "launchedAt",
    title: "Launch Date",
    options: [
      { label: "Launched Already", value: "past" },
      { label: "Not Launched Yet", value: "future" },
    ].map((status) => ({
      label: status.label,
      value: status.value,
    })),
  },
];

export const searchableColumns: DataTableSearchableColumn<TCarSchema>[] = [
  {
    id: "name",
    title: "Car Name",
  },
];

export const initialColumnVisibility = {
  launchedAt: true,
};
