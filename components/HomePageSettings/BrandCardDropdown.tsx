"use client";

import { invalidateAdminCache, invalidateUICache } from "@/services";
import {
  THomeSettingApiSchema,
  deleteHomeSettingItem,
  updateHomeSettingItem,
} from "@/services/home";
import { Button as RadixButton, DropdownMenu } from "@radix-ui/themes";
import { MoreVerticalIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import Modal from "../Dialog/Dialog";
import { FormProvider } from "../UI/Form/FormProvider";
import { useForm } from "react-hook-form";
import { RHFSelect } from "../UI/Form/RHFSelect";
import Button from "../UI/Form/Button";
import TextInput from "../UI/Form/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TPopularBrandEditFormPayload,
  popularBrandEditFormSchema,
} from "@/types/brand";

type Props = {
  item: THomeSettingApiSchema;
  pageSlug: string;
};

const BrandDropdownButton = ({ item, pageSlug }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const formHandler = useForm<TPopularBrandEditFormPayload>({
    defaultValues: {
      brand: {
        label: item.content.name,
        value: item.content,
      },
      sort: item.sort,
    },
    values: {
      brand: {
        label: item.content.name,
        value: item.content,
      },
      sort: item.sort,
    },
    resolver: zodResolver(popularBrandEditFormSchema),
  });

  function handleClose() {
    setIsOpen(false);
  }

  function handleEdit() {
    setIsOpen(true);
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

      invalidateUICache([item.sectionName]);

      toast.success("Deleted Successfully");

      return;
    }

    toast.error(res.message);
  }

  async function onSubmit(data: TPopularBrandEditFormPayload) {
    try {
      const res = await updateHomeSettingItem({
        ...item,
        sort: data.sort,
      });

      if (!res || res.status === "error" || res.status === "fail") {
        toast.error("Failed to update " + item.content.name);
        return;
      }

      if (res.status === "success") {
        toast.success("Updated Successfully");

        invalidateAdminCache([pageSlug]);
        const revalidated = invalidateUICache([pageSlug]);

        if (!revalidated) {
          toast.error(
            `Could not update the UI of main website for the tag: ${pageSlug}`
          );
        }

        handleClose();
      }
    } catch (e) {
      toast.error((e as Error)?.message ?? "Something went wrong");
    }
  }

  return (
    <>
      <DropdownMenu.Root>
        <RadixButton
          size="4"
          className="relative"
        >
          <span>{item.content.name}</span>

          <span className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer w-8 h-8 rounded flex items-center justify-center">
            <DropdownMenu.Trigger>
              <MoreVerticalIcon />
            </DropdownMenu.Trigger>
          </span>
        </RadixButton>

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

      {isOpen && (
        <Modal
          title="Update setting"
          isOpen={isOpen}
          onClose={handleClose}
          disableBackdropClick
        >
          <FormProvider
            methods={formHandler}
            onSubmit={formHandler.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4 mt-4">
              <RHFSelect
                name="brand"
                isDisabled
              />

              <TextInput
                name="sort"
                type="number"
                min={0}
              />
              <div className="flex gap-3">
                <Button
                  title="Save"
                  loading={formHandler.formState.isSubmitting}
                  loadingText={
                    formHandler.formState.isSubmitting ? "Updating..." : "Save"
                  }
                  type="submit"
                  classes="basis-2/4"
                />

                <button
                  className="rounded w-full dark:button-base outline outline-1 outline-boxdark hover:bg-black hover:text-white font-medium"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </FormProvider>
        </Modal>
      )}
    </>
  );
};
export default BrandDropdownButton;
