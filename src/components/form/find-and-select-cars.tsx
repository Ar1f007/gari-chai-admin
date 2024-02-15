import { useFormContext } from "react-hook-form";
import { AsyncReactSelect } from "../ui/async-react-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { TCarSchema, getCars } from "@/services";

const FindAndSelectCars = () => {
  const form = useFormContext();

  async function filterCars(input: string) {
    const params = new URLSearchParams();

    params.append("query", input);

    const res = await getCars(params.toString());

    const data = res.data?.cars.map((car) => ({
      label: car.name,
      value: car._id,
      // type: car.carType,
      image: car.posterImage.thumbnailUrl,
    }));

    return data ? data : [];
  }

  function loadOptions(input: string) {
    return new Promise<
      {
        label: string;
        value: string;
        // type: "new" | "used";
        image: string;
      }[]
    >((resolve) => {
      setTimeout(() => {
        resolve(filterCars(input));
      }, 1000);
    });
  }

  return (
    <FormField
      name="cars"
      control={form.control}
      render={({ field: { ref, value, ...rest } }) => (
        <FormItem>
          <FormLabel>Select Cars for the campaign</FormLabel>
          <FormControl>
            <AsyncReactSelect
              cacheOptions
              isMulti
              isClearable
              defaultOptions
              loadOptions={loadOptions}
              name="car"
              placeholder="search by car name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default FindAndSelectCars;
