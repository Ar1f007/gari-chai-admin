"use client";

import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogHeader, DialogContent } from "../ui/dialog";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import SelectBrand from "../shared/brand/select-brand";
import {
  TCarSchema,
  addToHomePageSettings,
  getCars,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import { toast } from "sonner";
import SelectField from "../form/select-field";
import {
  HOME_SETTINGS_OPTIONS,
  MAX_SELECTABLE_TAGS_OPTIONS,
  carCategoryOptions,
  carSubCategoryOptions,
} from "@/utils/constants";
import TextField from "../form/text-field";
import { LoadingBtn } from "../ui/loading-btn";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddCarToHomePageInputs,
  addCarToHomePageSchema,
} from "@/schemas/home-page-add-car";
import { mapValidationErrors } from "@/utils/mapValidationError";

type CarOption = {
  value: TCarSchema;
  label: string;
  image: string | undefined;
};

const AddNewCar = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cars, setCars] = useState<CarOption[]>();

  const form = useForm<AddCarToHomePageInputs>({
    mode: "onTouched",
    criteriaMode: "all",
    defaultValues: {
      brand: {
        value: "",
        label: "",
      },
      sectionToAdd: {
        value: "",
        label: "",
      },
      selectedCar: {
        value: undefined,
        label: "",
      },
      sort: 0,
    },
    resolver: zodResolver(addCarToHomePageSchema),
  });

  const brand = form.watch("brand");
  const sectionToAdd = form.watch("sectionToAdd");

  const selectedTag = form.watch("tag");

  function closeForm() {
    setShowForm(false);
  }

  async function fetchCars(query: string) {
    try {
      setLoading(true);
      const res = await getCars(query);

      const cars = (res.data && res.data.cars) || [];

      const carOptions = cars.map((car) => ({
        value: car,
        label: car.name,
        image: car.posterImage.thumbnailUrl,
      }));

      setCars(carOptions);
    } catch (error) {
      toast.error("Could not get car list");
      setCars([]);
    } finally {
      setLoading(false);
    }
  }

  async function addNewItem(data: AddCarToHomePageInputs) {
    try {
      const res = await addToHomePageSettings({
        contentId: data.selectedCar.value._id,
        content: data.selectedCar.value,
        sectionName: data.sectionToAdd.value,
        sort: data.sort,
        tags: data.tag && data.tag.length ? [data.tag[0].value] : [],
      });

      if (!res || res.status === "error" || res.status === "fail") {
        toast.error("Failed to add to the " + sectionToAdd);
        return;
      }

      if (res.status === "success") {
        toast.success("Added successfully");

        await invalidateAdminCache([sectionToAdd.value]);

        closeForm();

        const revalidated = await invalidateUICache({
          tags: [sectionToAdd.value],
        });

        if (!revalidated) {
          toast.error(
            `Could not update the UI of main website for the tag: ${sectionToAdd.value}`
          );
        }
      }

      if (res.status === "validationError") {
        mapValidationErrors(res.errors, form);
        return;
      }
    } catch (error) {
      toast.error("something went wrong. Please try again");
    }
  }

  useEffect(() => {
    if (!brand) return;

    form.resetField("selectedCar");

    const query = `brand=${brand.value}`;

    fetchCars(query);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  return (
    <Fragment>
      <Button
        onClick={() => setShowForm(true)}
        size="lg"
      >
        Add New Car
      </Button>

      <Dialog
        open={showForm}
        // onOpenChange={() => setShowForm(false)}
      >
        <DialogContent className="bg-secondary/70">
          <DialogHeader>Add to Homepage Section</DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addNewItem)}
              className="p-5 space-y-5"
            >
              <SelectBrand name="brand" />

              <SelectField
                label="Select Car"
                name="selectedCar"
                options={cars}
                isLoading={loading}
              />

              <SelectField
                label="Choose a section"
                name="sectionToAdd"
                options={carCategoryOptions}
              />

              {sectionToAdd?.value === HOME_SETTINGS_OPTIONS.electricCars && (
                <SelectField
                  name="tag"
                  label="Add to category"
                  isMulti
                  options={
                    selectedTag?.length === MAX_SELECTABLE_TAGS_OPTIONS
                      ? []
                      : carSubCategoryOptions
                  }
                  noOptionsMessage={() => {
                    return selectedTag?.length === MAX_SELECTABLE_TAGS_OPTIONS
                      ? "Maximum one category can be selected"
                      : "No options available";
                  }}
                />
              )}

              <TextField
                name="sort"
                label="Sort Value"
                type="number"
                min={0}
              />

              <div className="flex gap-2">
                <LoadingBtn
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                  isLoading={form.formState.isSubmitting}
                  btnText="Add"
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
    </Fragment>
  );
};
export default AddNewCar;
