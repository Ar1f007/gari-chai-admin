import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { ComponentProps } from "react";

type SwitchFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  checkedText: string;
  unCheckedText: string;
} & ComponentProps<typeof Switch>;

const SwitchField = <T extends FieldValues>(props: SwitchFieldProps<T>) => {
  const { name, checkedText, unCheckedText, ...others } = props;
  const form = useFormContext<T>();

  return (
    <div className="w-full">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex gap-2 items-center flex-wrap">
                <Switch
                  id={name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  {...others}
                />
                <Label
                  htmlFor={name}
                  className="cursor-pointer"
                >
                  {field.value ? checkedText : unCheckedText}
                </Label>
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
export default SwitchField;
