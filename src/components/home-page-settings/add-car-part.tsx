"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Form } from "../ui/form";
import LoadingButton from "../ui/loading-button";
import { AsyncReactSelect } from "../ui/async-react-select";
import { TCarPartSchema } from "@/schemas/parts";
import { getCarParts } from "@/services/cars/car-parts";
import { toast } from "sonner";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";

type FormattedCarPart = {
  label: string;
  value: string;
  image: string;
  price: number;
};

const AddCarPartForm = () => {
  const [showForm, setShowForm] = useState(false);

  const form = useForm();

  const [selectedParts, setSelectedParts] = useState([]);

  async function onSubmit() {}

  function closeForm() {
    setShowForm(false);
  }

  async function fetchCarParts(input: string): Promise<FormattedCarPart[]> {
    const params = new URLSearchParams();

    params.append("name", input);

    try {
      const res = await getCarParts(params.toString());

      if (!res.data) {
        throw new Error(res.message);
      }

      const data: FormattedCarPart[] = res.data.carParts.map((part) => ({
        label: part.name,
        value: part._id,
        image: part.posterImage.thumbnailUrl,
        price: part.price,
      }));

      console.log(data);

      return data;
    } catch (error) {
      toast.error("Something went wrong");
      return [];
    }
  }

  const _loadSuggestions = (
    query: string,
    callback: (options: FormattedCarPart[]) => void
  ) => {
    if (query.length < 3) {
      callback([]);
      return;
    }
    fetchCarParts(query).then((resp) => callback(resp));
  };

  const loadSuggestions = debounce(_loadSuggestions, 700);

  return (
    <div className="space-y-5">
      <Button
        onClick={() => setShowForm(true)}
        size="lg"
      >
        Add Car Part
      </Button>

      <Dialog open={showForm}>
        <DialogContent className="bg-secondary/70">
          <DialogHeader>Add to Car Part Section</DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-5 space-y-5"
            >
              <div className="flex flex-col gap-5">
                <AsyncReactSelect
                  cacheOptions
                  defaultOptions
                  isMulti
                  isClearable
                  loadOptions={loadSuggestions}
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
                          Price: {data.price}
                        </Badge>
                      </div>
                    </div>
                  )}
                  placeholder="search by part name"
                  //  value={value ?? ""}
                  // onChange={handlePartSelect}
                />
              </div>

              <div className="flex gap-2">
                <LoadingButton
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                  isLoading={form.formState.isSubmitting}
                >
                  Add
                </LoadingButton>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={closeForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddCarPartForm;
