"use client";

import { useForm } from "react-hook-form";
import { FormProvider } from "../UI/Form/FormProvider";
import TextInput from "../UI/Form/TextInput";
import Select from "../UI/Form/Select";

type Props = {
  formTitle: string;
};

export const AddEditCarForm = (props: Props) => {
  const { formTitle } = props;

  const methods = useForm();
  const { handleSubmit } = methods;

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">{formTitle}</h3>
          </div>

          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-5 px-5 py-5">
              <TextInput name="name" />

              <Select
                name="option"
                placeholder="Select input"
                options={[
                  { value: "a", label: "a" },
                  { value: "b", label: "b" },
                ]}
              />

              <button
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
