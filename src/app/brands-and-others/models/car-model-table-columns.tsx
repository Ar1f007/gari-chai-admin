"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, EditIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { TCarModelSchema } from "@/schemas/car-model";

export const carModelTableColumns: ColumnDef<TCarModelSchema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "carCollectionCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Car collection
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="xl:pl-2">Actions</div>,
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="icon"
            onClick={() => alert(brand._id)}
          >
            <div className="sr-only">Click to Edit</div>
            <EditIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => alert(brand._id)}
          >
            <div className="sr-only">Click to Delete</div>
            <Trash2Icon className="text-destructive" />
          </Button>
        </div>
      );
    },
  },
];
