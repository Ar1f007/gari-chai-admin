import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import clsx from "clsx";
import TextInput from "../UI/Form/TextInput";

export const LaunchedDate = () => {
  const { setValue } = useFormContext();
  const [isUpcomingCar, setIsComingCar] = useState(false);

  useEffect(() => {
    if (!isUpcomingCar) {
      setValue("launchedAt", new Date());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpcomingCar]);

  return (
    <div className="max-w-sm">
      <div className="flex gap-2 items-center mt-5 mb-5">
        <label
          htmlFor="toggle1"
          className="flex cursor-pointer select-none items-center"
        >
          <div className="relative">
            <input
              type="checkbox"
              id="toggle1"
              className="sr-only"
              onChange={() => {
                setIsComingCar(!isUpcomingCar);
              }}
            />
            <div
              className={clsx(
                "block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]",
                {
                  "dark:bg-primary": isUpcomingCar,
                }
              )}
            ></div>

            <div
              className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
                isUpcomingCar &&
                "!right-1 !translate-x-full !bg-primary dark:!bg-white"
              }`}
            ></div>
          </div>
        </label>

        <p className="text-primary font-medium text-xl">
          {isUpcomingCar ? "Soon to be launched" : "Launched"}{" "}
        </p>
      </div>

      {isUpcomingCar ? (
        <TextInput
          name="launchedAt"
          label="Choose Expected Launch Date"
          type="date"
        />
      ) : null}
    </div>
  );
};
