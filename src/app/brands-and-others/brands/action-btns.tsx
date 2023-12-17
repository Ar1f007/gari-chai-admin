"use client";

import { EditIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import ConfirmDelete from "@/components/shared/delete-alert-dialog";
import { Button } from "@/components/ui/button";
import { TAGS, TBrandSchema, invalidateAdminCache } from "@/services";
import { deleteBrand } from "@/services/brands/deleteBrand";

export const BrandActionBtns = ({ item }: { item: TBrandSchema }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function closeAlertDialog() {
    setIsOpen(false);
  }

  async function handleDeleteBodyStyle(item: TBrandSchema) {
    try {
      setLoading(true);

      const res = await deleteBrand(item._id);

      if (res.status === "success") {
        closeAlertDialog();

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
        onClick={() => alert()}
      >
        <div className="sr-only">Click to Edit</div>
        <EditIcon />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
      >
        <div className="sr-only">Click to Delete</div>
        <Trash2Icon className="text-destructive" />
      </Button>

      <ConfirmDelete
        isOpen={isOpen}
        handleCancelBtnClick={closeAlertDialog}
        onConfirm={() => handleDeleteBodyStyle(item)}
        loading={loading}
      />
    </div>
  );
};
