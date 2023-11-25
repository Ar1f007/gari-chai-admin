import { useEffect } from "react";
import TextInput from "../UI/Form/TextInput";
import SelectBodyType from "./SelectBodyType";
import SelectBrand from "./SelectBrand";
import SelectCarModel from "./SelectCarModel";
import { SelectCarType } from "./SelectCarType";
import { useFormContext } from "react-hook-form";

export const BasicInfo = () => {
  const { resetField, watch } = useFormContext();
  const brand = watch("brand");

  useEffect(() => {
    resetField("brandModel");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  return (
    <>
      <div className="flex flex-col xl:flex-row gap-5">
        <TextInput
          name="name"
          placeholder="Name of the car"
          required
          autoComplete="name"
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-5">
        <SelectBrand />

        <SelectCarModel />

        <SelectCarType />

        <SelectBodyType />
      </div>

      <div className="flex flex-col xl:flex-row gap-5">
        <TextInput
          type="text"
          name="engine.type"
          placeholder="Eg. 1000cc"
          label="Engine"
          required
        />

        <TextInput
          name="mileage"
          type="number"
          placeholder="eg: 80 kmpl"
        />

        <TextInput
          name="seatingCapacity"
          label="Seating Capacity"
          type="number"
          placeholder="eg: 6"
        />

        <TextInput
          name="numOfDoors"
          label="Number of Doors"
          type="number"
          placeholder="eg: 4"
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-5">
        <TextInput
          type="text"
          name="color"
          placeholder="Eg. Black"
          required
        />

        <TextInput
          name="baseInteriorColor"
          label="Base Interior Color"
          placeholder="eg: cream"
        />

        <TextInput
          name="transmission"
          placeholder="eg: manual / automatic"
        />
      </div>
    </>
  );
};
