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
import { ChevronDownCircleIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditNewCar from "./edit-new-car";

const CarDropdownBtn = ({ item }: { item: THomeSettingApiSchema }) => {
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
      <div className="w-full space-y-2 p-4">
        <h3 className="text-center font-medium">{item.content.name}</h3>
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
                <ChevronDownCircleIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditForm(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {showEditForm && (
        <EditNewCar
          item={item}
          onSuccess={hideEditForm}
        />
      )}
    </>
  );
};
export default CarDropdownBtn;
