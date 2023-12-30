"use client";

import { NewCarInputs } from "@/schemas/new-car";
import TextField from "../form/text-field";
import SelectBrand from "../shared/brand/select-brand";
import SelectCarModel from "./select-car-model";
import { useFormContext } from "react-hook-form";
import { Suspense, useEffect } from "react";
import SelectCarType from "./select-car-type";
import SelectBodyType from "./select-body-type";
import { EditNewCarInputs } from "@/schemas/edit-new-car";
import { cn } from "@/lib/utils";

type BasicInfoProps = {
  showSlugInput?: boolean;
};

const BasicInfo = ({ showSlugInput = false }: BasicInfoProps) => {
  const { resetField, watch } = useFormContext();
  const brand = watch("brand");

  useEffect(() => {
    resetField("brandModel");
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

      <Suspense>
        <div className="flex flex-col lg:flex-row gap-5">
          <SelectBrand />
          <SelectCarModel />
          <SelectCarType />
          <SelectBodyType />
        </div>
      </Suspense>

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
