"use client";
import React, { createContext, useContext, useState } from "react";
import { cn } from "../../lib/utils";

const TabsContext = createContext<any>(null);

export const Tabs = ({ defaultValue, children }: { defaultValue?: string; children: React.ReactNode }) => {
  const [value, setValue] = useState(defaultValue || undefined);
  return <TabsContext.Provider value={{ value, setValue }}>{children}</TabsContext.Provider>;
};

export const TabsList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex space-x-2", className)}>{children}</div>
);

export const TabsTrigger = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const ctx = useContext(TabsContext);
  const active = ctx?.value === value;
  return (
    <button onClick={() => ctx?.setValue(value)} className={cn("px-3 py-1 rounded-md text-sm", active ? "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]" : "bg-transparent", className)}>
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const ctx = useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return <div className={cn("mt-2")}>{children}</div>;
};

export default Tabs;
