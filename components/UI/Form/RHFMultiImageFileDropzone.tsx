"use client";

import { MultiFileDropzone, type FileState } from "./MultiFileDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useFormContext } from "react-hook-form";
import { DropzoneOptions } from "react-dropzone";

export const defaultMultiImageDropzoneOptions: Omit<
  DropzoneOptions,
  "disabled"
> = {
  maxFiles: 5,
  maxSize: 1024 * 300, // 300 kb
  accept: { "image/*": [] },
};

type RHFMultiImageFileDropzoneParamsType = {
  name: string;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};

export function RHFMultiImageFileDropzone({
  name,
  dropzoneOptions = defaultMultiImageDropzoneOptions,
}: RHFMultiImageFileDropzoneParamsType) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const { setValue } = useFormContext();

  const [uploadRes, setUploadRes] = useState<string[]>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  useEffect(() => {
    setValue(name, uploadRes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadRes, name]);

  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        dropzoneOptions={dropzoneOptions}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
        }}
      />

      <Button
        title="Upload"
        type="button"
        classes="py-1 px-4 mt-4"
        onClick={async () => {
          await Promise.all(
            fileStates.map(async (fileState) => {
              try {
                if (fileState.progress !== "PENDING") return;
                const res = await edgestore.publicImages.upload({
                  file: fileState.file,
                  onProgressChange: async (progress) => {
                    updateFileProgress(fileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(fileState.key, "COMPLETE");
                    }
                  },
                  options: {
                    temporary: true,
                  },
                });
                setUploadRes((uploadRes) => [...uploadRes, res.url]);
              } catch (err) {
                updateFileProgress(fileState.key, "ERROR");
              }
            })
          );
        }}
        disabled={
          !fileStates.filter((fileState) => fileState.progress === "PENDING")
            .length
        }
      />
    </div>
  );
}
