import { TCarPartSchema } from "@/schemas/parts";
import { ColumnDef, Table } from "@tanstack/react-table";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../shared/data-table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DataTableSearchableColumn } from "@/types";
import { CarPartRowActions } from "./car-part-row-actions";
import { TAGS, invalidateAdminCache } from "@/services";
import { toast } from "sonner";
import { catchError } from "@/lib/catch-error";
import { deleteCarPart } from "@/services/cars/car-parts";

export function fetchCarPartsTableColumnDefs(
  isPending: boolean,
  startTransition: React.TransitionStartFunction
): ColumnDef<TCarPartSchema, unknown>[] {
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
          (row.getValue("posterImage") as TCarPartSchema["posterImage"])
            .thumbnailUrl ??
          (row.getValue("posterImage") as TCarPartSchema["posterImage"])
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
      id: "price",
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Price"
        />
      ),
      cell: ({ row }) => (
        <span className="capitalize truncate font-medium">
          {row.getValue("price")}
        </span>
      ),
    },

    {
      id: "stock",
      accessorKey: "stock",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Stock"
        />
      ),
      cell: ({ row }) => (
        <span className="capitalize truncate font-medium">
          {row.getValue("stock")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <CarPartRowActions
          row={row}
          isPending={isPending}
          startTransition={startTransition}
        />
      ),
    },
  ];
}

export async function deleteSelectedRows(
  table: Table<TCarPartSchema>,
  event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
) {
  event?.preventDefault();
  const selectedRows = table.getFilteredSelectedRowModel().rows as {
    original: TCarPartSchema;
  }[];

  try {
    const data = await Promise.all(
      selectedRows.map(
        async (row) =>
          await deleteCarPart({
            doc: row.original,
          })
      )
    );

    const atLeastOneCarGotDeleted = data.some(
      (car) => car.status === "success"
    );

    if (atLeastOneCarGotDeleted) {
      invalidateAdminCache([TAGS.carParts, TAGS.allHomeSettings]);
    }

    data.map((res) => {
      if (res.status !== "success") {
        toast.error(res.message);
      }
    });

    const couldNotDeleteAllSelectedRows = data.some(
      (res) => res.status !== "success"
    );

    if (couldNotDeleteAllSelectedRows) {
      return;
    }

    toast.success("Car Part deleted successfully");
  } catch (err: unknown) {
    catchError(err);
  }
}

export const searchableColumns: DataTableSearchableColumn<TCarPartSchema>[] = [
  {
    id: "name",
    title: "Part Name",
  },
];
