"use client";

import { Label } from "../ui/label";
import RHFMultiImageFileDropzone, {
  DEFAULT_MULTI_IMAGE_DROPZONE_OPTIONS,
} from "../ui/rhf-multi-image";

const AdditionalImages = ({ isEditing = false }: { isEditing?: boolean }) => {
  return (
    <div className="space-y-5">
      <Label>
        Additional Images <small className="text-primary">(up to 10)</small>
      </Label>
      <RHFMultiImageFileDropzone
        name="imageUrls"
        isEditing={isEditing}
        dropzoneOptions={{
          ...DEFAULT_MULTI_IMAGE_DROPZONE_OPTIONS,
          maxFiles: 10,
        }}
      />
    </div>
  );
};
export default AdditionalImages;
