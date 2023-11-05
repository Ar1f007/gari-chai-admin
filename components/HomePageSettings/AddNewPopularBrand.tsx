"use client";
import { useState } from "react";
import Modal from "../Dialog/Dialog";
import Button from "../UI/Form/Button";
import AddPopularBrandForm from "./AddPopularBrandForm";

const AddNewBrandButton = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="self-end">
        <Button
          title="Add New"
          onClick={openModal}
          classes="py-4 px-10 lg:px-8 xl:px-10"
        />
      </div>
      <Modal
        isOpen={isOpen}
        title="Add to Popular Brands Section"
        onClose={closeModal}
        disableBackdropClick={true}
      >
        <AddPopularBrandForm closeModalHandler={closeModal} />
      </Modal>
    </>
  );
};
export default AddNewBrandButton;
