"use client";

import { TCarSchema, invalidateCache } from "@/services";
import { THomeSettingApiSchema, deleteHomeSettingItem } from "@/services/home";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { MoreVerticalIcon } from "lucide-react";
import { toast } from "sonner";

type Props = {
  item: THomeSettingApiSchema;
};
const DropdownButton = ({ item }: Props) => {
  function handleEdit() {}
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
      invalidateCache(item.sectionName);
      toast.success("Deleted Successfully");
      return;
    }

    toast.error(res.message);
  }

  return (
    <DropdownMenu.Root>
      <Button
        size="4"
        className="relative"
      >
        <span>{item.content.name}</span>

        <span className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer w-8 h-8 rounded flex items-center justify-center">
          <DropdownMenu.Trigger>
            <MoreVerticalIcon />
          </DropdownMenu.Trigger>
        </span>
      </Button>

      <DropdownMenu.Content className="w-30">
        <DropdownMenu.Item onClick={handleEdit}>Edit</DropdownMenu.Item>
        <DropdownMenu.Item
          color="red"
          onClick={handleDelete}
        >
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
export default DropdownButton;
