import * as React from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

import { cn, formatFileSize } from "@/lib/utils";

type InputFileType = "image" | "video" | "audio" | "file" | "unknown";

const DEFAULT_ALLOWED_TYPES: FileList[number]["type"][] = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "video/mp4",
  "audio/mpeg",
];

const fileTypeMap = new Map<string, InputFileType>([
  ["image/png", "image"],
  ["image/jpeg", "image"],
  ["image/gif", "image"],
  ["video/mp4", "video"],
  ["video/ogg", "video"],
  ["video/webm", "video"],
  ["audio/mpeg", "audio"],
  ["audio/ogg", "audio"],
  ["audio/wav", "audio"],
]);

const ERROR_MESSAGES = {
  fileTooLarge(fileName: string, maxSize: number) {
    return `The File "${fileName}" is too big. Max size is ${formatFileSize(
      maxSize
    )}.`;
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  notEnoughFiles(minFiles: number) {
    return `You must add at least ${minFiles} file(s).`;
  },
  fileNotSupported(fileName: string) {
    return `${fileName} is not supported.`;
  },
};

type MaxSize = {
  [K in Exclude<InputFileType, "unknown">]?: number;
};

type PreviewFile = {
  file: File;
  type: InputFileType;
  previewUrl: string;
};

type InputProps = {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  value?: File | string;
  onChange?: (file: File) => void | Promise<void>;
  disabled?: boolean;
  allowedTypes?: string[];
  accept?: {
    multiple?: boolean;
    maxSize?: MaxSize;
    allowedTypes?: string[];
    minFiles?: number;
    maxFiles?: number;
  };
};
const FileInputWithPreview = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const formContext = useFormContext();

    const [files, setFiles] = React.useState<PreviewFile[]>([]);

    const {
      name,
      width = 200,
      height = 200,
      className,
      disabled,
      accept: {
        multiple = false,
        maxSize = {},
        allowedTypes = DEFAULT_ALLOWED_TYPES,
        minFiles = 0,
        maxFiles = Infinity,
      } = {},
    } = props;

    function handleFileType(file: File): InputFileType {
      return fileTypeMap.get(file.type) || "unknown";
    }

    function validateFile(file: File): boolean {
      const fileType = handleFileType(file);

      // check file type
      if (fileType === "unknown" || !allowedTypes.includes(file.type)) {
        formContext.setError(name, {
          type: "custom",
          message: ERROR_MESSAGES.fileNotSupported(file.name),
        });
        return false;
      }

      // check file size
      const givenFileSize = file.size;
      const maxFileSize = maxSize?.[fileType];

      if (maxFileSize && givenFileSize > maxFileSize) {
        formContext.setError(name, {
          type: "custom",
          message: ERROR_MESSAGES.fileTooLarge(file.name, maxFileSize),
        });

        return false;
      }

      return true;
    }

    function validateFiles(files: FileList): File[] {
      if (minFiles > maxFiles) {
        throw new Error(
          "`minFiles` should be less than or equal to `maxFiles`."
        );
      }

      let validFiles: File[] = [];

      if (files.length > maxFiles) {
        formContext.setError(name, {
          type: "custom",
          message: ERROR_MESSAGES.tooManyFiles(maxFiles),
        });

        return [];
      }

      if (files.length < minFiles) {
        formContext.setError(name, {
          type: "custom",
          message: ERROR_MESSAGES.notEnoughFiles(minFiles),
        });

        return [];
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (validateFile(file)) {
          validFiles.push(file);
        }
      }

      return validFiles;
    }

    function clearPreviousErrors(): void {
      if (formContext.formState.errors[name]) formContext.clearErrors(name);
    }

    function updateFilesInFormContext(validFiles: File[]): void {
      const dataTransfer = new DataTransfer();
      for (const file of validFiles) {
        dataTransfer.items.add(file);
      }
      formContext.setValue("value", dataTransfer.files);
    }

    function updatePreviewFiles(validFiles: File[]) {
      const updatedFiles = validFiles.map((file) => ({
        file,
        type: handleFileType(file),
        previewUrl: URL.createObjectURL(file),
      }));
      setFiles(updatedFiles);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (!e.target.files) return;

      clearPreviousErrors();

      const validFiles = validateFiles(e.target.files);
      updateFilesInFormContext(validFiles);
      updatePreviewFiles(validFiles);
    }

    function handleRemovePreview(file: PreviewFile) {
      const dataTransfer = new DataTransfer();
      for (const item of files) {
        if (item.file.name === file.file.name) {
          continue;
        }
        dataTransfer.items.add(item.file);
      }

      setFiles(files.filter((item) => item.file.name !== file.file.name));
      formContext.setValue("value", dataTransfer.files);
    }

    function previewAttachedFile(file: PreviewFile) {
      const fileType = file.type;
      const previewUrl = file.previewUrl;

      switch (fileType) {
        case "image":
          return (
            <Image
              src={previewUrl}
              alt="preview"
              width={width}
              height={height}
              className="w-full object-contain"
            />
          );

        case "video":
          return (
            <video
              src={previewUrl}
              width={width}
              height={height}
              className="w-full aspect-video"
              controls
            >
              Your browser does not support the video preview.
            </video>
          );

        case "audio":
          return (
            <audio
              controls
              className="max-w-[250px] sm:max-w-sm"
            >
              <source src={previewUrl} />
            </audio>
          );

        case "unknown":
          return (
            <div className={className}>
              <p>Unknown file type</p>
            </div>
          );

        default:
          return null;
      }
    }

    React.useEffect(() => {
      return () => {
        for (const file of files) {
          URL.revokeObjectURL(file.previewUrl);
        }
      };
    }, [files]);

    return (
      <div>
        <FormField
          control={formContext.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id={field.name}
                  type="file"
                  onChange={handleFileChange}
                  ref={ref || field.ref}
                  disabled={disabled}
                  multiple={multiple}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!!files.length && (
          <ul className="flex flex-wrap space-x-2 space-y-5 mt-5">
            {files.map((file, idx) => (
              <li
                key={idx}
                className={cn(
                  "relative w-fit rounded-md",
                  file.type !== "audio" && "border",
                  className
                )}
              >
                {previewAttachedFile(file)}

                <Button
                  type="button"
                  variant={file.type === "audio" ? "destructive" : "ghost"}
                  className={cn(
                    "absolute top-0 right-0",
                    file.type === "audio" && "top-2 -right-12"
                  )}
                  onClick={() => handleRemovePreview(file)}
                  size="icon"
                >
                  <XIcon />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

FileInputWithPreview.displayName = "FileInputWithPreview";

export { FileInputWithPreview };
