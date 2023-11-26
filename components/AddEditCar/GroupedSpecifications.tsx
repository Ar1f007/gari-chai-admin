import { get, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import Button from "../UI/Form/Button";
import clsx from "clsx";
import TextInput from "../UI/Form/TextInput";
import Specifications from "./Specifications";
import { Trash2Icon } from "lucide-react";

export const GroupedSpecifications = () => {
  const {
    formState: { errors },
    trigger,
  } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    name: "specificationsByGroup",
  });

  const isError = get(errors, "specificationsByGroup");

  return (
    <div>
      <h6 className="font-semibold dark:text-bodydark1 mb-3 uppercase">
        Add Specification By Group
      </h6>

      <ul className="flex flex-col gap-5">
        {fields.map((field, idx) => (
          <li
            key={field.id}
            className="flex flex-col gap-5 outline outline-2 outline-body dark:outline-bodydark2 p-5 rounded"
          >
            <div className="xl:flex xl:items-end xl:justify-between xl:gap-5 max-w-125">
              <TextInput
                name={`specificationsByGroup.${idx}.groupName`}
                label="Group Name"
                placeholder="eg: Safety"
                required
              />

              <button
                onClick={() => remove(idx)}
                className={clsx(
                  "inline-flex items-center justify-center gap-2.5 rounded-md border xl:border-transparent py-2 px-2 text-center font-medium text-danger hover:bg-opacity-90 lg:px-8 xl:px-10 self-end mt-4 xl:mt-0",
                  {
                    "self-center": isError?.[idx]?.groupName,
                  }
                )}
                type="button"
              >
                <Trash2Icon />
                <span className="xl:hidden">Remove</span>
              </button>
            </div>

            <Specifications
              specificationName={`specificationsByGroup.${idx}.values`}
            />
          </li>
        ))}
      </ul>

      <Button
        title={fields.length > 0 ? "Create More Group" : "Create Group"}
        type="button"
        onClick={() => append({ value: [] })}
        classes={clsx("px-6 border border-1 border-primary", {
          "mt-5": !!fields.length,
        })}
      />
    </div>
  );
};
