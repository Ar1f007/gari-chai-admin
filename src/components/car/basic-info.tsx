"use client";

import { NewCarInputs } from "@/schemas/new-car";
import TextField from "../form/text-field";
import SelectBrand from "../shared/brand/select-brand";
import SelectCarModel from "./select-car-model";
import { useFormContext } from "react-hook-form";
import { Suspense, useEffect, useRef } from "react";
import SelectCarType from "./select-car-type";
import SelectBodyType from "./select-body-type";
import { EditNewCarInputs } from "@/schemas/edit-new-car";
import { cn } from "@/lib/utils";

type BasicInfoProps = {
  showSlugInput?: boolean;
};

const BasicInfo = ({ showSlugInput = false }: BasicInfoProps) => {
  const form = useFormContext();

  const brand = form.watch("brand");

  useEffect(() => {
    // we are checking if `brand` field is dirty or modified
    // if modified then updating the `model` field
    // so that user can only select correct `model`, models which belongs to the currently selected `brand`.
    // we are using setValue instead of resetField is because, resetField resets the value to defaultValue in the `edit form`
    // in case of edit form, that's something we don't want to set
    // that's why we are using `setValue`

    if (form.getFieldState("brand").isDirty) {
      form.setValue("brandModel", null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  return (
    <>
      <div className={cn("flex flex-col lg:flex-row gap-5")}>
        <TextField<NewCarInputs>
          name="name"
          label="Name"
          placeholder="eg. Tata Harrier"
        />

        {showSlugInput && (
          <TextField<EditNewCarInputs>
            name="slug"
            label="Slug"
            placeholder="eg. Tata Harrier"
          />
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <SelectBrand />
        <SelectCarModel />
        <SelectCarType />
        <SelectBodyType />
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <TextField<NewCarInputs>
          name="numOfDoors"
          label="Number of Doors"
          placeholder="eg. 4"
          type="number"
        />

        <TextField<NewCarInputs>
          name="seatingCapacity"
          label="Seating Capacity"
          placeholder="eg. 6"
          type="number"
        />

        <TextField<NewCarInputs>
          name="transmission"
          label="Transmission"
          placeholder="eg. manual / automatic"
        />
      </div>
    </>
  );
};
export default BasicInfo;
