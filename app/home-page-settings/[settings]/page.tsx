"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Car } from "@/components/Cards/Car";
import { useGetBrandsOptions } from "@/hooks/useGetBrandsOptions";
import { TCarSchema, getCars } from "@/services";
import { addToHomePageSettings } from "@/services/home/addToHomePageSettings";

type SettingTypeProps = {
  params: {
    settings: string;
  };
};
const HomepageSettingsSectionPage = (props: SettingTypeProps) => {
  const settingsName = props.params.settings;

  const [brand, setBrand] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [cars, setCars] = useState<TCarSchema[]>([]);

  const brandOptions = useGetBrandsOptions();

  function handleOnAddNewBtnClick() {
    setOpenForm(true);
  }

  async function handleAdd(car: TCarSchema) {
    const res = await addToHomePageSettings({ payload: car, settingsType: settingsName });

    if (!res || res.status === "error" || res.status === "fail") {
      toast.error("Failed to add to the " + settingsName);
      return;
    }

    if (res.status === "success") {
      toast.success("Added successfully");
    }
  }

  useEffect(() => {
    if (!brand.length) return;

    const query = `brand=${brand}`;

    getCars(query)
      .then((data) => setCars(data ?? []))
      .catch((e) => toast.error("Could not get car list"));
  }, [brand]);

  return (
    <div>
      <Breadcrumb pageName="Home Page Settings" />

      <section className="flex flex-col gap-5">
        <button
          className="inline-flex items-center justify-center gap-2.5 bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 rounded-sm self-end"
          onClick={handleOnAddNewBtnClick}
        >
          Add New
        </button>
      </section>

      <div>
        {/* Select brand */}
        <div className="mb-4.5 max-w-md">
          <label className="mb-2.5 block text-black dark:text-white">Select Brand</label>
          <div className="relative z-20 bg-transparent dark:bg-form-input">
            <select
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Select Brand</option>
              {brandOptions.map((option, idx) => (
                <option
                  value={option.value}
                  key={idx}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill=""
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 cursor-pointer">
        {!brand ? (
          <p className="text-lg uppercase">Select a brand to get started !</p>
        ) : brand && cars.length === 0 ? (
          <h3 className="text-lg font-semibold">No car was found related to this brand</h3>
        ) : (
          cars.map((car) => (
            <div key={car._id}>
              <Car car={car}>
                <button
                  className={
                    "uppercase tracking-wider flex w-full justify-center items-center rounded bg-primary px-3 py-2 text-sm font-medium text-gray hover:bg-opacity-90 cursor-pointer transition-all duration-200"
                  }
                  onClick={() => handleAdd(car)}
                >
                  Add to {settingsName}
                </button>
              </Car>
            </div>
          ))
        )}
      </section>
    </div>
  );
};
export default HomepageSettingsSectionPage;
