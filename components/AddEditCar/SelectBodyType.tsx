"use client";

import { SelectOption } from "@/types/others";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import InputLabel from "../UI/Form/Label";
import { RHFSelect } from "../UI/Form/RHFSelect";
import {
  TCarBodyTypeSchema,
  getCarBodyTypes,
} from "@/services/cars/getCarBodyTypes";

type Props = {
  label?: string;
};

const SelectBodyType = ({ label = "Body Type" }: Props) => {
  const [loading, setLoading] = useState(false);
  const [bodyTypes, setBodyTypes] = useState<SelectOption[]>([]);

  function getFormattedBodyTypeOptions(bodyTypes: TCarBodyTypeSchema[]) {
    return bodyTypes.map((bodyType) => ({
      value: bodyType._id,
      label: bodyType.name,
    }));
  }

  async function fetchBodyTypes() {
    try {
      setLoading(true);

      const bodyTypes = await getCarBodyTypes();

      setBodyTypes(bodyTypes ? getFormattedBodyTypeOptions(bodyTypes) : []);
    } catch (error) {
      toast.error("Could not get body types");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchBodyTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <InputLabel label={label} />
      <RHFSelect
        name="bodyStyle"
        options={bodyTypes}
        isClearable
        isLoading={loading}
      />
    </div>
  );
};
export default SelectBodyType;
