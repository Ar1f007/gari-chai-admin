"use client";

import AddEditBrand from "@/components/CarInformation/AddEditBrand";
import AddEditModel from "@/components/CarInformation/Model/AddModel";
import AddEditVehicleType from "@/components/CarInformation/VehicleType/AddEditForm";
import { Button } from "@radix-ui/themes";
import { useState } from "react";

type Selected = "brand" | "model" | "bodyType";

const SettingsPage = () => {
  const [selectedBtn, setSelectedBtn] = useState<Selected | null>("brand");

  function handleClick(val: Selected) {
    setSelectedBtn(val);
  }

  function hideForm() {
    setSelectedBtn(null);
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      <div className="flex flex-col gap-5">
        <Button
          size={"4"}
          onClick={() => handleClick("brand")}
        >
          Add Car Brand
        </Button>
        <Button
          size={"4"}
          onClick={() => handleClick("model")}
        >
          Add Car Model
        </Button>
        <Button
          size={"4"}
          onClick={() => handleClick("bodyType")}
        >
          Add Body Type
        </Button>
      </div>

      <div className="col-span-3 lg:ml-15">
        {/* {selectedBtn == "brand" && <AddEditBrand formTitle="Add Brand" />} */}
        {/* {selectedBtn == "model" && <AddEditModel onClose={hideForm} />} */}
        {/* {selectedBtn == "bodyType" && <AddEditVehicleType onClose={hideForm} />} */}
      </div>
    </section>
  );
};

export default SettingsPage;
