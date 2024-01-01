import {
  Controller,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ReactSelect } from "../ui/react-select";
import { ComponentProps } from "react";

type SelectFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  isLoading?: boolean;
} & ComponentProps<typeof ReactSelect>;

const SelectField = <T extends FieldValues>(props: SelectFieldProps<T>) => {
  const {
    name,
    label = name,
    isLoading = false,
    placeholder,
    options,
    ...others
  } = props;
  const form = useFormContext<T>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { ref, value, ...rest } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ReactSelect
              placeholder={placeholder || label}
              options={options}
              isClearable
              isLoading={isLoading}
              value={value ?? ""}
              {...rest}
              {...others}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    // <Controller
    //   name={name}
    //   control={form.control}
    //   render={({ field }) => (
    //     <ReactSelect
    //       placeholder={placeholder || label}
    //       options={options}
    //       isClearable
    //       isLoading={isLoading}
    //       {...field}
    //       value={field.value || ""}
    //       {...others}
    //     />
    //   )}
    // />
  );
};
export default SelectField;
