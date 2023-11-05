import Button from "../UI/Form/Button";
import { useGetBrandsOptions } from "@/hooks/useGetBrandsOptions";
import { useEffect, useState } from "react";
import { FormProvider } from "../UI/Form/FormProvider";
import { RHFSelect } from "../UI/Form/RHFSelect";
import { useForm } from "react-hook-form";
import { TBrandSchema } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopularBrandFormSchema, TPopularBrandFormSchema } from "@/types/brand";
import { SelectOption } from "@/types/others";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/util/constants";
import { getFormattedBrandOptions } from "@/util";

type Props = {
  closeModalHandler: () => void;
};

const AddPopularBrandForm = (props: Props) => {
  const { closeModalHandler } = props;

  const [formattedBrandList, setFormattedBrandList] =
    useState<SelectOption<TBrandSchema>[]>();

  const { brands, isLoading } = useGetBrandsOptions();

  const formHandler = useForm<TPopularBrandFormSchema>({
    resolver: zodResolver(PopularBrandFormSchema),
  });

  async function onSubmit(data: TPopularBrandFormSchema) {
    //
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
              // title={isEditing ? "Update" : "Add"}
              loading={isLoading}
              // loadingText={isEditing ? "Updating..." : "Adding..."}
              // onClick={isEditing ? handleOnUpdateClick : handleOnAddClick}
              type="submit"
              title="Add To Popular"
              classes="basis-2/4"
            />

            <button
              className="rounded w-full dark:button-base outline outline-1 outline-boxdark hover:bg-black hover:text-white font-medium"
              onClick={closeModalHandler}
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
