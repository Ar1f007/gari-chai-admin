"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  popularBrandFormSchema,
  TPopularBrandFormPayload,
} from "@/types/brand";
import { HOME_SETTINGS_OPTIONS, PLACEHOLDER_IMAGE } from "@/utils/constants";
import { SelectOption } from "@/types/others";
import {
  addPopularBrandsToHomePageSettings,
  invalidateAdminCache,
  invalidateUICache,
  TBrandSchema,
} from "@/services";
import { useGetBrandsOptions } from "@/hooks/useGetBrandsOptions";
import { toast } from "sonner";
import { getFormattedBrandOptions } from "@/utils";
import Image from "next/image";
import { LoadingBtn } from "../ui/loading-btn";
import SelectField from "../form/select-field";
import { Todo } from "@/types";

const AddPopularBrandsForm = () => {
  const [showForm, setShowForm] = useState(false);

  const form = useForm<TPopularBrandFormPayload>({
    resolver: zodResolver(popularBrandFormSchema),
  });

  const [formattedBrandList, setFormattedBrandList] =
    useState<SelectOption<TBrandSchema>[]>();

  const { brands, isLoading } = useGetBrandsOptions({
    filterOutPopularBrands: true,
  });

  function closeForm() {
    setShowForm(false);
  }

  async function handleOnSuccessAction(sectionToAdd: string) {
    let isEditing = false;
    toast.success(isEditing ? "Updated Successfully" : "Added successfully");

    await invalidateAdminCache([sectionToAdd]);

    closeForm();

    const revalidated = false;

    if (!revalidated) {
      toast.error(`Could not update the UI of main website: ${sectionToAdd}`);
    }
  }

  async function onSubmit(data: TPopularBrandFormPayload) {
    const brands = data.popularBrands.map(({ value }) => ({
      contentId: value._id,
      content: value,
      sectionName: HOME_SETTINGS_OPTIONS.popularBrands,
      tags: [],
      sort: 0,
    }));

    try {
      const res = await addPopularBrandsToHomePageSettings(brands);

      if (!res || res.status === "error" || res.status === "fail") {
        toast.error("Failed to add to the popular brands section");
        return;
      }

      if (res.status === "success") {
        handleOnSuccessAction(HOME_SETTINGS_OPTIONS.popularBrands);
      }
    } catch (error) {
      toast.error("something went wrong. Please try again");
    }
  }

  useEffect(() => {
    if (brands.length) {
      const brandList = getFormattedBrandOptions<TBrandSchema, true>(
        brands,
        true
      );

      setFormattedBrandList(brandList);
    }
  }, [brands]);

  console.log(formattedBrandList);

  return (
    <div className="space-y-5">
      <Button onClick={() => setShowForm(true)}>Add Popular Brands</Button>
      <Dialog
        open={showForm}
        // onOpenChange={() => setShowForm(false)}
      >
        <DialogContent className="bg-secondary/70">
          <DialogHeader>Add to Popular Brands Section</DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-5 space-y-5"
            >
              <div className="flex flex-col gap-5">
                <SelectField
                  label="Select Brands"
                  name="popularBrands"
                  options={formattedBrandList}
                  isLoading={isLoading}
                  isMulti
                  formatOptionLabel={(brand: Todo) => (
                    <div className="flex gap-3 items-center">
                      <Image
                        src={
                          (brand.value.image?.thumbnailUrl ??
                            brand.value.image?.originalUrl) ||
                          PLACEHOLDER_IMAGE
                        }
                        alt="brand logo"
                        width={60}
                        height={60}
                        className="bg-black p-2 rounded object-contain overflow-hidden"
                      />
                      <span>{brand.label}</span>
                    </div>
                  )}
                />

                <div className="flex gap-2">
                  <LoadingBtn
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                    isLoading={form.formState.isSubmitting}
                    btnText="Add"
                  />
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={closeForm}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddPopularBrandsForm;
