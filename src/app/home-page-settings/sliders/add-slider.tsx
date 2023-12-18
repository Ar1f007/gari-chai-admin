"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import SwitchField from "@/components/form/switch-field";
import TextField from "@/components/form/text-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingBtn } from "@/components/ui/loading-btn";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
import { useUploadImage } from "@/hooks/useUploadImage";
import { SliderInputs, sliderSchema } from "@/schemas/slider";
import { TAGS, invalidateAdminCache, invalidateUICache } from "@/services";
import { sliderService } from "@/services/slider";
import { mapValidationErrors } from "@/utils/mapValidationError";

const AddSlider = () => {
  const [showForm, setShowForm] = useState(false);

  const { uploadImage } = useUploadImage();

  const form = useForm<SliderInputs>({
    defaultValues: {
      title: "",
      link: "/",
      showTitle: true,
      sliderImg: undefined,
      type: true,
    },
    resolver: zodResolver(sliderSchema),
  });

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

        form.reset();
        hideForm();

        invalidateAdminCache([TAGS.sliders]);
        invalidateUICache([TAGS.sliders]);

        return;
      }

      if (res.status === "validationError") {
        mapValidationErrors(res.errors, form);
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
    <div>
      <Button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-5"
      >
        {showForm ? "Hide Form" : "Add New Slider"}
      </Button>

      {showForm && (
        <div className="rounded-md outline outline-1 outline-muted p-5 shadow max-w-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <FormField
                  control={form.control}
                  name="sliderImg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slider Image</FormLabel>
                      <FormControl>
                        <SingleImageDropzone
                          {...field}
                          width={200}
                          height={200}
                          dropzoneOptions={{
                            maxSize: 1024 * 300, // 300 kb
                          }}
                        />
                      </FormControl>
                      <FormDescription>Max allowed size 300KB</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <TextField<SliderInputs>
                  name="title"
                  placeholder="max 30 characters"
                  maxLength={30}
                />

                <TextField<SliderInputs>
                  name="link"
                  label="Go to link"
                  placeholder="only the end part eg. /cars"
                  defaultValue="/"
                />

                <SwitchField<SliderInputs>
                  name="showTitle"
                  checkedText="Display title on slider"
                  unCheckedText="Hide title on slider"
                />

                <SwitchField<SliderInputs>
                  name="type"
                  checkedText="Creating desktop slider"
                  unCheckedText="Creating mobile slider"
                />

                <div className="flex gap-5">
                  <LoadingBtn
                    type="submit"
                    isLoading={form.formState.isSubmitting}
                    btnText="Upload"
                  />

                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={hideForm}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};
export default AddSlider;
