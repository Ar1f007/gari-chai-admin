import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { toast } from "sonner";

export const useUploadImage = () => {
  const { edgestore } = useEdgeStore();

  const [fileProgress, setFileProgress] = useState(0);

  async function uploadImage(file: File) {
    if (file) {
      const res = await edgestore.publicImages.upload({
        file,
        onProgressChange(progress) {
          setFileProgress(progress);
        },
      });

      return res;
    }
  }

  async function confirmUpload(urls: string[]) {
    await Promise.all(
      urls.map(async (urlToConfirm) => {
        try {
          await edgestore.publicImages.confirmUpload({
            url: urlToConfirm,
          });
        } catch (error) {
          toast.error("Image upload is failed");
          // TODO
          // Allow user to confirm the upload again
        }
      })
    );
  }

  return {
    uploadImage,
    confirmUpload,
    fileProgress,
  };
};
