import { TCarBodyStylesSchema } from "@/schemas/car-body-style";
import { getBodyStyles } from "@/services/body-styles/getBodyStyles";
import { SelectOption } from "@/types/others";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SelectField from "../form/select-field";
import { NewCarInputs } from "@/schemas/new-car";

const SelectBodyType = () => {
  const [loading, setLoading] = useState(false);
  const [bodyTypes, setBodyTypes] = useState<SelectOption[]>([]);

  function getFormattedBodyTypeOptions(bodyTypes: TCarBodyStylesSchema[]) {
    return bodyTypes.map((bodyType) => ({
      value: bodyType._id,
      label: bodyType.name,
    }));
  }

  async function fetchBodyTypes() {
    try {
      setLoading(true);

      const bodyTypes = await getBodyStyles();

      setBodyTypes(
        bodyTypes ? getFormattedBodyTypeOptions(bodyTypes.data) : []
      );
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
      <SelectField<NewCarInputs>
        label="Select Body Type"
        name="bodyStyle"
        options={bodyTypes}
        isLoading={loading}
      />
    </div>
  );
};
export default SelectBodyType;
