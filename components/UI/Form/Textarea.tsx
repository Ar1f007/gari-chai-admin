"use client";

import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TextAreaProps = {
  label?: string;
  name: string;
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

const Textarea = (props: TextAreaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { name, label = name, placeholder = label, ...rest } = props;

  return (
    <div className="w-full">
      <label className="mb-2.5 block text-black dark:text-white capitalize">{label}</label>
      <Controller
        control={control}
        name={name ?? label}
        defaultValue=""
        render={({ field }) => (
          <textarea
            rows={6}
            placeholder={placeholder}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            {...field}
          ></textarea>
        )}
      />
      {errors[name] && (
        <p className="text-danger text-sm ml-4 mt-2">{errors[name]?.message?.toString()}</p>
      )}
    </div>
  );
};
export default Textarea;
