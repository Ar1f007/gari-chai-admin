"use client";

import { useState } from "react";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/UI/Form/Button";
import AddEditBrand from "@/components/CarInformation/AddEditBrand";
import AddEditModel from "@/components/CarInformation/Model/AddModel";
import AddEditVehicleType from "@/components/CarInformation/VehicleType/AddEditForm";

type Selected = "brand" | "model" | "bodyType";

const AddPage = () => {
  const [selectedBtn, setSelectedBtn] = useState<Selected | null>("brand");

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
          <Button
            title="Add Car Brand"
            type="button"
            onClick={() => handleClick("brand")}
          />

          <Button
            title="Add Car Model"
            type="button"
            onClick={() => handleClick("model")}
          />

          <Button
            title="Add Body Style"
            type="button"
            onClick={() => handleClick("bodyType")}
          />
        </div>
        <div className="col-span-4">
          {selectedBtn == "brand" && <AddEditBrand formTitle="Add Brand" />}
          {selectedBtn == "model" && <AddEditModel onClose={hideForm} />}
          {selectedBtn == "bodyType" && (
            <AddEditVehicleType onClose={hideForm} />
          )}
        </div>
      </section>
    </>
  );
};
export default AddPage;
