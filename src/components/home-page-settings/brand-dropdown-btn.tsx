"use client";

import {
  THomeSettingApiSchema,
  deleteHomeSettingItem,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BrandDropdownBtn = ({ item }: { item: THomeSettingApiSchema }) => {
  async function handleDelete() {
    const res = await deleteHomeSettingItem({
      itemId: item._id,
      sectionName: item.sectionName,
    });

    if (!res) {
      toast.error("Something went wrong");
      return;
    }

    if (res.status === "success") {
      invalidateAdminCache([item.sectionName]);

      invalidateUICache([item.sectionName]);

      toast.success("Deleted Successfully");

      return;
    }

    toast.error(res.message);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-full relative"
          size="sm"
        >
          <span>{item.content.name}</span>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default BrandDropdownBtn;
