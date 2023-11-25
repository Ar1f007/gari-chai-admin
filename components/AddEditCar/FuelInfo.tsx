import TextInput from "../UI/Form/TextInput";
import SelectFuelType from "./SelectFuelType";

export const FuelInfo = () => {
  return (
    <div>
      <h6 className="font-semibold text-bodydark1 mb-3 uppercase">Fuel Info</h6>

      <div className="flex flex-col xl:flex-row gap-5">
        <SelectFuelType />

        <TextInput
          name="fuel.economy.city"
          label="In City"
          placeholder="eg. 40 kmpl in city"
          required={false}
          type="number"
        />

        <TextInput
          name="fuel.economy.highway"
          label="In Highway"
          placeholder="eg. 80 kmpl in city"
          required={false}
          type="number"
        />
      </div>
    </div>
  );
};
