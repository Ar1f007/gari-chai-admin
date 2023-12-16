import { TApiValidationError } from "@/types/others";
import { FieldValues, UseFormReturn } from "react-hook-form";

// Maps APIs validation error object to hook forms errors
export const mapValidationErrors = <FormFields extends FieldValues>(
  errors: TApiValidationError["errors"],
  formHandler: UseFormReturn<FormFields>
) => {
  errors.forEach((error) => {
    const path = error.path.join(".");
    //@ts-ignore
    formHandler.setError(path, error.message);
  });
};
