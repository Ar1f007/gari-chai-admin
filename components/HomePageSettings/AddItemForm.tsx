import { useGetBrandsOptions } from "@/hooks/useGetBrandsOptions";
import { TCarSchema, getCars } from "@/services";
import { SelectOption } from "@/types/others";
import {
  HOME_SETTINGS_OPTIONS,
  PRIMARY_COLOR,
  settingsOptions,
} from "@/util/constants";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ReactSelect, {
  GroupBase,
  StylesConfig,
  ThemeConfig,
} from "react-select";
import Image from "next/image";
import { addToHomePageSettings } from "@/services/home/addToHomePageSettings";

type CarOption = {
  value: TCarSchema;
  label: string;
  image: string | undefined;
};

const reactSelectOptions: {
  theme: ThemeConfig;
  styles: StylesConfig<unknown, boolean, GroupBase<unknown>> | undefined;
} = {
  theme: (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: PRIMARY_COLOR,
      primary25: "#1d2a39",
    },
  }),

  styles: {
    control: (baseStyles) => ({
      ...baseStyles,
      paddingBlock: "8px",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    menuList: (base) => ({ ...base, backgroundColor: "#24303F" }),
  },
};

const AddItemForm = ({
  closeModalHandler,
}: {
  closeModalHandler: () => void;
}) => {
  const [cars, setCars] = useState<CarOption[]>();

  const [brand, setSelectedBrand] = useState<SelectOption | null>(null);

  const [selectedCar, setSelectedCar] = useState<CarOption | null>(null);

  const [selectedSetting, setSelectedSetting] =
    useState<SelectOption<string> | null>(null);

  const [sort, setSort] = useState(0);

  const [loading, setLoading] = useState(false);

  const brandOptions = useGetBrandsOptions();

  async function fetchCars(query: string) {
    try {
      setLoading(true);
      const cars = await getCars(query);

      const carOptions = (cars ?? []).map((car) => ({
        value: car,
        label: car.name,
        image: car.imageUrls?.[0],
      }));

      setCars(carOptions);
    } catch (error) {
      toast.error("Could not get car list");
      setCars([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleOnAddClick() {
    if (!brand || !selectedCar || !selectedSetting) {
      toast.error("Please select required fields (brand, car, setting)", {
        position: "top-center",
      });
      return;
    }

    try {
      const res = await addToHomePageSettings({
        payload: selectedCar.value,
        settingsType: selectedSetting.value,
        sortValue: sort,
      });

      if (!res || res.status === "error" || res.status === "fail") {
        toast.error("Failed to add to the " + selectedSetting);
        return;
      }

      if (res.status === "success") {
        toast.success("Added successfully");
        closeModalHandler();
      }
    } catch (error) {
      toast.error("something went wrong. Please try again");
    }
  }

  useEffect(() => {
    if (!brand) return;
    setSelectedCar(null);
    setCars([]);
    const query = `brand=${brand.value}`;

    fetchCars(query);
  }, [brand]);

  return (
    <div className="my-5 flex flex-col gap-5">
      <ReactSelect
        value={brand}
        onChange={(v) => setSelectedBrand(v)}
        placeholder="Select brand"
        classNamePrefix="selectBrand"
        isClearable
        isSearchable
        name="brand"
        options={brandOptions}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: PRIMARY_COLOR,
            primary25: "#1d2a39",
          },
        })}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            paddingBlock: "8px",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menuList: (base) => ({ ...base, backgroundColor: "#24303F" }),
        }}
        menuPortalTarget={document.body}
      />

      <ReactSelect
        isSearchable
        isLoading={loading}
        value={selectedCar}
        onChange={(v) => setSelectedCar(v)}
        placeholder="Select Car"
        options={cars}
        classNamePrefix="selectCar"
        name="selectedCar"
        formatOptionLabel={(car) => (
          <div className="flex gap-3 items-center">
            <Image
              src={car.image ?? "/images/logo/logo.svg"}
              alt="car"
              width={100}
              height={100}
              className="bg-black p-2 rounded object-cover overflow-hidden"
            />
            <span>{car.label}</span>
          </div>
        )}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: PRIMARY_COLOR,
            primary25: "#1d2a39",
          },
        })}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            paddingBlock: "8px",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menuList: (base) => ({ ...base, backgroundColor: "#24303F" }),
        }}
        menuPortalTarget={document.body}
      />

      <ReactSelect
        value={selectedSetting}
        onChange={(v) => setSelectedSetting(v)}
        options={settingsOptions}
        placeholder="Select where you want to show it"
        name="selectedSetting"
        classNamePrefix="selectSetting"
        theme={reactSelectOptions.theme}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            paddingBlock: "8px",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menuList: (base) => ({ ...base, backgroundColor: "#24303F" }),
        }}
        menuPortalTarget={document.body}
      />

      <div>
        <p className="text-xl mb-2 text-black dark:text-gray">Sort</p>
        <input
          min={0}
          type="number"
          value={sort}
          onChange={(e) => setSort(+e.target.value)}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div>

      <div className="flex gap-3">
        <button
          className="primary-btn"
          onClick={handleOnAddClick}
        >
          Add
        </button>

        <button
          className="button-base bg-transparent outline outline-1 outline-boxdark"
          onClick={closeModalHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default AddItemForm;
