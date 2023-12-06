"use client";

import { useUploadImage } from "@/hooks/useUploadImage";
import {
  EditSliderInputs,
  SliderInputs,
  editSliderSchema,
  sliderSchema,
} from "@/schema/slider";
import { TSlider, sliderService } from "@/services/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormProvider } from "../UI/Form/FormProvider";
import RHFSingleImage from "../UI/Form/RHFSingleImage";
import Image from "next/image";
import TextInput from "../UI/Form/TextInput";
import RHFSwitch from "../UI/Form/RHFSwitch";
import SubmitButton from "@/components/UI/Form/Button";
import { useState } from "react";
import { toast } from "sonner";
import { TAGS, invalidateAdminCache, invalidateUICache } from "@/services";
import { mapValidationErrors } from "@/util/mapValidationError";

export const EditSlider = ({
  slider,
  onClose,
}: {
  slider: TSlider;
  onClose: () => void;
}) => {
  const [openImgForm, setOpenImgForm] = useState(false);
  const { uploadImage } = useUploadImage();

  const methods = useForm<EditSliderInputs>({
    defaultValues: {
      title: slider.title,
      link: slider.link,
      showTitle: slider.showTitle,
      sliderImg: undefined,
      sort: slider.sort,
      type: slider.type === "desktop",
      status: slider.status === "active",
    },

    resolver: zodResolver(editSliderSchema),
  });

  console.log(methods.formState.errors);

  async function handleImageUpload(img: File) {
    try {
      const res = await uploadImage(img);

      if (!res) {
        throw new Error("Could not upload image");
      }

      return res.url;
    } catch (error) {
      throw error;
    }
  }

  async function updateSlider(data: EditSliderInputs) {
    try {
      const imgUrl = data.sliderImg
        ? await handleImageUpload(data.sliderImg)
        : slider.imgUrl;
      const status = data.status ? "active" : "hidden";
      const type = data.type ? "desktop" : "mobile";

      const res = await sliderService.updateSlider({
        id: slider._id,
        slider: {
          imgUrl,
          link: data.link,
          showTitle: data.showTitle,
          sort: data.sort,
          status,
          type,
          title: data.title,
        },
      });

      console.log(res);

      if (res.status === "success") {
        toast.success("Slider updated successfully");
        invalidateAdminCache([TAGS.sliders]);
        invalidateUICache([TAGS.sliders]);
        onClose();
        return;
      }

      if (res.status === "validationError") {
        mapValidationErrors(res.errors, methods);
        return;
      }

      toast.error(res.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong");
      }
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex flex-col gap-9 w-full max-w-md">
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(updateSlider)}
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

            <TextInput name="title" />

            <TextInput name="link" />

            <TextInput
              name="sort"
              type="number"
            />

            <RHFSwitch
              name="showTitle"
              checkedText="Display Title"
              unCheckedText="Hide Title"
            />

            <RHFSwitch
              name="status"
              checkedText="Currently Active"
              unCheckedText="Marked as Hidden"
            />

            <RHFSwitch
              name="type"
              checkedText="Desktop Slider"
              unCheckedText="Mobile Slider"
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
