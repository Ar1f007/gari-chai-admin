"use client";

import { useUploadImage } from "@/hooks/useUploadImage";
import { SliderInputs, sliderSchema } from "@/schema/slider";
import { TSlider } from "@/services/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormProvider } from "../UI/Form/FormProvider";
import RHFSingleImage from "../UI/Form/RHFSingleImage";
import Image from "next/image";
import TextInput from "../UI/Form/TextInput";
import RHFSwitch from "../UI/Form/RHFSwitch";
import SubmitButton from "@/components/UI/Form/Button";
import { useState } from "react";

export const EditSlider = ({
  slider,
  onClose,
}: {
  slider: TSlider;
  onClose: () => void;
}) => {
  const [openImgForm, setOpenImgForm] = useState(false);
  const { uploadImage } = useUploadImage();

  const methods = useForm<SliderInputs>({
    defaultValues: {
      title: slider.title,
      link: slider.link,
      showTitle: slider.showTitle,
      sliderImg: undefined,
    },

    resolver: zodResolver(sliderSchema),
  });

  async function handleSubmit(data: any) {}

  return (
    <div className="flex flex-col gap-9 w-full max-w-md">
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit}
      >
        <div className="p-5">
          <div className="space-y-5">
            {!openImgForm && (
              <div>
                <Image
                  src={slider.imgUrl}
                  alt="slider"
                  width={600}
                  height={100}
                  className="max-h-[150px] object-cover"
                />
                <button
                  type="button"
                  onClick={() => setOpenImgForm(true)}
                  className="border-1 border-primary p-2 bg-danger rounded-md mt-5"
                >
                  Remove
                </button>
              </div>
            )}

            {openImgForm && (
              <>
                <RHFSingleImage
                  name="sliderImg"
                  maxSize={1024 * 300} // 300kb
                />

                <button
                  type="button"
                  onClick={() => setOpenImgForm(false)}
                  className="border-1 border-primary p-2 bg-danger rounded-md mt-5"
                >
                  Cancel
                </button>
              </>
            )}

            <TextInput
              name="title"
              defaultValue={slider.title}
            />

            <TextInput
              name="sliderLink"
              defaultValue={slider.link}
            />

            <TextInput
              name="sort"
              defaultValue={slider.sort}
              type="number"
            />

            <RHFSwitch
              name="showTitle"
              checkedText="Display Title"
              unCheckedText="Hide Title"
            />

            <div className="flex gap-5 items-center">
              <SubmitButton
                type="submit"
                loading={methods.formState.isSubmitting}
                title="Upload"
                loadingText="Uploading..."
                classes="basis-1/2"
              />

              <button
                className="rounded dark:button-base outline outline-1 outline-boxdark hover:bg-black hover:text-white font-medium basis-1/2"
                onClick={onClose}
                type="reset"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
