import { useFormContext } from "react-hook-form";
import Image from "next/image";

import { AsyncReactSelect } from "../ui/async-react-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Badge } from "../ui/badge";

import { getCars } from "@/services";
import { Fragment, useEffect, useState } from "react";
import { ActionMeta, MultiValue } from "react-select";
import Modal from "../ui/modal";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { TMinMaxPriceSchema } from "@/schemas/utils";

type Car = {
  label: string;
  value: string;
  type: "new" | "used";
  image: string;
  brand: string;
  model: string;
  price: TMinMaxPriceSchema;
};

const FindAndSelectCars = () => {
  const form = useFormContext();

  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [selectedCarPrice, setSelectedCarPrice] = useState<TMinMaxPriceSchema>({
    min: 0,
    max: 0,
  });
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  useEffect(() => {
    form.setValue("cars", selectedCars);
  }, [selectedCars, form]);

  async function filterCars(input: string) {
    const params = new URLSearchParams();

    params.append("query", input);

    const res = await getCars(params.toString());

    const data = res.data?.cars.map((car) => ({
      label: car.name,
      value: car._id,
      type: car.carType,
      image: car.posterImage.thumbnailUrl,
      brand: car.brand.label,
      model: car.brandModel.label,
      price: {
        min: 0,
        max: 0,
      },
    }));

    return data ? data : [];
  }

  function loadOptions(input: string) {
    return new Promise<Car[]>((resolve) => {
      setTimeout(() => {
        resolve(filterCars(input));
      }, 1000);
    });
  }

  const handleCarSelect = (
    cars: MultiValue<Car>,
    actionMeta: ActionMeta<Car>
  ) => {
    if (
      actionMeta.action == "clear" ||
      actionMeta.action == "deselect-option"
    ) {
      setSelectedCars([]);
      return;
    }

    if (
      actionMeta.action == "remove-value" ||
      actionMeta.action == "pop-value"
    ) {
      const filteredCars = selectedCars.filter(
        (car) => car.value !== actionMeta.removedValue.value
      );
      setSelectedCars(filteredCars);

      return;
    }

    const lastSelectedCar = cars[cars.length - 1];

    setSelectedCar(lastSelectedCar);
    setShowPriceInput(true);
  };

  function hideAndResetPriceInputPrompt() {
    setShowPriceInput(false);
    setSelectedCarPrice({ min: 0, max: 0 });
    setSelectedCar(null);
  }

  const handleAddPrice = () => {
    if (selectedCar) {
      const carWithPrice = {
        ...selectedCar,
        price: selectedCarPrice,
      };

      setSelectedCars([...selectedCars, carWithPrice]);

      hideAndResetPriceInputPrompt();

      form.clearErrors("cars");
    }
  };

  return (
    <Fragment>
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
                formatOptionLabel={(data) => (
                  <div className="flex justify-between flex-wrap gap-1">
                    <div className="flex items-center gap-1">
                      <Image
                        src={data.image}
                        alt="car image"
                        width={40}
                        height={40}
                      />
                      <p>{data.label}</p>
                    </div>

                    <div className="flex gap-1">
                      <Badge className="capitalize text-[11px] leading-none">
                        M: {data.model}
                      </Badge>
                      <Badge
                        className="capitalize text-[11px] leading-none"
                        variant="default"
                      >
                        B: {data.brand}
                      </Badge>
                      <Badge
                        className="capitalize text-[11px] leading-none"
                        variant="destructive"
                      >
                        T: {data.type}
                      </Badge>
                    </div>
                  </div>
                )}
                placeholder="search by car name"
                {...rest}
                value={value ?? ""}
                onChange={handleCarSelect}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Modal
        open={showPriceInput}
        showFooter={false}
        title="Add Price For The Selected Car"
        mode="info"
      >
        <div className="p-5 space-y-3 bg-muted">
          <Label>Campaign Special Price</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            <div className="space-y-2">
              <Label>Minimum Price</Label>
              <Input
                min={0}
                type="number"
                value={selectedCarPrice.min}
                onChange={(e) =>
                  setSelectedCarPrice((prev) => ({
                    ...prev,
                    min: +e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Maximum Price </Label>
              <Input
                min={0}
                type="number"
                value={selectedCarPrice.max}
                onChange={(e) =>
                  setSelectedCarPrice((prev) => ({
                    ...prev,
                    max: +e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* <p className="text-muted-foreground text-sm">
            <span className="text-primary font-semibold">Note:</span> You can
            give &quot;0&quot; (zero) as input if you don&apos;t want to add
            special price for this car.
          </p> */}
          <div className="flex w-full gap-2">
            <Button
              className="w-full"
              onClick={handleAddPrice}
            >
              Add
            </Button>
            <Button
              className="w-full"
              onClick={hideAndResetPriceInputPrompt}
              variant="destructive"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default FindAndSelectCars;
