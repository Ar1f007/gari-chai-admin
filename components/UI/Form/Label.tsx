import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  required?: boolean;
  classes?: string;
};
const InputLabel = ({ label, required = true, classes }: Props) => {
  return (
    <label
      className={twMerge(
        "mb-2.5 block text-black dark:text-white capitalize",
        classes
      )}
      htmlFor={label}
    >
      {label} {required && "*"}
    </label>
  );
};
export default InputLabel;
