import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import clsx from "clsx";

import Button from "../UI/Form/Button";
import TextInput from "../UI/Form/TextInput";

const Specifications = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "specifications",
    control,
  });

  return (
    <section>
      <h6 className="font-semibold text-bodydark1 mb-3 uppercase">
        Additional Specifications
      </h6>

      <ul className="flex flex-col gap-5">
        {fields.map((field, idx) => (
          <li
            key={field.id}
            className="xl:flex xl:items-end xl:justify-between xl:gap-5"
          >
            <TextInput
              name={`specifications.${idx}.name`}
              label="Name"
              placeholder="name of the specification"
              required={false}
            />

            <TextInput
              name={`specifications.${idx}.value`}
              label="Value"
              placeholder="value or value 1, value 2..."
              required={false}
            />

            <Button
              title="Remove"
              onClick={() => remove(idx)}
            />
          </li>
        ))}
      </ul>

      <Button
        title={fields.length > 0 ? "Add More Attribute" : "Add Attribute"}
        type="button"
        onClick={() => append({ name: "", value: "" })}
        classes={clsx({ "mt-5": !!fields.length })}
      />
    </section>
  );
};
export default Specifications;
