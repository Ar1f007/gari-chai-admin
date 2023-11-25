import clsx from "clsx";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";

type Props = {
  name: string;
  checkedText: string;
  unCheckedText: string;
  variant?: "one" | "two";
};

const RHFSwitch = ({
  name,
  variant = "one",
  checkedText,
  unCheckedText,
}: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const checked = useWatch({
    name,
  });

  const err = get(errors, name);

  const checkbox1 = (
    <>
      <div
        className={clsx("block h-8 w-14 rounded-full bg-strokedark", {
          "!bg-primary": checked,
        })}
      ></div>
      <div
        className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
          checked && "!right-1 !translate-x-full"
        }`}
      ></div>
    </>
  );

  const checkbox2 = (
    <>
      <div
        className={clsx(
          "h-5 w-14 rounded-full bg-meta-9 shadow-inner dark:bg-[#5A616B]",
          {
            "dark:bg-primary": checked,
          }
        )}
      ></div>
      <div
        className={`dot absolute left-0 -top-1 h-7 w-7 rounded-full bg-white shadow-switch-1 transition ${
          checked && "!right-0 !translate-x-full !bg-primary dark:!bg-white"
        }`}
      ></div>
    </>
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div>
            <label
              htmlFor="toggle4"
              className="flex cursor-pointer select-none items-center"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="toggle4"
                  className="sr-only"
                  {...field}
                />
                {variant === "one" && checkbox1}

                {variant === "two" && checkbox2}
              </div>

              <p className="ml-2 text-white">
                {checked ? checkedText : unCheckedText}{" "}
              </p>
            </label>

            {err && (
              <p className="text-danger text-sm ml-4 mt-2">
                {err?.message?.toString()}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
export default RHFSwitch;
