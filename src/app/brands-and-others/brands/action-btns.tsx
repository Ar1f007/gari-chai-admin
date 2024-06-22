"use client";

import { EditIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import ConfirmDelete from "@/components/shared/delete-alert-dialog";
import { Button } from "@/components/ui/button";
import { TAGS, TBrandSchema, invalidateAdminCache } from "@/services";
import { deleteBrand } from "@/services/brands/deleteBrand";
import EditBrand from "../_edit/edit-brand";

export const BrandActionBtns = ({ item }: { item: TBrandSchema }) => {
  const [loading, setLoading] = useState(false);

  const [showDialog, setShowDialog] = useState<
    "edit" | "confirm-delete" | null
  >(null);

  function closeDialog() {
    setShowDialog(null);
  }

  async function handleDeleteBrand(item: TBrandSchema) {
    try {
      setLoading(true);

      const res = await deleteBrand(item._id);

      if (res.status === "success") {
        closeDialog();

        invalidateAdminCache([TAGS.brands]);

        return;
      }

      toast.error("Fail", {
        description: res.message || "Something went wrong",
      });
    } catch (error) {
      toast.error("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowDialog("edit")}
      >
        <div className="sr-only">Click to Edit</div>
        <EditIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowDialog("confirm-delete")}
      >
        <div className="sr-only">Click to Delete</div>
        <Trash2Icon className="text-destructive" />
      </Button>

      <EditBrand
        brand={item}
        isOpen={showDialog == "edit"}
        closeDialog={closeDialog}
      />

      <ConfirmDelete
        isOpen={showDialog == "confirm-delete"}
        handleCancelBtnClick={closeDialog}
        onConfirm={() => handleDeleteBrand(item)}
        loading={loading}
      />
    </div>
  );
};
