import { EditIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { EditVendor } from "./vendor-edit";
import ConfirmDelete from "@/components/shared/delete-alert-dialog";
import { vendorService } from "@/services/vendor";

import { TAGS, invalidateAdminCache } from "@/services";
import { TVendorSchema } from "@/schemas/vendor";

export const VendorActionBtns = ({ vendor }: { vendor: TVendorSchema }) => {
  const [loading, setLoading] = useState(false);

  const [showDialog, setShowDialog] = useState<
    "edit" | "confirm-delete" | null
  >(null);

  function closeDialog() {
    setShowDialog(null);
  }

  async function handleDeleteVendor(vendor: TVendorSchema) {
    try {
      setLoading(true);

      const res = await vendorService.deleteVendor(vendor._id);

      if (res.status === "success") {
        invalidateAdminCache([TAGS.vendors]);

        return;
      }

      toast.error("Fail", {
        description: res.message || "Something went wrong",
      });
      closeDialog();
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

      <EditVendor
        item={vendor}
        isOpen={showDialog == "edit"}
        closeDialog={closeDialog}
      />

      <ConfirmDelete
        isOpen={showDialog == "confirm-delete"}
        handleCancelBtnClick={closeDialog}
        onConfirm={() => handleDeleteVendor(vendor)}
        loading={loading}
      />
    </div>
  );
};
