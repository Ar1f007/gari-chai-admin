"use client";

import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogContent,
} from "../ui/dialog";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import {
  TBrandSchema,
  THomeSettingApiSchema,
  invalidateAdminCache,
  invalidateUICache,
  updateHomeSettingItem,
} from "@/services";
import TextField from "../form/text-field";
import { LoadingBtn } from "../ui/loading-btn";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { HOME_SETTINGS_OPTIONS } from "@/utils/constants";
import {
  TCarPartHomeSettingEdit,
  TCarPartSchema,
  carPartHomeSettingEdit,
} from "@/schemas/parts";

const EditCarPart = ({
  item,
  onSuccess: closeForm,
}: {
  item: THomeSettingApiSchema;
  onSuccess: () => void;
}) => {
  const pageSlug = item.sectionName;

  const form = useForm({
    defaultValues: {
      carPart: {
        label: item.content.name,
        value: item.content as TCarPartSchema,
      },
      sort: item.sort,
    },

    resolver: zodResolver(carPartHomeSettingEdit),
  });

  async function handleUpdate(data: TCarPartHomeSettingEdit) {
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
        const revalidated = invalidateUICache({
          tags: [pageSlug],
        });

        if (!revalidated) {
          toast.error(
            `Could not update the UI of main website for the tag: ${pageSlug}`
          );
        }

        closeForm();
      }
    } catch (e) {
      toast.error((e as Error)?.message ?? "Something went wrong");
    }
  }
  return (
    <Dialog
      defaultOpen
      onOpenChange={closeForm}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Sort Value</DialogTitle>

          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleUpdate)}
                className="space-y-5"
              >
                <TextField name="sort" />

                <div className="flex gap-5">
                  <LoadingBtn
                    type="submit"
                    isLoading={form.formState.isSubmitting}
                    btnText="Save Change"
                  />

                  <Button
                    variant="destructive"
                    type="button"
                    className="w-full"
                    onClick={closeForm}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default EditCarPart;
