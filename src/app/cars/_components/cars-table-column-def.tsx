"use client";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types";

import { type ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";

import { DataTableColumnHeader } from "@/components/shared/data-table/data-table-column-header";
import { TCarSchema } from "@/services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTableRowActions } from "./data-table-row-actions";

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
      id: "brand.name",
      accessorFn: (row) => row.brand.value,
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
      id: "brandModel.name",
      accessorFn: (row) => row.brandModel.value,
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<TCarSchema>[] = [
  // {
  //   id: "status",
  //   title: "Status",
  //   options: tasks.status.enumValues.map((status) => ({
  //     label: status[0]?.toUpperCase() + status.slice(1),
  //     value: status,
  //   })),
  // },
  // {
  //   id: "priority",
  //   title: "Priority",
  //   options: tasks.priority.enumValues.map((priority) => ({
  //     label: priority[0]?.toUpperCase() + priority.slice(1),
  //     value: priority,
  //   })),
  // },
];

export const searchableColumns: DataTableSearchableColumn<TCarSchema>[] = [
  {
    id: "name",
    title: "Car Name",
  },
];
