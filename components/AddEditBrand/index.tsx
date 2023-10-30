"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { toast } from "sonner";

import { FormProvider } from "../UI/Form/FormProvider";
import TextInput from "../UI/Form/TextInput";
import { SingleImageDropzone } from "../UI/Form/SingleImageDropzone";
import { addBrandName } from "@/services";
import { useUploadImage } from "@/hooks/useUploadImage";
import { mapValidationErrors } from "@/util/mapValidationError";

import { BrandInputs, createBrandSchema } from "@/schema/client/brand";
import { TBrandPayload } from "@/types/brand";

type Props = {
  formTitle: string;
};

const AddEditBrand = (props: Props) => {
  const { formTitle } = props;

  const [file, setFile] = useState<File | undefined>();

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
    let imgUrls = Object.assign({});

    if (file) {
      try {
        const res = await uploadImage(file);

        imgUrls.originalUrl = res?.url;
        imgUrls.thumbnailUrl = res?.thumbnailUrl;
      } catch (e) {
        toast.error("Something went wrong while uploading image");
        return;
      }
    }

    const payload: TBrandPayload = {
      name: data.name,
      image: !isEmpty(imgUrls) ? { ...imgUrls } : undefined,
    };

    const res = await addBrandName(payload);

    if (!res) return;

    if (res.status === "success") {
      toast.success("Brand added successfully");

      return;
    }

    if (res.status === "validationError") {
      mapValidationErrors(res.errors, methods);
      return;
    }
  }

  useEffect(() => {
    reset();
    setFile(undefined);
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

            <SingleImageDropzone
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
              width={200}
              height={200}
              dropzoneOptions={{
                maxSize: 1024 * 100,
              }}
            />

            <button
              className={clsx(
                "flex w-full justify-center items-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 cursor-pointer transition-all duration-200",
                { "bg-opacity-30": isSubmitting }
              )}
              disabled={isSubmitting}
              type="submit"
            >
              <span>Submit</span>
            </button>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};
export default AddEditBrand;
