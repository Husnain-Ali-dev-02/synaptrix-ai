"use client";
import React, { useState, createContext, useContext } from "react";
import { cn } from "../../lib/utils";

const DialogContext = createContext<any>(null);

export const Dialog = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
};

export const DialogTrigger = ({ children }: { children: React.ReactNode }) => {
  const ctx = useContext(DialogContext);
  return (
    <button onClick={() => ctx?.setOpen(true)} className={cn("")}>{children}</button>
  );
};

export const DialogContent = ({ children }: { children: React.ReactNode }) => {
  const ctx = useContext(DialogContext);
  if (!ctx?.open) return null;
  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center p-4")}> 
      <div className={cn("w-full max-w-lg rounded-lg bg-[var(--color-popover)] p-6 shadow-lg")}>
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className={cn("mb-2")}>{children}</div>
);
export const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className={cn("text-lg font-semibold")}>{children}</h3>
);
export const DialogDescription = ({ children }: { children: React.ReactNode }) => (
  <p className={cn("text-sm text-[var(--color-text-muted)]")}>{children}</p>
);
export const DialogFooter = ({ children }: { children: React.ReactNode }) => (
  <div className={cn("mt-4 flex justify-end")}>{children}</div>
);

export default Dialog;
