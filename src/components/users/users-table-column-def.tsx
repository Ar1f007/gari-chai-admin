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
import { cn, formatDate } from "@/lib/utils";

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
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
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
      id: "firstName",
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="First Name"
        />
      ),
      cell: ({ row }) => (
        <span className="capitalize font-medium">
          {row.getValue("firstName")}
        </span>
      ),
    },
    {
      id: "lastName",
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Last Name"
        />
      ),
      cell: ({ row }) => (
        <span className="capitalize font-medium">
          {row.getValue("lastName")}
        </span>
      ),
    },
    {
      id: "role",
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Roles"
        />
      ),
      cell: ({ row }) => {
        const roles = row.original.role;
        const lastIndex = roles.length - 1;

        return roles.map((role, idx) => (
          <span
            key={idx}
            className={cn(
              "capitalize font-medium mr-1",
              idx === lastIndex && "mr-0"
            )}
          >
            {role}
            {idx == lastIndex ? null : ","}
          </span>
        ));
      },
      enableSorting: false,
    },

    {
      id: "local",
      accessorKey: "local",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Email / Phone"
        />
      ),
      cell: ({ row }) => {
        const credential = row.original.local.email || row.original.local.phone;

        return <span className="capitalize font-medium">{credential}</span>;
      },
      enableSorting: false,
    },

    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Joined"
        />
      ),
      cell: ({ row }) => {
        const date = formatDate(row.original.createdAt);

        return <span className="capitalize font-medium">{date}</span>;
      },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<TAuthBasicUserInfo>[] =
  [];

export const searchableColumns: DataTableSearchableColumn<TAuthBasicUserInfo>[] =
  [
    {
      id: "firstName",
      title: "First Name",
    },
    {
      id: "lastName",
      title: "Last Name",
    },
  ];

export const initialColumnVisibility = {};
