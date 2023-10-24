"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { FileState, MultiFileDropzone } from "./MultiFileDropzone";
import Link from "next/link";

export function MultiFileDropzoneUsage() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [urls, setUrls] = useState<Array<{ thumbnail: string | null; originalUrl: string }>>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find((fileState) => fileState.key === key);
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicImages.upload({
                  file: addedFileState.file,
                  input: { type: "car" },
                  options: {
                    temporary: true,
                  },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, "COMPLETE");
                    }
                  },
                });

                // setUrls((prev) => [...prev, {thumbnail: res.thumbnailUrl, originalUrl: res.url}]);
                setUrls((prev) => [...prev, { originalUrl: res.url, thumbnail: res.thumbnailUrl }]);
                console.log("called");
              } catch (err) {
                updateFileProgress(addedFileState.key, "ERROR");
              }
            })
          );
        }}
      />

      {urls.map((url, idx) => (
        // <p key={url}>{url}</p>
        <p key={idx}>
          <Link
            href={url.originalUrl}
            target="_blank"
          >
            original
          </Link>
          <Link
            href={url?.thumbnail ?? ""}
            target="_blank"
          >
            Thumbnail
          </Link>
        </p>
      ))}
    </div>
  );
}
