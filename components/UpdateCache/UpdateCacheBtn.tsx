"use client";

import { useState } from "react";
import Button from "../UI/Form/Button";

import { toast } from "sonner";
import { invalidateUICache } from "@/services";

const UpdateCacheBtn = ({
  tag,
  title = "Update Cache (UI)",
}: {
  tag: string;
  title?: string;
}) => {
  const [loading, setLoading] = useState(false);

  async function updateCacheHandler() {
    try {
      setLoading(true);

      const revalidated = await invalidateUICache([tag]);

      if (revalidated) {
        toast.success(revalidated.message);
        return;
      }

      toast.error(revalidated.message ?? "Something went wrong");
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      title={title}
      onClick={updateCacheHandler}
      loading={loading}
      loadingText="Updating..."
    />
  );
};
export default UpdateCacheBtn;
