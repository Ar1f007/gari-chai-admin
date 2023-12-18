import { NewCarInputs } from "@/schemas/new-car";
import TextField from "../form/text-field";
import SwitchField from "../form/switch-field";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { InfoIcon } from "lucide-react";
import { get, useFormContext } from "react-hook-form";

const Price = () => {
  const {
    formState: { errors },
  } = useFormContext();

  const priceMinErr = get(errors, "price.min");
  const priceMaxErr = get(errors, "price.max");

  return (
    <div className="space-y-4">
      <Popover>
        <PopoverTrigger className="flex gap-2">
          <InfoIcon /> Note about pricing
        </PopoverTrigger>

        <PopoverContent
          className="w-full max-w-96"
          align="start"
        >
          <p className="text-xs">
            If you do not want to show two prices, then give both min and max
            price the same value.
            <br />
            <pre className="font-medium text-primary mt-2">
              Example: min price: 500000, max price: 500000
              <br />
              <span className="font-medium text-primary">
                Output: 500000 or 5 Lakh
              </span>
            </pre>
          </p>
        </PopoverContent>
      </Popover>
      <div className="flex flex-col gap-5 lg:flex-row">
        <TextField<NewCarInputs>
          name="price.min"
          label="Min Price"
          placeholder="minimum price"
        />

        <TextField<NewCarInputs>
          name="price.max"
          label="Max Price"
          placeholder="maximum price"
        />

        <div
          className={cn("w-full self-end", {
            "self-center": priceMinErr || priceMaxErr,
            "mb-2": !priceMinErr && !priceMaxErr,
          })}
        >
          <SwitchField<NewCarInputs>
            name="price.isNegotiable"
            checkedText="Price is negotiable"
            unCheckedText="Price is not negotiable"
          />
        </div>
      </div>
    </div>
  );
};
export default Price;
