"use client";

import { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogHeader, DialogContent } from "../ui/dialog";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import SelectBrand from "../shared/brand/select-brand";
import { TCarSchema, getCars } from "@/services";
import { toast } from "sonner";
import SelectField from "../form/select-field";
import {
  HOME_SETTINGS_OPTIONS,
  carCategoryOptions,
  carSubCategoryOptions,
} from "@/utils/constants";
import TextField from "../form/text-field";
import { LoadingBtn } from "../ui/loading-btn";

type CarOption = {
  value: TCarSchema;
  label: string;
  image: string | undefined;
};

const AddNewCar = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cars, setCars] = useState<CarOption[]>();

  const form = useForm({
    defaultValues: {
      brand: {
        value: "",
        label: "",
      },
      sectionToAdd: {
        value: "",
        label: "",
      },
      sort: 10,
    },
  });

  const brand = form.watch("brand");
  const sectionToAdd = form.watch("sectionToAdd");

  function closeForm() {
    setShowForm(false);
  }

  async function fetchCars(query: string) {
    try {
      setLoading(true);
      const cars = await getCars(query);

      const carOptions = (cars ?? []).map((car) => ({
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

  useEffect(() => {
    if (!brand) return;

    const query = `brand=${brand.value}`;

    fetchCars(query);
  }, [brand]);

  async function addNewItem() {}
  return (
    <Fragment>
      <Button onClick={() => setShowForm(true)}>Add New Car</Button>

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
                  label="Add to category"
                  name="tag"
                  options={carSubCategoryOptions}
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
