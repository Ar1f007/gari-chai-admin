"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Car } from "@/components/Cards/Car";
import { useGetBrandsOptions } from "@/hooks/useGetBrandsOptions";
import { TCarSchema, getCars } from "@/services";
import { addToHomePageSettings } from "@/services/home/addToHomePageSettings";
import MyModal from "@/components/Dialog/Dialog";
import AddNewButton from "@/components/HomePageSettings/AddNewButton";

type SettingTypeProps = {
  params: {
    settings: string;
  };
};
const HomepageSettingsSectionPage = (props: SettingTypeProps) => {
  const settingsName = props.params.settings;

  return (
    <div>
      <Breadcrumb pageName="Home Page Settings" />

      <section className="flex flex-col gap-5">
        <AddNewButton />
      </section>

      {/* <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 cursor-pointer">
        {!brand ? (
          <p className="text-lg uppercase">Select a brand to get started !</p>
        ) : brand && cars.length === 0 ? (
          <h3 className="text-lg font-semibold">
            No car was found related to this brand
          </h3>
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
      </section> */}
    </div>
  );
};
export default HomepageSettingsSectionPage;
