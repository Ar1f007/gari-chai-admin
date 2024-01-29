"use client";

import ConfirmDelete from "@/components/shared/delete-alert-dialog";
import { Button } from "@/components/ui/button";
import { TAGS, invalidateAdminCache, invalidateUICache } from "@/services";
import { TSlider, sliderService } from "@/services/slider";
import { useState } from "react";
import { toast } from "sonner";
import EditSlider from "./edit-slider";

const EditDeleteBtn = ({ item }: { item: TSlider }) => {
  const [actionType, setActionType] = useState<
    "edit-slider" | "delete-slider" | undefined
  >(undefined);

  const [loading, setLoading] = useState(false);

  function hideConfirmAlert() {
    setActionType(undefined);
  }

  function handleOnActionBtn(
    type: "edit-slider" | "delete-slider" | undefined
  ) {
    setActionType(type);
  }

  async function handleDeleteItem() {
    try {
      setLoading(true);
      const res = await sliderService.deleteSlider(item._id);

      if (res.status !== "success") {
        toast.error(res.message || "Something went wrong");
        return;
      }

      invalidateAdminCache([TAGS.sliders]);
      invalidateUICache({
        tags: [TAGS.sliders],
      });

      hideConfirmAlert();
      toast.success("Slider deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        className="w-full"
        size="sm"
        onClick={() => handleOnActionBtn("edit-slider")}
      >
        Edit
      </Button>

      <Button
        variant="destructive"
        className="w-full"
        size="sm"
        onClick={() => handleOnActionBtn("delete-slider")}
      >
        Delete
      </Button>

      {actionType === "delete-slider" && (
        <ConfirmDelete
          isOpen={true}
          handleCancelBtnClick={hideConfirmAlert}
          onConfirm={handleDeleteItem}
          loading={loading}
        />
      )}

      {actionType === "edit-slider" && (
        <EditSlider
          slider={item}
          hideForm={hideConfirmAlert}
        />
      )}
    </div>
  );
};
export default EditDeleteBtn;
