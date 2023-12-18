"use client";

import { NewCarInputs } from "@/schemas/new-car";
import TextField from "../form/text-field";
import SelectBrand from "../shared/brand/select-brand";
import SelectCarModel from "./select-car-model";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import SelectCarType from "./select-car-type";
import SelectBodyType from "./select-body-type";

const BasicInfo = () => {
  const { resetField, watch } = useFormContext();
  const brand = watch("brand");

  useEffect(() => {
    resetField("brandModel");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  return (
    <>
      <TextField<NewCarInputs>
        name="name"
        label="Name"
        placeholder="eg. Tata Harrier"
      />

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
