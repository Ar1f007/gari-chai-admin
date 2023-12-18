"use client";

import ConfirmDelete from "@/components/shared/delete-alert-dialog";
import { Button } from "@/components/ui/button";
import { TAGS, invalidateAdminCache, invalidateUICache } from "@/services";
import { TSlider, sliderService } from "@/services/slider";
import { useState } from "react";
import { toast } from "sonner";

const EditDeleteBtn = ({ item }: { item: TSlider }) => {
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  function hideConfirmAlert() {
    setShowConfirmAlert(false);
  }

  async function handleDeleteItem() {
    const res = await sliderService.deleteSlider(item._id);

    if (res.status !== "success") {
      toast.error(res.message || "Something went wrong");
      return;
    }

    invalidateAdminCache([TAGS.sliders]);
    invalidateUICache([TAGS.sliders]);

    hideConfirmAlert();
    toast.success("Slider deleted successfully");
  }

  return (
    <div className="flex gap-2">
      <Button
        className="w-full"
        size="sm"
      >
        Edit
      </Button>

      <Button
        variant="destructive"
        className="w-full"
        size="sm"
        onClick={() => setShowConfirmAlert(true)}
      >
        Delete
      </Button>

      <ConfirmDelete
        isOpen={showConfirmAlert}
        handleCancelBtnClick={hideConfirmAlert}
        onConfirm={handleDeleteItem}
        loading={loading}
      />
    </div>
  );
};
export default EditDeleteBtn;
