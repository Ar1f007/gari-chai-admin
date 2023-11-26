import { get, useFieldArray, useFormState } from "react-hook-form";
import clsx from "clsx";

import Button from "../UI/Form/Button";
import TextInput from "../UI/Form/TextInput";
import { Trash2Icon } from "lucide-react";

type SpecificationsProps = {
  specificationName: string;
  isCalledSeparately?: boolean;
};

const Specifications = ({
  specificationName,
  isCalledSeparately = false,
}: SpecificationsProps) => {
  const { errors } = useFormState();
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

  return (
    <section>
      {/* {isCalledSeparately && (
        <div className="h-0.5 w-full bg-strokedark my-3" />
      )} */}
      {isCalledSeparately ? (
        <h6 className="font-semibold text-bodydark1 mb-3 uppercase">
          Additional Specifications
        </h6>
      ) : null}

      <ul className="flex flex-col gap-5">
        {fields.map((field, idx) => (
          <li
            key={field.id}
            className={clsx(
              "xl:flex xl:items-start xl:justify-between xl:gap-5"
            )}
          >
            <TextInput
              name={`${specificationName}.${idx}.name`}
              label={`${
                isCalledSeparately ? "Specification" : "Attribute"
              } Name`}
              placeholder="attribute name"
              required={false}
            />

            <TextInput
              name={`${specificationName}.${idx}.value`}
              label="Value"
              placeholder="value or value 1, value 2..."
              required={false}
              classes="mt-4 xl:mt-0"
            />

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
          </li>
        ))}
      </ul>

      <Button
        title={getBtnName()}
        type="button"
        onClick={() => append({ name: "", value: "" })}
        classes={clsx(
          "px-6 border border-1 border-primary bg-transparent  !text-primary hover:!text-white capitalize",
          {
            "mt-5": !!fields.length,
          }
        )}
      />
    </section>
  );
};
export default Specifications;
