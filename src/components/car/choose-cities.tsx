import data from "@/utils/data.json";

import SelectField from "../form/select-field";

const ChooseCities = () => {
  return (
    <div className="max-w-lg">
      <SelectField
        label="Choose Cities"
        name="cities"
        options={data.cities}
        isMulti
        isSearchable
        isClearable
      />
    </div>
  );
};
export default ChooseCities;
