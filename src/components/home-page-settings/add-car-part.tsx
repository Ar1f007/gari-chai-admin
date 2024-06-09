"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import LoadingButton from "../ui/loading-button";
import { AsyncReactSelect } from "../ui/async-react-select";
import { TCarPartSchema } from "@/schemas/parts";
import { getCarParts } from "@/services/cars/car-parts";
import { toast } from "sonner";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { debounce } from "lodash";
import { ActionMeta, MultiValue } from "react-select";
import { HOME_SETTINGS_OPTIONS } from "@/utils/constants";
import {
  TAGS,
  UI_TAGS,
  addCarPartsToHomeSettings,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import { catchError } from "@/lib/catch-error";

type FormattedCarPart = {
  label: string;
  value: TCarPartSchema;
  image: string;
  price: number;
};

const AddCarPartForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedParts, setSelectedParts] = useState<FormattedCarPart[]>([]);

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
        value: part,
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

  const loadSuggestions = useMemo(() => debounce(_loadSuggestions, 700), []);

  useEffect(() => {
    return () => {
      loadSuggestions.cancel();
    };
  }, []);

  function handlePartSelect(
    parts: MultiValue<FormattedCarPart>,
    actionMeta: ActionMeta<FormattedCarPart>
  ) {
    if (
      actionMeta.action == "clear" ||
      actionMeta.action == "deselect-option"
    ) {
      setSelectedParts([]);
      return;
    }

    if (
      actionMeta.action == "remove-value" ||
      actionMeta.action == "pop-value"
    ) {
      const filteredCarParts = selectedParts.filter(
        (car) => car.value !== actionMeta.removedValue.value
      );

      setSelectedParts(filteredCarParts);

      return;
    }

    const lastSelectedCarPart = parts[parts.length - 1];

    setSelectedParts([...selectedParts, lastSelectedCarPart]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selectedParts.length === 0) {
      toast.warning("Please select at least one item");
      return;
    }

    try {
      const carParts = selectedParts.map((part) => ({
        contentId: part.value._id,
        content: part.value,
        sectionName: HOME_SETTINGS_OPTIONS.carParts,
        tags: [],
        sort: 0,
      }));

      const res = await addCarPartsToHomeSettings(carParts);

      if (!res) {
        throw new Error("Failed to add to the car parts section");
      }

      if (res.status === "success") {
        closeForm();

        invalidateAdminCache([TAGS.carParts]);

        invalidateUICache({
          tags: [UI_TAGS.carParts],
        });

        return;
      }

      throw new Error(res.message);
    } catch (error) {
      catchError(error);
    }
  }

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

          <form
            onSubmit={onSubmit}
            className="p-5 space-y-5"
          >
            <div className="flex flex-col gap-5">
              <AsyncReactSelect
                // cacheOptions
                // defaultOptions
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
                value={selectedParts}
                onChange={handlePartSelect}
              />
            </div>

            <div className="flex gap-2">
              <LoadingButton
                type="submit"
                className="w-full"
                disabled={loading}
                isLoading={loading}
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
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddCarPartForm;
