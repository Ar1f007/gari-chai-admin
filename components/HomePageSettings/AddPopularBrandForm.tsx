import Button from "../UI/Form/Button";
import { useGetBrandsOptions } from "@/hooks/useGetBrandsOptions";
import { useEffect, useState } from "react";
import { FormProvider } from "../UI/Form/FormProvider";
import { RHFSelect } from "../UI/Form/RHFSelect";
import { useForm } from "react-hook-form";
import {
  TBrandSchema,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  popularBrandFormSchema,
  TPopularBrandFormPayload,
} from "@/types/brand";
import { SelectOption } from "@/types/others";
import Image from "next/image";
import { HOME_SETTINGS_OPTIONS, PLACEHOLDER_IMAGE } from "@/util/constants";
import { getFormattedBrandOptions } from "@/util";
import { addPopularBrandsToHomePageSettings } from "@/services/home";
import { toast } from "sonner";

type Props = {
  closeModalHandler: () => void;
};

const AddPopularBrandForm = (props: Props) => {
  const { closeModalHandler } = props;

  const [formattedBrandList, setFormattedBrandList] =
    useState<SelectOption<TBrandSchema>[]>();

  const { brands, isLoading } = useGetBrandsOptions();

  const formHandler = useForm<TPopularBrandFormPayload>({
    resolver: zodResolver(popularBrandFormSchema),
  });

  async function handleOnSuccessAction(sectionToAdd: string) {
    let isEditing = false;
    toast.success(isEditing ? "Updated Successfully" : "Added successfully");

    await invalidateAdminCache([sectionToAdd]);

    closeModalHandler();

    const revalidated = await invalidateUICache([sectionToAdd]);

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

  return (
    <div className="pt-5">
      <FormProvider
        methods={formHandler}
        onSubmit={formHandler.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <RHFSelect
            name="popularBrands"
            isLoading={isLoading}
            options={formattedBrandList}
            isMulti
            formatOptionLabel={(brand) => (
              <div className="flex gap-3 items-center">
                <Image
                  src={
                    brand.value.image?.thumbnailUrl ??
                    brand.value.image?.originalUrl ??
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

          <div className="flex gap-3">
            <Button
              loading={isLoading}
              type="submit"
              title="Add To Popular"
              classes="basis-2/4"
            />

            <button
              className="rounded w-full dark:button-base outline outline-1 outline-boxdark hover:bg-black hover:text-white font-medium"
              onClick={closeModalHandler}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
export default AddPopularBrandForm;
