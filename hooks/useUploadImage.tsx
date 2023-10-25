import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";

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

  return {
    uploadImage,
    fileProgress,
  };
};
