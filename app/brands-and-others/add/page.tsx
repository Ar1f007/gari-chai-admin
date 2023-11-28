"use client";

import { useState } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/UI/Form/Button";
import AddEditModel from "@/components/CarInformation/Model/AddModel";
import AddEditVehicleType from "@/components/CarInformation/VehicleType/AddEditForm";
import AddCarBrand from "@/components/CarInformation/Brand/AddBrand";

type Selected = "brand" | "model" | "bodyType";

const actionBtns: Array<{ title: string; type: Selected }> = [
  {
    title: "Add Car Brand",
    type: "brand",
  },
  {
    title: "Add Car Model",
    type: "model",
  },
  {
    title: "Add Body Style",
    type: "bodyType",
  },
];

const AddPage = () => {
  const [selectedBtn, setSelectedBtn] = useState<Selected | null>(null);

  function handleClick(val: Selected) {
    setSelectedBtn(val);
  }

  function hideForm() {
    setSelectedBtn(null);
  }
  return (
    <>
      <Breadcrumb pageName="Add Car Brands and Others" />
      <section className="w-full mt-5 grid grid-cols-1 lg:grid-cols-5 gap-20">
        <div className="flex flex-col gap-5">
          {actionBtns.map((btn, idx) => (
            <Button
              key={idx}
              title={btn.title}
              type="button"
              onClick={() => handleClick(btn.type)}
            />
          ))}
        </div>
        <div className="col-span-4">
          {selectedBtn === "brand" && <AddCarBrand />}
          {selectedBtn === "model" && <AddEditModel onClose={hideForm} />}
          {selectedBtn === "bodyType" && (
            <AddEditVehicleType onClose={hideForm} />
          )}
        </div>
      </section>
    </>
  );
};
export default AddPage;
