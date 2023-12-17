"use client";

import PageHeader from "@/components/layout/page-header.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode, useState } from "react";
import { AddBrand } from "./add-brand";
import AddModel from "./add-model";
import { AddBodyStyle } from "./add-body-style";
import { Button } from "@/components/ui/button";

type TabBtnValue = "brand" | "model" | "bodyStyle";

const AddBrandsAndOthers = () => {
  const [selectedTab, setSelectedTab] = useState<TabBtnValue | undefined>(
    "brand"
  );

  function hideForm() {
    setSelectedTab(undefined);
  }

  function handleClick(type: TabBtnValue) {
    setSelectedTab(type);
  }

  const tabBtns: Array<{
    title: string;
    type: TabBtnValue;
  }> = [
    {
      title: "Add Car Brand",
      type: "brand",
    },
    {
      title: "Add Car Model",
      type: "model",
    },
    {
      title: "Add Body Style",
      type: "bodyStyle",
    },
  ];

  return (
    <section>
      <PageHeader>Add Car Brands and Others</PageHeader>

      <main className="px-[var(--pagePaddingInline)] py-[var(--pagePaddingBlock)]">
        <div className="grid place-items-center">
          <section className="w-full grid grid-cols-1 lg:grid-cols-5 gap-20">
            <div className="flex flex-col gap-5">
              {tabBtns.map((btn, idx) => (
                <Button
                  key={idx}
                  type="button"
                  onClick={() => handleClick(btn.type)}
                  variant="secondary"
                >
                  {btn.title}
                </Button>
              ))}
            </div>
            <div className="col-span-4 max-w-xl">
              {selectedTab === "brand" && <AddBrand onSuccess={hideForm} />}

              {selectedTab === "model" && <AddModel onSuccess={hideForm} />}

              {selectedTab === "bodyStyle" && <AddBodyStyle />}
            </div>
          </section>
        </div>
      </main>
    </section>
  );
};
export default AddBrandsAndOthers;
