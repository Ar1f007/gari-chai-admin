import RHFSwitch from "../UI/Form/RHFSwitch";
import TextInput from "../UI/Form/TextInput";

export const Price = () => {
  return (
    <div>
      <div className="flex flex-col gap-5 xl:flex-row">
        <TextInput
          name="price.min"
          type="number"
          label="Minimum Price"
          placeholder="Minimum"
          autoComplete="price"
          required
        />
        <TextInput
          name="price.max"
          type="number"
          label="Maximum Price"
          placeholder="Maximum"
          autoComplete="price"
          required
        />

        <div className="w-full xl:flex xl:items-end xl:mb-2">
          <RHFSwitch
            name="price.isNegotiable"
            checkedText="Price Negotiable"
            unCheckedText="Price Not Negotiable"
          />
        </div>
      </div>
    </div>
  );
};
