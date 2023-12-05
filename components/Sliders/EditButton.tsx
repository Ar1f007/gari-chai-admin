"use client";

import { TSlider } from "@/services/slider";
import Button from "../UI/Form/Button";
import Modal from "../Dialog/Dialog";
import { AddSlider } from "./AddSlider";
import { useState } from "react";
import { EditSlider } from "./EditSlider";

type ButtonProps = {
  slider: TSlider;
};

const EditButton = ({ slider }: ButtonProps) => {

    const [sliderItem, setSliderItem] = useState<TSlider | null>(null);

  function handleEdit(slider: TSlider) {
    setSliderItem(slider);
  }


  function closeModal () {
    setSliderItem(null); 
  }
  
  return (
    <>
    <Button
      type="button"
      title="Edit"
      classes="py-2 w-full"
      onClick={() => handleEdit(slider)}
      />

      <Modal title="Edit Slider" isOpen={!!sliderItem} onClose={closeModal}>
        <EditSlider slider={slider} onClose={closeModal} />
      </Modal>
      </>
  );
};

export default EditButton;
