"use client";
import { useState } from "react";
import Modal from "../Dialog/Dialog";
import AddItemForm from "./AddItemForm";

const AddNewButton = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
