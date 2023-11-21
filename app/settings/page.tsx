"use client";

import AddEditModel from "@/components/Model/AddModel";
import AddEditVehicleType from "@/components/VehicleType/AddEditForm";
import { Button } from "@radix-ui/themes";
import { useState } from "react";

type Selected = "brand" | "model" | "bodyType" | "fuel";

const Settings = () => {
  const [selectedBtn, setSelectedBtn] = useState<Selected | null>(null);

  function handleClick(val: Selected) {
    setSelectedBtn(val);
  }

  function hideForm() {
    setSelectedBtn(null);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5">
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
        <Button
          size={"4"}
          onClick={() => handleClick("fuel")}
        >
          Add Fuel Type
        </Button>
      </div>

      {selectedBtn == "model" && <AddEditModel onSuccessCb={hideForm} />}
      {selectedBtn == "bodyType" && (
        <AddEditVehicleType onSuccessCb={hideForm} />
      )}
    </>
  );
};

export default Settings;
