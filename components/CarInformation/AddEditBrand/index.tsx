"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { FormProvider } from "../../UI/Form/FormProvider";
import TextInput from "../../UI/Form/TextInput";
import {
  TAGS,
  TAddNewBrandPayload,
  addBrandName,
  invalidateAdminCache,
} from "@/services";
import { useUploadImage } from "@/hooks/useUploadImage";
import { mapValidationErrors } from "@/util/mapValidationError";

import { BrandInputs, createBrandSchema } from "@/schema/client/brand";
import RHFSingleImage from "../../UI/Form/RHFSingleImage";
import SubmitButton from "../../UI/Form/Button";

type Props = {
  formTitle: string;
};

const AddEditBrand = (props: Props) => {
  const { formTitle } = props;

  const { uploadImage } = useUploadImage();

  const methods = useForm<BrandInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    resolver: zodResolver(createBrandSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, isSubmitting },
  } = methods;

  async function onSubmit(data: BrandInputs) {
    const imgUrls = await uploadImage(data.image);

    if (!imgUrls) {
      toast.error(
        "Something went wrong while uploading image please try again"
      );
      return;
    }

    const payload: TAddNewBrandPayload = {
      name: data.name,
      image: {
        originalUrl: imgUrls.url,
        thumbnailUrl: imgUrls.thumbnailUrl,
      },
    };

    const res = await addBrandName(payload);

    if (!res) {
      toast.error("Something went wrong");
      return;
    }

    if (res.status === "success") {
      invalidateAdminCache([TAGS.brands]);

      toast.success("Brand added successfully");

      return;
    }

    if (res.status === "validationError") {
      mapValidationErrors(res.errors, methods);
      return;
    }

    toast.error(res.message ?? "Something went wrong");
  }

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-9 max-w-md">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            {formTitle}
          </h3>
        </div>

        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5 px-5 py-5 max-w-md">
            <TextInput
              name="name"
              label="Brand Name"
              placeholder="eg. Tata"
            />

            <RHFSingleImage
              name="image"
              maxSize={1024 * 100} // 100kb
            />

            <SubmitButton
              type="submit"
              loading={isSubmitting}
              title="Submit"
            />
          </div>
        </FormProvider>
      </div>
    </div>
  );
};
export default AddEditBrand;
