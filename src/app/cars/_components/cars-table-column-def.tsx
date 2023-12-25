"use client";

// import { tasks, type Task } from "@/db/schema";
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types";
// import {
//   ArrowDownIcon,
//   ArrowRightIcon,
//   ArrowUpIcon,
//   CheckCircledIcon,
//   CircleIcon,
//   CrossCircledIcon,
//   DotsHorizontalIcon,
//   QuestionMarkCircledIcon,
//   StopwatchIcon,
// } from "@radix-ui/react-icons";
import { SlidersHorizontalIcon } from "lucide-react";

import { type ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import { catchError } from "@/lib/catch-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/shared/data-tabl/data-table-column-header";
import { TCarSchema } from "@/services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import { deleteTask, updateTaskLabel } from "../_actions/actions";

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
      header: () => <span className="text-center">Price</span>,
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

          meta: {
            columnName: "Price Negotiable",
          },
        },
      ],
    },

    {
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Open menu"
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <SlidersHorizontalIcon
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[160px]"
          >
            <DropdownMenuSub>
              {/* <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={row.original.label}
                  onValueChange={(value) => {
                    startTransition(async () => {
                      await updateTaskLabel({
                        id: row.original.id,
                        label: value as Task["label"],
                      });
                    });
                  }}
                >
                  {tasks.label.enumValues.map((label) => (
                    <DropdownMenuRadioItem
                      key={label}
                      value={label}
                      disabled={isPending}
                      className="capitalize"
                    >
                      {label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent> */}
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                startTransition(() => {
                  row.toggleSelected(false);

                  // toast.promise(
                  //   deleteTask({
                  //     id: row.original.id,
                  //   }),
                  //   {
                  //     loading: "Deleting...",
                  //     success: () => "Task deleted successfully.",
                  //     error: (err: unknown) => catchError(err),
                  //   }
                  // );
                });
              }}
            >
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
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
