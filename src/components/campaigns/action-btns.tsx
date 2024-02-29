"use client";

import { TCarCampaign } from "@/schemas/campaign";
import { Button } from "../ui/button";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import ConfirmDelete from "../shared/delete-alert-dialog";
import { useRouter } from "next/navigation";
import { settingsActions } from "@/store/settings";
import { routes } from "@/utils/routes";
import { deleteCarCampaign } from "@/services/campaign/car-campaign";
import { toast } from "sonner";
import { TAGS, invalidateAdminCache } from "@/services";

const ActionBtn = ({ campaign }: { campaign: TCarCampaign }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showDialog, setShowDialog] = useState<
    "edit" | "confirm-delete" | null
  >(null);

  function closeDialog() {
    setShowDialog(null);
  }

  async function handleDeleteCampaign(campaign: TCarCampaign) {
    const res = await deleteCarCampaign({ id: campaign._id });

    if (!res) {
      toast.error("Something went wrong, please try again");
      return;
    }

    if (res.status == "success") {
      invalidateAdminCache([TAGS.carCampaigns]);
      toast.success("Deleted Successfully");
      return;
    }

    toast.error(res.message || "Something went wrong");
  }

  function handleOnEditClick(campaign: TCarCampaign) {
    settingsActions.setCampaign(campaign);

    const url = routes.campaignRoutes.campaigns + "/edit/" + campaign._id;

    router.push(url);
  }

  return (
    <div className="space-x-1">
      <Button
        size="icon"
        variant="ghost"
        className="size-4 text-destructive-foreground hover:bg-background/20"
        onClick={() => handleOnEditClick(campaign)}
      >
        <EditIcon />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="size-4 text-destructive hover:text-destructive hover:bg-background/20"
        onClick={() => setShowDialog("confirm-delete")}
      >
        <Trash2Icon />
      </Button>

      <ConfirmDelete
        isOpen={showDialog == "confirm-delete"}
        handleCancelBtnClick={closeDialog}
        onConfirm={() => handleDeleteCampaign(campaign)}
        loading={loading}
      />
    </div>
  );
};
export default ActionBtn;
