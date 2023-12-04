"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/UI/Form/Button";
import { FormProvider } from "@/components/UI/Form/FormProvider";
import { useForm } from "react-hook-form";
import RHFSingleImage from "@/components/UI/Form/RHFSingleImage";
import TextInput from "@/components/UI/Form/TextInput";
import SubmitButton from "@/components/UI/Form/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SliderInputs, sliderSchema } from "@/schema/slider";
import RHFSwitch from "@/components/UI/Form/RHFSwitch";

const SliderPage = () => {
  const [showForm, setShowForm] = useState(false);

  const methods = useForm<SliderInputs>({
    defaultValues: {
      title: "",
      sliderLink: "/",
      showTitle: true,
      sliderImg: undefined,
    },
    resolver: zodResolver(sliderSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  function hideForm() {
    setShowForm(false);
  }

  function onSubmit(data: SliderInputs) {
    console.log({ data });
  }

  return (
    <>
      <Breadcrumb pageName="Home Sliders" />
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
                        name="sliderLink"
                        label="Go to link"
                        defaultValue="/"
                      />

                      <RHFSwitch
                        name="showTitle"
                        checkedText="Display Title"
                        unCheckedText="Hide Title"
                      />

                      <div className="flex gap-5 items-center">
                        <SubmitButton
                          type="submit"
                          loading={isSubmitting}
                          title="Submit"
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
export default SliderPage;
