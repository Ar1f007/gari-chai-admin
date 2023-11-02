import { useGetBrandsOptions } from "@/hooks/useGetBrandsOptions";
import {
  TCarSchema,
  getCars,
  invalidateAdminCache,
  invalidateUICache,
} from "@/services";
import { SelectOption } from "@/types/others";
import {
  HOME_SETTINGS_OPTIONS,
  PRIMARY_COLOR,
  carCategoryOptions,
  carSubCategoryOptions,
} from "@/util/constants";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ReactSelect, {
  GroupBase,
  StylesConfig,
  ThemeConfig,
} from "react-select";
import Image from "next/image";
import { addToHomePageSettings } from "@/services/home/addToHomePageSettings";
import Button from "../UI/Form/Button";
import { updateHomeSettingItem } from "@/services/home";

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

type AddEditItemForm = {
  brand?: SelectOption;
  car?: CarOption;
  sectionToAdd?: SelectOption<string>;
  tag?: SelectOption<string>;
  sort?: number;
  closeModalHandler: () => void;
  isEditing?: boolean;
  pageSlug?: string;
};

const AddItemForm = (props: AddEditItemForm) => {
  const ref = useRef(0);
  const { closeModalHandler, isEditing = false } = props;

  const [cars, setCars] = useState<CarOption[]>();

  const [brand, setSelectedBrand] = useState<SelectOption | null>(
    props.brand ?? null
  );

  const [selectedCar, setSelectedCar] = useState<CarOption | null>(
    props.car ?? null
  );

  const [sectionToAdd, setSectionToAdd] = useState<SelectOption<string> | null>(
    props.sectionToAdd ?? null
  );

  const [tag, setTag] = useState<SelectOption<string> | null>(
    props.tag ?? null
  );

  const [sort, setSort] = useState(props.sort ?? 0);

  const [loading, setLoading] = useState(false);

  const brandOptions = useGetBrandsOptions();

  async function fetchCars(query: string) {
    try {
      setLoading(true);
      const cars = await getCars(query);

      const carOptions = (cars ?? []).map((car) => ({
        value: car,
        label: car.name,
        image: car.posterImage.thumbnailUrl,
      }));

      setCars(carOptions);
    } catch (error) {
      toast.error("Could not get car list");
      setCars([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleOnSuccessAction(sectionToAdd: SelectOption<string>) {
    toast.success(isEditing ? "Updated Successfully" : "Added successfully");

    await invalidateAdminCache(sectionToAdd.value);

    closeModalHandler();

    const revalidated = await invalidateUICache([sectionToAdd.value]);

    if (!revalidated) {
      toast.error(
        `Could not update the UI of main website for the tag: ${sectionToAdd.value}`
      );
    }
  }

  async function handleOnAddClick() {
    if (!brand || !selectedCar || !sectionToAdd) {
      toast.error("Please select required fields (brand, car, setting)", {
        position: "top-center",
      });
      return;
    }

    try {
      const res = await addToHomePageSettings({
        contentId: selectedCar.value._id,
        content: selectedCar.value,
        sectionName: sectionToAdd.value,
        sort: sort,
        tags:
          sectionToAdd.value === HOME_SETTINGS_OPTIONS.electricCars
            ? tag
              ? [tag.value]
              : []
            : [],
      });

      if (!res || res.status === "error" || res.status === "fail") {
        toast.error("Failed to add to the " + sectionToAdd);
        return;
      }

      if (res.status === "success") {
        handleOnSuccessAction(sectionToAdd);
      }
    } catch (error) {
      toast.error("something went wrong. Please try again");
    }
  }

  async function handleOnUpdateClick() {
    if (!sectionToAdd) {
      toast.error("Please add where you want to show it (eg. latest cars)", {
        position: "top-center",
      });
      return;
    }

    if (!props.car || !props.sectionToAdd || !props.pageSlug) return;

    try {
      const res = await updateHomeSettingItem({
        sectionName: sectionToAdd.value,
        contentId: props.car.value._id,
        sort: sort,
        tags: tag ? [tag.value] : [],
      });

      if (!res || res.status === "error" || res.status === "fail") {
        toast.error("Failed to add to the " + sectionToAdd);
        return;
      }

      if (res.status === "success") {
        handleOnSuccessAction(sectionToAdd);

        if (sectionToAdd.value !== props.sectionToAdd.value) {
          await invalidateAdminCache(props.pageSlug);
        }
      }
    } catch (error) {
      toast.error("something went wrong. Please try again");
    }
  }

  useEffect(() => {
    if (!brand) return;

    // Don't update the value if we are editing (when component mount for the first time)
    if (!isEditing && ref.current == 0) {
      setSelectedCar(null);
      setCars([]);
    }

    const query = `brand=${brand.value}`;

    fetchCars(query);

    if (isEditing) {
      ref.current++;
    }
  }, [brand, isEditing]);

  return (
    <div className="my-5 flex flex-col gap-5">
      {!isEditing && (
        <ReactSelect
          value={brand}
          onChange={(v) => setSelectedBrand(v)}
          placeholder="Select brand"
          classNamePrefix="react-select"
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
              backgroundColor: "bg-primary",
            }),
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, backgroundColor: "#24303F" }),
            singleValue: (base) => ({ ...base, color: "text-white" }),
          }}
          menuPortalTarget={document.body}
        />
      )}

      <ReactSelect
        isSearchable
        isLoading={loading}
        value={selectedCar}
        onChange={(v) => setSelectedCar(v)}
        placeholder="Select Car"
        options={cars}
        classNamePrefix="react-select"
        name="selectedCar"
        formatOptionLabel={(car) => (
          <div className="flex gap-3 items-center">
            <Image
              src={car.image ?? "/images/logo/logo.svg"}
              alt="car"
              width={60}
              height={60}
              className="bg-black p-2 rounded object-contain overflow-hidden"
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
            backgroundColor: "bg-primary",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menuList: (base) => ({ ...base, backgroundColor: "#24303F" }),
          singleValue: (base) => ({ ...base, color: "text-white" }),
        }}
        menuPortalTarget={document.body}
        isDisabled={isEditing}
      />

      <ReactSelect
        value={sectionToAdd}
        onChange={(v) => setSectionToAdd(v)}
        options={carCategoryOptions}
        placeholder="Select where you want to show it"
        name="sectionToAdd"
        classNamePrefix="react-select"
        theme={reactSelectOptions.theme}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            paddingBlock: "8px",
            backgroundColor: "bg-primary",
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          menuList: (base) => ({ ...base, backgroundColor: "#24303F" }),
          singleValue: (base) => ({ ...base, color: "text-white" }),
        }}
        menuPortalTarget={document.body}
      />

      {sectionToAdd?.value === HOME_SETTINGS_OPTIONS.electricCars && (
        <ReactSelect
          value={tag}
          onChange={(v) => setTag(v)}
          options={carSubCategoryOptions}
          placeholder="Add to category"
          name="tag"
          classNamePrefix="react-select"
          theme={reactSelectOptions.theme}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              paddingBlock: "8px",
              backgroundColor: "bg-primary",
            }),
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            menuList: (base) => ({ ...base, backgroundColor: "#24303F" }),
            singleValue: (base) => ({ ...base, color: "text-white" }),
          }}
          menuPortalTarget={document.body}
        />
      )}

      <div>
        <p className="text-xl mb-2 text-black dark:text-gray">Sort</p>
        <input
          min={0}
          type="number"
          value={sort}
          onChange={(e) => setSort(+e.target.value)}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-[hsl(0, 0%, 80%)] dark:focus:border-primary"
        />
      </div>

      <div className="flex gap-3">
        <Button
          title={isEditing ? "Update" : "Add"}
          loading={loading}
          loadingText={isEditing ? "Updating..." : "Adding..."}
          onClick={isEditing ? handleOnUpdateClick : handleOnAddClick}
          classes="basis-2/4"
        />

        <button
          className="rounded w-full dark:button-base outline outline-1 outline-boxdark hover:bg-black hover:text-white font-medium"
          onClick={closeModalHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default AddItemForm;
