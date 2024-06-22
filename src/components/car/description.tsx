import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";

const CarDescription = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Description <span className="text-xs text-primary">(optional)</span>
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder="small description about the car..."
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CarDescription;
