"use client";

import FindAndSelectCars from "@/components/form/find-and-select-cars";
import SelectField from "@/components/form/select-field";
import SwitchField from "@/components/form/switch-field";
import TextField from "@/components/form/text-field";
import PageContainer from "@/components/layout/page-container";
import PageHeader from "@/components/layout/page-header.tsx";
import { AsyncReactSelect } from "@/components/ui/async-react-select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
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
import extDayjs from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import { CreateCampaignForm, createCampaign } from "@/schemas/campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { FocusEvent, Fragment } from "react";
import { useForm } from "react-hook-form";

const CreateCampaign = () => {
  const form = useForm<CreateCampaignForm>({
    criteriaMode: "all",
    defaultValues: {
      title: "",
      tagline: "",
      description: "",
      startDate: undefined,
      endDate: undefined,
      status: true,
      price: 0,
    },

    resolver: zodResolver(createCampaign),
  });

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

  async function onSubmit() {}

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

            <div
              className={cn("grid grid-cols-2 gap-2 items-center", {
                "items-center": !!form.formState.errors["price"],
              })}
            >
              <TextField<CreateCampaignForm>
                name="price"
                label="Campaign Special Price *"
                type="number"
                min={0}
              />

              <div
                className={cn("mt-7", {
                  "mt-0": !!form.formState.errors["price"],
                })}
              >
                <SwitchField<CreateCampaignForm>
                  name="status"
                  checkedText="Currently active"
                  unCheckedText="Marked as hidden"
                />
              </div>
            </div>

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
