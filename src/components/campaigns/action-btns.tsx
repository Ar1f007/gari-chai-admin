"use client";

import { TCarCampaign } from "@/schemas/campaign";
import { Button } from "../ui/button";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import ConfirmDelete from "../shared/delete-alert-dialog";
import { useRouter } from "next/navigation";
import { settingsActions } from "@/store/settings";
import { routes } from "@/utils/routes";

const ActionBtn = ({ campaign }: { campaign: TCarCampaign }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showDialog, setShowDialog] = useState<
    "edit" | "confirm-delete" | null
  >(null);

  function closeDialog() {
    setShowDialog(null);
  }

  async function handleDeleteCampaign(campaign: TCarCampaign) {}

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
