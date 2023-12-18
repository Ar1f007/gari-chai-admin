import { useFieldArray } from "react-hook-form";
import TextField from "../form/text-field";
import { InfoIcon, Trash2Icon } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";
import RHFMultiImageFileDropzone from "../ui/rhf-multi-image";

const CarColors = () => {
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
            className="flex flex-col gap-5 outline rounded outline-1 outline-muted p-5"
          >
            <TextField
              name={`colors.${idx}.name`}
              label="Color Name"
              className="max-w-sm"
            />

            <p className="flex flex-wrap text-sm items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <InfoIcon />{" "}
                <span className="text-primary">
                  Upload Image for this specific color
                </span>
              </span>{" "}
              <span className="text-xs text-bodydark1">
                (optional, max allowed - 5)
              </span>
            </p>

            <RHFMultiImageFileDropzone name={`colors.${idx}.imageUrls`} />

            <div className="h-[1px] bg-input w-full" />

            <Button
              variant="destructive"
              onClick={() => remove(idx)}
              className="max-w-fit"
              size="sm"
            >
              <Trash2Icon className="mr-2" /> Remove
            </Button>
          </li>
        ))}
      </ul>

      <Button
        type="button"
        onClick={() => append({ name: "", imageUrls: [] })}
        className={clsx("", {
          "mt-5": !!fields.length,
        })}
      >
        {fields.length > 0 ? "Add more" : "Add Color Name"}
      </Button>
    </div>
  );
};
export default CarColors;
