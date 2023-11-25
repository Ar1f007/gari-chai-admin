import InputLabel from "../UI/Form/Label";
import RHFSingleImage from "../UI/Form/RHFSingleImage";

export const UploadThumbnail = () => {
  return (
    <div>
      <InputLabel label="Upload a Thumbnail" />
      <RHFSingleImage name="posterImage" />
    </div>
  );
};
