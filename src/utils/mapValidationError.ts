import { TApiValidationError } from "@/types/others";
import { FieldValues, UseFormReturn } from "react-hook-form";

// Maps APIs validation error object to hook forms errors
export const mapValidationErrors = <FormFields extends FieldValues>(
  errors: TApiValidationError["errors"],
  formHandler: UseFormReturn<FormFields>
) => {
  errors.forEach((error) => {
    const path = error.path.length > 1 ? error.path.join(".") : error.path[0];
    //@ts-ignore
    formHandler.setError(path, {
      message: error.message,
      type: "custom",
    });
  });
};
