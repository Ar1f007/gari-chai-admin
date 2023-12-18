import { carTagOptions } from "@/utils/constants";
import SelectField from "../form/select-field";

const SelectCarType = () => {
  return (
    <div className="w-full">
      <SelectField
        label="Tags"
        name="tags"
        options={carTagOptions}
        isMulti
        isClearable
      />
    </div>
  );
};
export default SelectCarType;
