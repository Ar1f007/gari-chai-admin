import data from "@/util/data.json";
import InputLabel from "../UI/Form/Label";
import { RHFSelect } from "../UI/Form/RHFSelect";

const Cities = () => {
  return (
    <div className="w-full max-w-125">
      <InputLabel
        label="Choose Cities"
        required={false}
      />
      <RHFSelect
        name="cities"
        options={data.cities}
        isMulti
        isSearchable
        isClearable
      />
    </div>
  );
};
export default Cities;
