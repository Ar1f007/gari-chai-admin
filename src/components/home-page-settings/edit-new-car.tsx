"use client";

import { useForm, useWatch } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Form } from "../ui/form";
import SelectField from "../form/select-field";
import { TCarSchema, THomeSettingApiSchema } from "@/services";
import {
  HOME_SETTINGS_OPTIONS,
  MAX_SELECTABLE_TAGS_OPTIONS,
  carCategoryOptions,
  carSubCategoryOptions,
} from "@/utils/constants";
import TextField from "../form/text-field";
import { LoadingBtn } from "../ui/loading-btn";
import { Button } from "../ui/button";
import { EditHomePageCarInputs } from "@/schemas/home-page-edit-car";

const EditNewCar = ({
  item,
  onSuccess: closeForm,
}: {
  item: THomeSettingApiSchema;
  onSuccess: () => void;
}) => {
  const car = item.content as TCarSchema;

  const form = useForm<EditHomePageCarInputs>({
    criteriaMode: "all",
    mode: "onTouched",

    defaultValues: {
      selectedCar: {
        value: car,
        label: car.name,
      },
      sectionToAdd: {
        value: item.sectionName,
        label: item.sectionName,
      },
      tags: item.tags.length
        ? item.tags.map((item) => ({
            value: item,
            label: item,
          }))
        : [],
      sort: item.sort,
    },
  });

  const sectionToAdd = form.watch("sectionToAdd");

  const selectedTags = form.watch("tag");

  async function updateSetting() {}
  return (
    <Dialog
      defaultOpen
      onOpenChange={closeForm}
    >
      <DialogContent className="bg-secondary/70">
        <DialogHeader>Update Setting</DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateSetting)}
            className="p-5 space-y-5"
          >
            <SelectField
              label="Selected Car"
              name="selectedCar"
              options={[]}
              isDisabled
            />

            <SelectField
              label="Section"
              name="sectionToAdd"
              options={carCategoryOptions}
            />

            {sectionToAdd &&
              sectionToAdd.value === HOME_SETTINGS_OPTIONS.electricCars && (
                <SelectField
                  isMulti
                  label="Select Category"
                  name="tags"
                  options={
                    selectedTags?.length === MAX_SELECTABLE_TAGS_OPTIONS
                      ? []
                      : carSubCategoryOptions
                  }
                  noOptionsMessage={() => {
                    return selectedTags?.length === MAX_SELECTABLE_TAGS_OPTIONS
                      ? "Maximum one category can be selected"
                      : "No options available";
                  }}
                />
              )}

            <TextField
              label="Sort"
              name="sort"
              type="number"
            />

            <div className="flex gap-2">
              <LoadingBtn
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                isLoading={form.formState.isSubmitting}
                btnText="Save Changes"
              />
              <Button
                variant="destructive"
                type="button"
                onClick={closeForm}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditNewCar;
