"use client";

import { useState } from "react";
import {
  THomeSettingApiSchema,
  deleteHomeSettingItem,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { MoreVerticalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditPopularBrand from "./edit-popular-brand";

const BrandDropdownBtn = ({ item }: { item: THomeSettingApiSchema }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  function hideEditForm() {
    setShowEditForm(false);
  }

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

      invalidateUICache({
        tags: [item.sectionName],
      });

      toast.success("Deleted Successfully");

      return;
    }

    toast.error(res.message);
  }

  return (
    <>
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between flex-wrap">
          <p className="w-fit [word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] px-[12px] py-0 text-[13px] font-normal leading-loose text-white bg-success">
            Sort: {item.sort}
          </p>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
              >
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditForm(true)}>
                Update Sort
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button
          className="w-full outline outline-1 outline-success"
          variant="ghost"
          size="sm"
        >
          {item.content.name}
        </Button>
      </div>

      {showEditForm && (
        <EditPopularBrand
          item={item}
          onSuccess={hideEditForm}
        />
      )}
    </>
  );
};
export default BrandDropdownBtn;
