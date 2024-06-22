import { get, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import SelectField from "../form/select-field";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import TextField from "../form/text-field";

type SpecificationsProps = {
  specificationName: string;
  isCalledSeparately?: boolean;
};

const Specifications = ({
  specificationName,
  isCalledSeparately = false,
}: SpecificationsProps) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: specificationName,
  });

  const isErr = get(errors, specificationName);

  function getBtnName() {
    let prefix = "Add";
    let suffix = isCalledSeparately ? "specification" : "attribute";

    if (fields.length > 0) {
      return `${prefix} more ${suffix}`;
    }

    return `${prefix} ${suffix}`;
  }

  const selectedValueType = useWatch({ name: specificationName });

  return (
    <section>
      {isCalledSeparately ? (
        <h6 className="font-semibold dark:text-bodydark1 mb-3 uppercase">
          Additional Specifications
        </h6>
      ) : null}

      <ul className="flex flex-col gap-5">
        {fields.map((field, idx) => (
          <li
            key={field.id}
            className="flex flex-col gap-5 outline rounded outline-1 outline-muted p-5"
          >
            <div className="max-w-xs">
              <SelectField
                name={`${specificationName}.${idx}.valueType`}
                options={[
                  { value: "text", label: "Text" },
                  { value: "boolean", label: "Boolean" },
                ]}
                placeholder="Select Type"
                label="Select Type"
              />
            </div>

            <div className="xl:flex xl:items-start xl:justify-between xl:gap-5">
              <TextField
                name={`${specificationName}.${idx}.name`}
                label={`${
                  isCalledSeparately ? "Specification" : "Attribute"
                } Name`}
                placeholder="name"
              />

              {selectedValueType?.[idx]?.valueType &&
                (selectedValueType?.[idx]?.valueType.value === "text" ? (
                  <TextField
                    name={`${specificationName}.${idx}.value`}
                    label="Value"
                    placeholder="value or value 1, value 2..."
                    className="mt-4 xl:mt-0"
                  />
                ) : (
                  <div
                    className={cn("w-full self-end", {
                      "self-center": isErr?.[idx],
                    })}
                  >
                    <FormField
                      control={control}
                      name={`${specificationName}.${idx}.value`}
                      render={({ field }) => (
                        <FormItem
                          className={cn("flex items-center gap-2 space-y-0", {
                            "mb-2": !isErr?.[idx],
                          })}
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="w-5 h-5"
                            />
                          </FormControl>
                          <FormLabel className="text-lg font-normal">
                            {field.value ? "Available" : "Not available"}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}

              <button
                onClick={() => remove(idx)}
                className={clsx(
                  "inline-flex items-center justify-center gap-2.5 rounded-md border xl:border-transparent py-2 px-2 text-center font-medium text-danger hover:bg-opacity-90 lg:px-8 xl:px-10 self-end mt-4 xl:mt-0",
                  {
                    "self-center": isErr?.[idx],
                  }
                )}
                type="button"
              >
                <Trash2Icon />

                <span className="xl:hidden">Remove</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        onClick={() => append({ name: "", value: "" })}
        variant={isCalledSeparately ? "default" : "outline"}
        className={cn(!!fields.length && "mt-5")}
      >
        {getBtnName()}
      </Button>
    </section>
  );
};
export default Specifications;
