"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { TBrandSchema } from "@/services";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";
import { BrandActionBtns } from "./action-btns";

export const brandTableColumns: ColumnDef<TBrandSchema>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const value: TBrandSchema["image"] = row.getValue("image");

      const src =
        (value.thumbnailUrl ?? value.originalUrl) || PLACEHOLDER_IMAGE;

      return (
        <Image
          alt="brand image"
          src={src}
          width={64}
          height={64}
          className="object-contain -ml-4 max-h-16"
        />
      );
    },
  },
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

      return <BrandActionBtns item={brand} />;
    },
  },
];
