"use client";

import { TSlider, sliderService } from "@/services/slider";
import Button from "../UI/Form/Button";
import { toast } from "sonner";
import { TAGS, invalidateAdminCache, invalidateUICache } from "@/services";

const DeleteSliderConfirmModal = ({
  slider,
  onClose,
}: {
  slider: TSlider;
  onClose: () => void;
}) => {
  async function handleDelete() {
    const res = await sliderService.deleteSlider(slider._id);

    if (res.status !== "success") {
      toast.error(res.message || "Something went wrong");
      return;
    }

    invalidateAdminCache([TAGS.sliders]);
    invalidateUICache([TAGS.sliders]);

    onClose();
    toast.success("Slider deleted successfully");
  }

  return (
    <div className="flex flex-col gap-9 w-full max-w-md">
      <div className="space-y-5">
        <h3>Are you sure you want to delete the slider?</h3>

        <div className="flex gap-2">
          <Button
            type="button"
            title="Yes, Delete"
            classes="!bg-danger"
            onClick={handleDelete}
          />

          <Button
            type="button"
            title="Cancel"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};
export default DeleteSliderConfirmModal;
