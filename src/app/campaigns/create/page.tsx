"use client";

import { Fragment, FocusEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import extDayjs from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import { CreateCampaignForm, createCampaign } from "@/schemas/campaign";

import FindAndSelectCars from "@/components/form/find-and-select-cars";
import SwitchField from "@/components/form/switch-field";
import TextField from "@/components/form/text-field";
import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/layout/page-header.tsx";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import { SingleImageDropzone } from "@/components/ui/single-image-dropzone";
import { createCarCampaign } from "@/services/campaign/car-campaign";
import { toast } from "sonner";
import {
  TAGS,
  invalidateAdminCache,
  invalidateAdminPathCache,
} from "@/services";
import { routes } from "@/utils/routes";
import { mapValidationErrors } from "@/utils/mapValidationError";
import { useUploadImage } from "@/hooks/useUploadImage";
import { TImageSchema } from "@/schemas/utils";
import { useRouter } from "next/navigation";

const CreateCampaign = () => {
  const form = useForm<CreateCampaignForm>({
    mode: "onTouched",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      tagline: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      isActive: true,
    },

    resolver: zodResolver(createCampaign),
  });

  const { uploadImage } = useUploadImage();

  const router = useRouter();

  function getFormattedCampaignDate(date: Date | undefined) {
    if (!date) return;

    return extDayjs(date).format("MMM D, YYYY h:mm A");
  }

  function getTime(selectedDate: Date | undefined) {
    if (!selectedDate) return "";

    const hour = extDayjs(selectedDate).get("hour");
    const min = extDayjs(selectedDate).get("minute");

    return hour + ":" + min;
  }

  function setDate(
    e: FocusEvent<HTMLInputElement, Element>,
    selectedDate: Date | undefined,
    fieldName: keyof CreateCampaignForm
  ) {
    const [hour, min] = e.target.value.split(":");
    const selectedDateTime = extDayjs(selectedDate);

    const newDate = selectedDateTime.set("hour", +hour).set("minute", +min);

    form.setValue(fieldName, newDate.toDate());
  }

  async function uploadPosterImage(image: File): Promise<TImageSchema | null> {
    try {
      const res = await uploadImage(image);

      if (!res) {
        return null;
      }

      return {
        thumbnailUrl: res.thumbnailUrl ?? res.url,
        originalUrl: res.url,
      };
    } catch (error) {
      return null;
    }
  }

  async function onSubmit(data: CreateCampaignForm) {
    const posterImage = await uploadPosterImage(data.posterImage as File);

    if (!posterImage) {
      toast.error("Could not upload poster image");
      return;
    }

    const payload = {
      ...data,
      posterImage,
      cars: data.cars.map((car) => ({
        carId: car.value,
        type: car.type,
        campaignPrice: car.price,
      })),
    };

    const res = await createCarCampaign(payload);

    if (!res) {
      toast.error("Something went Wrong, Please try again!");
      return;
    }

    if (res.status == "success") {
      form.reset();

      invalidateAdminCache([TAGS.carCampaigns]);
      toast.success("Campaign created successfully");

      router.push(routes.campaignRoutes.campaigns);
      return;
    }

    if (res.status == "validationError") {
      mapValidationErrors(res.errors, form);

      toast.error(res.message);
      return;
    }

    toast.error(res.message);
  }

  return (
    <Fragment>
      <PageHeader>Create Campaign</PageHeader>

      <PageContainer>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 py-8 bg-muted px-4 rounded max-w-3xl mx-auto"
          >
            <TextField<CreateCampaignForm>
              name="title"
              label="Title*"
              placeholder="Campaign title (max: 100 characters) *"
            />

            <FindAndSelectCars />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description{" "}
                    <span className="text-xs text-primary">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="small description about the campaign..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Datetime *</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "hover:bg-background/50 justify-start w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              getFormattedCampaignDate(field.value)
                            ) : (
                              <span>Pick a start date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) =>
                            date.setHours(0, 0, 0, 0) <
                            new Date().setHours(0, 0, 0, 0)
                          }
                          footer={
                            <Input
                              type="time"
                              defaultValue={getTime(field.value)}
                              onBlur={(e) =>
                                setDate(e, field.value, "startDate")
                              }
                            />
                          }
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Datetime *</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "hover:bg-background/50 justify-start w-full",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              getFormattedCampaignDate(field.value)
                            ) : (
                              <span>Pick an end date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) =>
                            date.setHours(0, 0, 0, 0) <
                            new Date().setHours(0, 0, 0, 0)
                          }
                          footer={
                            <Input
                              type="time"
                              defaultValue={getTime(field.value)}
                              onBlur={(e) => setDate(e, field.value, "endDate")}
                            />
                          }
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="posterImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload a Poster Image</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <SwitchField<CreateCampaignForm>
              name="isActive"
              checkedText="Campaign is Active"
              unCheckedText="Campaign is Hidden"
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create Campaign
            </Button>
          </form>
        </Form>
      </PageContainer>
    </Fragment>
  );
};
export default CreateCampaign;
