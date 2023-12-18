import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { ComponentProps } from "react";

type TextFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
} & ComponentProps<typeof Input>;

const TextField = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const { name, label = name, placeholder = label, ...others } = props;

  const form = useFormContext<T>();

  return (
    <div className="w-full">
      <FormField
        control={form.control}
        name={name}
        render={({ field: { value, ...rest } }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                value={value || ""}
                {...rest}
                {...others}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
export default TextField;
