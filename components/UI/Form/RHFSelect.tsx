"use client";
import ReactSelect from "react-select";

import { Controller, useFormContext } from "react-hook-form";
import { PRIMARY_COLOR } from "@/util/constants";
import { SelectOption } from "@/types/others";
import { useSnapshot } from "valtio";
import { settingsStore } from "@/store";

type Props = {
  name: string;
  options: ReadonlyArray<SelectOption>;
} & React.ComponentProps<typeof ReactSelect>;

function RHFSelect(props: Props) {
  const { name, ...rest } = props;

  const settingsSnap = useSnapshot(settingsStore);

  const colorMode = settingsSnap.theme;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <ReactSelect
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: PRIMARY_COLOR,
                primary25: colorMode === "dark" ? "#1d2a39" : "rgb(60 80 224)",
              },
            })}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                paddingBlock: "6px",
                backgroundColor:
                  colorMode === "dark" ? "rgb(29 42 57)" : "bg-form-input",
                borderColor:
                  colorMode === "dark" ? "rgb(61 77 96)" : "rgb(226 232 240)",
              }),
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              menuList: (base) => ({
                ...base,
                backgroundColor: "#24303F",
                color: "#f7f7f7",
              }),
              singleValue: (base) => ({ ...base, color: "text-white" }),
              input(base, props) {
                return {
                  ...base,
                  color: colorMode === "dark" ? "#f7f7f7" : "rgb(28, 32, 36)",
                };
              },
            }}
            menuPortalTarget={document.body}
            {...field}
            {...rest}
          />
          {hasError && (
            <p className="text-danger text-sm ml-4 mt-2">
              {errors[name]?.message?.toString()}
            </p>
          )}
        </>
      )}
    />
  );
}
export default RHFSelect;
