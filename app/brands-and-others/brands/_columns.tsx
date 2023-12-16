"use client";

import { Button } from "@/components/UI/Button";

import { TBrandSchema } from "@/services";
import { PLACEHOLDER_IMAGE } from "@/util/constants";
import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<TBrandSchema>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const value: TBrandSchema["image"] = row.getValue("image");

      const src =
        (value.thumbnailUrl ?? value.originalUrl) || PLACEHOLDER_IMAGE;

      return (
        <div>
          <Image
            alt={"row.cell.getContext()."}
            src={src}
            width={100}
            height={100}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "carCollectionCount",
    header: "Car collection",
  },
  {
    id: "actions",
    header: () => <div className="xl:pl-2">Actions</div>,
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="ghost"
            className="hover:bg-primary"
            onClick={() => alert(brand._id)}
          >
            <EditIcon />
          </Button>
          <Button
            variant="destructive"
            className="hover:bg-danger"
            onClick={() => alert(brand._id)}
          >
            <Trash2Icon className="hover:text-white" />
          </Button>
        </div>
      );
    },
  },
];
