import InputLabel from "../UI/Form/Label";
import { RHFSelect } from "../UI/Form/RHFSelect";

import data from "@/util/data.json";

const SelectFuelType = () => {
  return (
    <div className="w-full">
      <InputLabel label="Fuel Type" />
      <RHFSelect
        name="fuel.typeInfo"
        options={data.fuelOptions}
        isClearable
      />
    </div>
  );
};
export default SelectFuelType;
