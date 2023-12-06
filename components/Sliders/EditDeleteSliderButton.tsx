"use client";

import { TSlider } from "@/services/slider";
import { useState } from "react";
import Button from "../UI/Form/Button";
import Modal from "../Dialog/Dialog";
import { EditSlider } from "./EditSlider";
import DeleteSliderConfirmModal from "./DeleteSliderConfirmModal";

type EditDeleteSliderButtonProps = {
  sliderItem: TSlider;
};

const EditDeleteSliderButton = ({
  sliderItem,
}: EditDeleteSliderButtonProps) => {
  const [slider, setSlider] = useState<{
    item: TSlider;
    type: "edit" | "delete";
  } | null>(null);

  function handleOnButtonClick(type: "edit" | "delete") {
    setSlider({ item: sliderItem, type });
  }

  function closeModal() {
    setSlider(null);
  }

  return (
    <>
      <div className="flex gap-2">
        <Button
          type="button"
          title="Edit"
          classes="py-2 basis-1/2"
          onClick={() => handleOnButtonClick("edit")}
        />

        <Button
          type="button"
          title="Delete"
          classes="py-2 basis-1/2 !bg-danger"
          onClick={() => handleOnButtonClick("delete")}
        />

        {slider?.item && (
          <Modal
            title={slider.type === "edit" ? "Update Slider" : "Delete Slider"}
            isOpen={true}
            onClose={closeModal}
          >
            {slider.type === "edit" ? (
              <EditSlider
                slider={slider.item}
                onClose={closeModal}
              />
            ) : (
              <DeleteSliderConfirmModal
                slider={slider.item}
                onClose={closeModal}
              />
            )}
          </Modal>
        )}
      </div>
    </>
  );
};
export default EditDeleteSliderButton;
