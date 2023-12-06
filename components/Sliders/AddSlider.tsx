"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { FormProvider } from "../UI/Form/FormProvider";
import Button from "../UI/Form/Button";
import RHFSingleImage from "../UI/Form/RHFSingleImage";
import TextInput from "../UI/Form/TextInput";
import RHFSwitch from "../UI/Form/RHFSwitch";
import SubmitButton from "@/components/UI/Form/Button";

import { useUploadImage } from "@/hooks/useUploadImage";
import { SliderInputs, sliderSchema } from "@/schema/slider";
import { sliderService } from "@/services/slider";
import { mapValidationErrors } from "@/util/mapValidationError";
import { TAGS, invalidateAdminCache, invalidateUICache } from "@/services";

export const AddSlider = () => {
  const [showForm, setShowForm] = useState(false);

  const { uploadImage } = useUploadImage();

  const methods = useForm<SliderInputs>({
    defaultValues: {
      title: "",
      link: "/",
      showTitle: true,
      sliderImg: undefined,
      type: true,
    },
    resolver: zodResolver(sliderSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  function hideForm() {
    setShowForm(false);
  }

  async function onSubmit(data: SliderInputs) {
    try {
      const imgRes = await uploadImage(data.sliderImg);
      if (!imgRes) {
        toast.error("Image uploading failed, please try again");
        return;
      }

      const res = await sliderService.create({
        ...data,
        type: data.type ? "desktop" : "mobile",
        imgUrl: imgRes.url,
      });

      if (res.status === "success") {
        toast.success("Slider added successfully");

        reset();
        hideForm();

        invalidateAdminCache([TAGS.sliders]);
        invalidateUICache([TAGS.sliders]);

        return;
      }

      if (res.status === "validationError") {
        mapValidationErrors(res.errors, methods);
        return;
      }

      toast.error(res.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }

      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <section className="w-full mt-5">
        <div className="flex flex-col gap-8 w-full items-start">
          <Button
            type="button"
            title="Add New Slider"
            onClick={() => setShowForm(true)}
          />

          {showForm && (
            <div className="flex flex-col gap-9 w-full max-w-md">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Add Slider
                  </h3>
                </div>

                <div className="p-5">
                  <FormProvider
                    methods={methods}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="space-y-5">
                      <RHFSingleImage
                        name="sliderImg"
                        maxSize={1024 * 300} // 300kb
                      />

                      <TextInput
                        name="title"
                        label="Slider Title"
                        placeholder="max 30 characters"
                        maxLength={30}
                      />

                      <TextInput
                        name="link"
                        label="Go to link"
                        defaultValue="/"
                      />

                      <RHFSwitch
                        name="showTitle"
                        checkedText="Display Title"
                        unCheckedText="Hide Title"
                      />

                      <RHFSwitch
                        name="type"
                        checkedText="Creating desktop slider"
                        unCheckedText="Creating mobile slider"
                      />

                      <div className="flex gap-5 items-center">
                        <SubmitButton
                          type="submit"
                          loading={isSubmitting}
                          title="Upload"
                          loadingText="Uploading..."
                          classes="basis-1/2"
                        />

                        <button
                          className="rounded dark:button-base outline outline-1 outline-boxdark hover:bg-black hover:text-white font-medium basis-1/2"
                          onClick={hideForm}
                          type="reset"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </FormProvider>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
