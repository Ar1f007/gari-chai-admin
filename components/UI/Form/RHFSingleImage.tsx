import { Controller, get, useFormContext } from "react-hook-form";
import { SingleImageDropzone } from "./SingleImageDropzone";

type Props = {
  name: string;
  maxSize?: number;
  defaultValue?: string;
};

const RHFSingleImage = (props: Props) => {
  const {
    name,
    defaultValue,
    maxSize = 1024 * 300, // 300 kb
  } = props;

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const err = get(errors, name);

  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => (
        <div>
          <SingleImageDropzone
            {...field}
            width={200}
            height={200}
            dropzoneOptions={{
              maxSize,
            }}
          />
          {err && (
            <p className="text-danger text-sm ml-4 mt-2">
              {err?.message?.toString()}
            </p>
          )}
        </div>
      )}
    />
  );
};
export default RHFSingleImage;
