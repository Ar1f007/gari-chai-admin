import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SingleImageDropzone } from "../ui/single-image-dropzone";
import { NewCarInputs } from "@/schemas/new-car";

const UploadThumbnail = () => {
  const form = useFormContext<NewCarInputs>();

  return (
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
  );
};
export default UploadThumbnail;
