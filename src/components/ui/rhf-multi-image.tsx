import { DropzoneOptions } from "react-dropzone";

import { MultiFileDropzone, type FileState } from "./multi-file-dropzone";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useEdgeStore } from "@/lib/edgestore";
import { Button } from "./button";
import { imageSchema } from "@/schemas/utils";
import { infer as ZodInfer } from "zod";
import { XIcon } from "lucide-react";
import { MAX_ALLOWED_COLOR_IMAGE } from "@/utils/constants";

type ImageKeyUrl = {
  key: string;
  url: ZodInfer<typeof imageSchema>;
};

export const DEFAULT_MULTI_IMAGE_DROPZONE_OPTIONS: Omit<
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
  isEditing?: boolean;
};

const RHFMultiImageFileDropzone = ({
  name,
  dropzoneOptions = DEFAULT_MULTI_IMAGE_DROPZONE_OPTIONS,
  isEditing = false,
}: RHFMultiImageFileDropzoneParamsType) => {
  const form = useFormContext();

  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const { edgestore } = useEdgeStore();

  const imgFiles = form.watch(name) as ImageKeyUrl[];

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

  function removeFileFromFormAndState(fileKey: string) {
    const newFiles = fileStates.filter((file) => file.key !== fileKey);

    // files which is stored in form
    const files = (form.getValues(name) as ImageKeyUrl[]).filter(
      (file) => file.key !== fileKey
    );

    setFileStates(newFiles);

    form.setValue(name, files);
  }

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
        disabled={
          imgFiles.length >=
          (dropzoneOptions.maxFiles || MAX_ALLOWED_COLOR_IMAGE)
        }
        onFileRemove={removeFileFromFormAndState}
        formImageLength={imgFiles.length}
        isEditing={isEditing}
      />

      <Button
        type="button"
        className="mt-4"
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

                form.setValue(name, [
                  ...form.getValues(name),
                  {
                    key: fileState.key,
                    url: {
                      originalUrl: res.url,
                      thumbnailUrl: res.thumbnailUrl || res.url,
                    },
                  },
                ]);
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
      >
        Upload
      </Button>

      {imgFiles.length > 0 ? (
        <ul className="flex flex-wrap gap-5 max-w-lg mt-5">
          {imgFiles.map((val) => (
            <li
              key={val.key}
              className="flex gap-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={val.url.thumbnailUrl || val.url.originalUrl}
                alt="preview"
                width={100}
                height={100}
                className="rounded"
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeFileFromFormAndState(val.key)}
                className="h-8 w-8"
              >
                <XIcon className="w-6 h-6 text-destructive" />
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default RHFMultiImageFileDropzone;
