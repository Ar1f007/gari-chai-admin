"use client";

import PageHeader from "@/components/layout/page-header.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode, useState } from "react";
import { AddBrand } from "./add-brand";
import AddModel from "./add-model";
import { AddBodyStyle } from "./add-body-style";

type TabBtnValue = "brand" | "model" | "bodyStyle";

const tabBtns: Array<{ title: string; type: TabBtnValue; content: ReactNode }> =
  [
    {
      title: "Add Car Brand",
      type: "brand",
      content: <AddBrand />,
    },
    {
      title: "Add Car Model",
      type: "model",
      content: <AddModel />,
    },
    {
      title: "Add Body Style",
      type: "bodyStyle",
      content: <AddBodyStyle />,
    },
  ];

const AddBrandsAndOthers = () => {
  const [selectedTab, setSelectedTab] = useState<TabBtnValue | undefined>(
    "brand"
  );

  function hideForm() {
    setSelectedTab(undefined);
  }

  return (
    <section>
      <PageHeader>Add Car Brands and Others</PageHeader>

      <main className="px-[var(--pagePaddingInline)] py-[var(--pagePaddingBlock)]">
        <div className="grid place-items-center">
          <Tabs
            orientation="vertical"
            defaultValue={selectedTab}
            onValueChange={(v) => v && setSelectedTab(v as TabBtnValue)}
          >
            <TabsList>
              {tabBtns.map((btn) => (
                <TabsTrigger
                  key={btn.type}
                  value={btn.type}
                >
                  {btn.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabBtns.map((btn) => (
              <TabsContent
                key={btn.type}
                value={btn.type}
              >
                {btn.content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </section>
  );
};
export default AddBrandsAndOthers;
