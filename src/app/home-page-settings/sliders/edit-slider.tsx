"use client";

import SwitchField from "@/components/form/switch-field";
import TextField from "@/components/form/text-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { EditSliderInputs, editSliderSchema } from "@/schemas/slider";
import { TAGS, invalidateAdminCache, invalidateUICache } from "@/services";

import { TSlider, sliderService } from "@/services/slider";
import { mapValidationErrors } from "@/utils/mapValidationError";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const EditSlider = ({
  slider,
  hideForm,
}: {
  slider: TSlider;
  hideForm: () => void;
}) => {
  const [openImgForm, setOpenImgForm] = useState(false);
  const { uploadImage } = useUploadImage();

  const form = useForm({
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

      if (res.status === "success") {
        toast.success("Slider updated successfully");
        invalidateAdminCache([TAGS.sliders]);
        invalidateUICache({
          tags: [TAGS.sliders],
        });
        hideForm();
        return;
      }

      if (res.status === "validationError") {
        mapValidationErrors(res.errors, form);
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
    <Dialog
      defaultOpen
      onOpenChange={hideForm}
    >
      <DialogContent className="bg-input">
        <DialogHeader>
          <DialogTitle>Edit Slider</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(updateSlider)}>
                <div className="space-y-5">
                  {!openImgForm && (
                    <div>
                      <Image
                        src={slider.imgUrl}
                        alt="slider"
                        width={200}
                        height={100}
                        className="w-auto max-h-[150px] object-cover"
                      />

                      <Button
                        variant="destructive"
                        className="mt-4"
                        size="sm"
                        onClick={() => setOpenImgForm(true)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}

                  {openImgForm && (
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
                          <FormDescription>
                            Max allowed size 300KB
                          </FormDescription>
                          <FormMessage />

                          <Button
                            variant="destructive"
                            className="mt-4"
                            size="sm"
                            onClick={() => setOpenImgForm(false)}
                          >
                            Cancel
                          </Button>
                        </FormItem>
                      )}
                    />
                  )}

                  <TextField<EditSliderInputs>
                    name="title"
                    placeholder="max 30 characters"
                    maxLength={30}
                  />

                  <TextField<EditSliderInputs>
                    name="link"
                    label="Go to link"
                    placeholder="only the end part eg. /cars"
                    defaultValue="/"
                  />

                  <TextField<EditSliderInputs>
                    name="sort"
                    label="Sort"
                    type="number"
                    min={0}
                  />

                  <SwitchField<EditSliderInputs>
                    name="showTitle"
                    checkedText="Display title on slider"
                    unCheckedText="Hide title on slider"
                  />

                  <SwitchField<EditSliderInputs>
                    name="status"
                    checkedText="Currently active"
                    unCheckedText="Marked as deactivated"
                  />

                  <SwitchField<EditSliderInputs>
                    name="type"
                    checkedText="Creating desktop slider"
                    unCheckedText="Creating mobile slider"
                  />

                  <div className="flex gap-5">
                    <LoadingBtn
                      type="submit"
                      isLoading={form.formState.isSubmitting}
                      btnText="Save"
                    />

                    <Button
                      variant="destructive"
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default EditSlider;
