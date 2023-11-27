import { useFieldArray } from "react-hook-form";
import { InfoIcon, Trash2Icon } from "lucide-react";
import clsx from "clsx";

import { RHFMultiImageFileDropzone } from "../UI/Form/RHFMultiImageFileDropzone";
import Button from "../UI/Form/Button";
import TextInput from "../UI/Form/TextInput";

export const CarColors = () => {
  const { fields, append, remove } = useFieldArray({
    name: "colors",
  });

  return (
    <div>
      <h6 className="font-semibold dark:text-bodydark1 mb-3 uppercase">
        Colors
      </h6>

      <ul className="flex flex-col gap-5">
        {fields.map((field, idx) => (
          <li
            key={field.id}
            className="flex flex-col gap-5 outline rounded outline-2 outline-body dark:outline-strokedark p-5"
          >
            <TextInput
              name={`colors.${idx}.name`}
              label="Color Name"
              classes="max-w-sm"
            />

            <p className="flex text-sm items-center gap-2">
              <span className="inline-flex items-center gap-1 text-secondary">
                <InfoIcon /> Upload Image for this specific color
              </span>{" "}
              <span className="text-xs text-bodydark1">
                (optional, max allowed - 5)
              </span>
            </p>
            <RHFMultiImageFileDropzone name={`colors.${idx}.imageUrls`} />

            <div className="h-[1px] bg-form-strokedark w-full" />

            <button
              onClick={() => remove(idx)}
              className={clsx(
                "self-start rounded-md border py-1 px-2 text-center font-medium text-danger hover:bg-opacity-90 inline-flex items-center justify-center gap-2.5"
              )}
              type="button"
            >
              <Trash2Icon />

              <span>Remove</span>
            </button>
          </li>
        ))}
      </ul>

      <Button
        title={fields.length > 0 ? "Add more" : "Add Color Name"}
        type="button"
        onClick={() => append({ name: "", imageUrls: [] })}
        classes={clsx("px-6 border border-1 border-primary", {
          "mt-5": !!fields.length,
        })}
      />
    </div>
  );
};
