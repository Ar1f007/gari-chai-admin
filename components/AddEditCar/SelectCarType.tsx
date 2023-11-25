import { carTagOptions } from "@/util/constants";
import InputLabel from "../UI/Form/Label";
import { RHFSelect } from "../UI/Form/RHFSelect";

export const SelectCarType = () => {
  return (
    <div className="w-full">
      <InputLabel
        required={false}
        label="Tags"
      />
      <RHFSelect
        name="tags"
        options={carTagOptions}
        isMulti
        isClearable
      />
    </div>
  );
};
