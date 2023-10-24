type Props = {
  label: string;
  required?: boolean;
};
const InputLabel = ({ label, required = true }: Props) => {
  return (
    <label
      className="mb-2.5 block text-black dark:text-white capitalize"
      htmlFor={label}
    >
      {label} {required && "*"}
    </label>
  );
};
export default InputLabel;
