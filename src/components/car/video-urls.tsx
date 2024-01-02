import { useFieldArray, useFormContext } from "react-hook-form";
import TextField from "../form/text-field";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SingleImageDropzone } from "../ui/single-image-dropzone";
import { Trash2Icon } from "lucide-react";
import clsx from "clsx";

import { imageSchema } from "@/schemas/utils";
import { z } from "zod";

type VideoProps = {
  value?: z.infer<typeof imageSchema>;
};

export const VideoUrl = ({ value }: VideoProps) => {
  const { fields, append, remove } = useFieldArray({
    name: "videos",
  });

  const form = useFormContext();

  return (
    <div>
      <h6 className="font-semibold dark:text-bodydark1 mb-3 uppercase">
        Attach Videos
      </h6>
      <div className="">
        <ul className="flex flex-col gap-5">
          {fields.map((field, idx) => (
            <li
              key={field.id}
              className="flex flex-col gap-8 outline rounded outline-1 outline-muted p-5"
            >
              <div className="flex flex-col lg:flex-row gap-5 lg:items-end">
                <FormField
                  control={form.control}
                  name={`videos.${idx}.thumbnailImage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Thumbnail (optional)</FormLabel>
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

                {/* {form.getValues(`videos.${idx}.thumbnailImage`) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={
                      form.getValues(`videos.${idx}.thumbnailImage`)
                        ?.thumbnailUrl
                    }
                    alt="preview"
                    width={200}
                    height={200}
                    className="rounded"
                  />
                )} */}
              </div>

              <TextField
                name={`videos.${idx}.link`}
                label="Video URL *"
                className="max-w-lg"
                placeholder="add video url"
              />

              <div className="flex gap-2 flex-wrap">
                {/* <Button
                  variant="secondary"
                  onClick={() =>
                    uploadVideoThumbnail(`videos.${idx}.thumbnailImage`)
                  }
                >
                  <UploadCloudIcon className="mr-2" /> Upload Image
                </Button> */}
                <Button
                  variant="destructive"
                  className="max-w-fit"
                  onClick={() => remove(idx)}
                >
                  <Trash2Icon className="mr-2" /> Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <Button
          type="button"
          onClick={() => append({ link: "", thumbnailImage: undefined })}
          className={clsx("", {
            "mt-5": !!fields.length,
          })}
        >
          Add {fields.length > 0 ? "More" : ""} Video
        </Button>
      </div>
    </div>
  );
};
