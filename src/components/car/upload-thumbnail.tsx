"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SingleImageDropzone } from "../ui/single-image-dropzone";
import { z } from "zod";
import { imageSchema } from "@/schemas/utils";
import { useState } from "react";

type ThumbnailProps = {
  value?: z.infer<typeof imageSchema>;
};

const UploadThumbnail = ({ value }: ThumbnailProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(value?.originalUrl);

  const form = useFormContext();

  return (
    <div className="flex flex-col md:flex-row gap-5 items-center">
      <FormField
        control={form.control}
        name="posterImage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload a Thumbnail</FormLabel>
            <FormControl>
              <SingleImageDropzone
                {...field}
                width={200}
                height={200}
                dropzoneOptions={{
                  maxSize: 1024 * 300, // 300 kb
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {imgSrc && !form.getValues("posterImage") && (
        <div className="flex gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt="preview"
            width={200}
            height={200}
            className="rounded-md"
          />
        </div>
      )}
    </div>
  );
};
export default UploadThumbnail;
