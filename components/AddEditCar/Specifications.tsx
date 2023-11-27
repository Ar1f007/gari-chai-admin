import {
  get,
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import clsx from "clsx";

import Button from "../UI/Form/Button";
import TextInput from "../UI/Form/TextInput";
import { Trash2Icon } from "lucide-react";
import { RHFSelect } from "../UI/Form/RHFSelect";
import InputLabel from "../UI/Form/Label";
import { RHFCheckbox } from "../UI/Form/RHFCheckbox";

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
            className="flex flex-col gap-5 outline rounded outline-2 outline-body dark:outline-strokedark p-5"
          >
            <div className="max-w-xs">
              <RHFSelect
                name={`${specificationName}.${idx}.valueType`}
                options={[
                  { value: "text", label: "Text" },
                  { value: "boolean", label: "Boolean" },
                ]}
                placeholder="Select Type"
              />
            </div>

            <div
              className={clsx(
                "xl:flex xl:items-start xl:justify-between xl:gap-5"
              )}
            >
              <TextInput
                name={`${specificationName}.${idx}.name`}
                label={`${
                  isCalledSeparately ? "Specification" : "Attribute"
                } Name`}
                placeholder="name"
              />

              {selectedValueType?.[idx]?.valueType &&
                (selectedValueType?.[idx]?.valueType.value === "text" ? (
                  <TextInput
                    name={`${specificationName}.${idx}.value`}
                    label="Value"
                    placeholder="value or value 1, value 2..."
                    rootClass="mt-4 xl:mt-0"
                  />
                ) : (
                  <div className="w-full self-center">
                    <InputLabel
                      label="Value"
                      classes="mt-4 xl:mt-0"
                    />
                    <RHFCheckbox
                      name={`${specificationName}.${idx}.value`}
                      checkedText="Yes"
                      unCheckedText="No"
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
        title={getBtnName()}
        type="button"
        onClick={() => append({ name: "", value: "" })}
        classes={clsx(
          "px-6 border border-1 border-primary hover:!text-white capitalize",
          {
            "mt-5": !!fields.length,
            "bg-transparent !text-primary": !isCalledSeparately,
            "text-white": isCalledSeparately,
          }
        )}
      />
    </section>
  );
};
export default Specifications;
