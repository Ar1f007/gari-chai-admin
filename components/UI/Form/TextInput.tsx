"use client";

import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";
import InputLabel from "./Label";

type TextInputProps = {
  label?: string;
  name: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput = (props: TextInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    name,
    label = name,
    type = "text",
    placeholder = label,
    required = true,
    ...rest
  } = props;

  return (
    <div className="w-full">
      <InputLabel
        label={label}
        required={required}
      />

      <Controller
        control={control}
        name={name ?? label}
        defaultValue=""
        render={({ field }) => (
          <input
            type={type}
            placeholder={placeholder}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            id={label}
            {...rest}
            {...field}
          />
        )}
      />
      {errors[name] && (
        <p className="text-danger text-sm ml-4 mt-2">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};
export default TextInput;
