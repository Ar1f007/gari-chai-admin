"use client";
import { useEffect, useState } from "react";
import Modal from "../Dialog/Dialog";
import { useGetBrandsOptions } from "@/hooks/useGetBrandsOptions";
import { TCarSchema, getCars } from "@/services";
import { toast } from "sonner";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { Select } from "../UI/Form/RHFSelect";
import AddItemForm from "./AddItemForm";

const AddNewButton = () => {
  let [isOpen, setIsOpen] = useState(false);

  const [brand, setBrand] = useState("");
  const [cars, setCars] = useState<TCarSchema[]>([]);

  const brandOptions = useGetBrandsOptions();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // async function handleAdd(car: TCarSchema) {
  //   const res = await addToHomePageSettings({
  //     payload: car,
  //     settingsType: settingsName,
  //   });

  //   if (!res || res.status === "error" || res.status === "fail") {
  //     toast.error("Failed to add to the " + settingsName);
  //     return;
  //   }

  //   if (res.status === "success") {
  //     toast.success("Added successfully");
  //   }
  // }

  useEffect(() => {
    if (!brand.length) return;

    const query = `brand=${brand}`;

    getCars(query)
      .then((data) => setCars(data ?? []))
      .catch((e) => toast.error("Could not get car list"));
  }, [brand]);

  return (
    <>
      <button
        className="inline-flex items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 rounded-sm self-end"
        onClick={openModal}
      >
        Add New
      </button>
      <Modal
        isOpen={isOpen}
        title="Add to Settings"
        onClose={closeModal}
        disableBackdropClick={true}
      >
        <AddItemForm closeModalHandler={closeModal} />
      </Modal>
    </>
  );
};
export default AddNewButton;
