import { SelectOption } from "@/types/others";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SelectField from "../form/select-field";
import { vendorService } from "@/services/vendor";
import { TVendorSchema } from "@/schemas/vendor";

const SelectVendor = () => {
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState<SelectOption[]>([]);

  function getFormattedVendorOptions(vendors: TVendorSchema[]) {
    return vendors.map((vendor) => ({
      value: vendor._id,
      label: vendor.name,
    }));
  }

  async function fetchVendors() {
    try {
      setLoading(true);

      const vendors = await vendorService.getVendors();

      setVendors(getFormattedVendorOptions(vendors.data));
    } catch (error) {
      toast.error("Could not get vendor list, please try again");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchVendors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <SelectField
        label="Select Vendor"
        name="vendor"
        options={vendors}
        isLoading={loading}
      />
    </div>
  );
};
export default SelectVendor;
