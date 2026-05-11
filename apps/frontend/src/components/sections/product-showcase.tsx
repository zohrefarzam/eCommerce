"use client";

import {
  Tab,
  TabList,
  TabListContainer,
  TabPanel,
  Tabs,
} from "@heroui/react";
import { productTabs, productsByTab } from "@/content/landing";
import { ProductCard } from "@/components/ui/product-card";

export function ProductShowcase() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-foreground">محصولات</h2>

      <Tabs defaultSelectedKey="new" className="flex w-full flex-col gap-6">
        <TabListContainer className="border-b border-foreground/10">
          <TabList className="gap-6">
            {productTabs.map((t) => (
              <Tab
                key={t.id}
                id={t.id}
                className="cursor-pointer pb-3 text-sm font-medium text-muted outline-none transition data-selected:border-b-2 data-selected:border-foreground data-selected:text-foreground"
              >
                {t.label}
              </Tab>
            ))}
          </TabList>
        </TabListContainer>

        {productTabs.map((t) => (
          <TabPanel key={t.id} id={t.id} className="outline-none">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {productsByTab[t.id].map((p) => (
                <ProductCard key={p.id} name={p.name} price={p.price} />
              ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </section>
  );
}
