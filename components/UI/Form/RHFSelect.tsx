import { Controller, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

import { SelectOption } from "@/types/others";

const PRIMARY_COLOR = "#3C50E0";

type Props = {
  label: string;
  name: string;
  options: ReadonlyArray<SelectOption>;
  isMulti?: boolean;
  maxSelectableOption?: number;
};

export const Select = ({
  name,
  label,
  options,
  isMulti = false,
  maxSelectableOption = 3,
}: Props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-5">
          <CreatableSelect
            {...field}
            isClearable
            options={options}
            isMulti={isMulti}
            isOptionDisabled={() => field?.value?.length >= maxSelectableOption}
            placeholder={label}
            ref={register(name).ref}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: PRIMARY_COLOR,
              },
            })}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                paddingBlock: "8px",
              }),
            }}
          />
          {hasError && (
            <p className="text-danger text-sm ml-4 mt-2">
              {isMulti
                ? errors[name]?.message?.toString()
                : `Add/create a ${name}`}
            </p>
          )}
        </div>
      )}
    />
  );
};
