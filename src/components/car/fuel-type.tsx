import { NewCarInputs } from "@/schemas/new-car";
import SelectField from "../form/select-field";

import data from "@/utils/data.json";

const FuelType = () => {
  return (
    <div className="w-full max-w-md">
      <SelectField<NewCarInputs>
        label="Fuel Type"
        name="fuel.typeInfo"
        options={data.fuelOptions}
      />
    </div>
  );
};
export default FuelType;
