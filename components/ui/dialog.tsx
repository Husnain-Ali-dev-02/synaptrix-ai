"use client";
import React, { useState, createContext, useContext } from "react";
import { cn } from "../../lib/utils";

const DialogContext = createContext<any>(null);

export const Dialog = ({
  children,
  open: controlledOpen,
  onOpenChange,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
};

export const DialogTrigger = ({ children }: { children: React.ReactNode }) => {
  const ctx = useContext(DialogContext);
  return (
    <button onClick={() => ctx?.setOpen(true)} className={cn("")}>{children}</button>
  );
};

export const DialogContent = ({
  children,
  showCloseButton = true,
}: {
  children: React.ReactNode;
  showCloseButton?: boolean;
}) => {
  const ctx = useContext(DialogContext);
  if (!ctx?.open) return null;
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      )}
      onClick={() => ctx?.setOpen(false)}
    >
      <div
        className={cn(
          "w-full max-w-lg rounded-lg bg-[var(--color-popover)] p-6 shadow-lg"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={() => ctx?.setOpen(false)}
            className={cn("absolute right-4 top-4 text-sm font-semibold")}
          >
            ✕
          </button>
        )}
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
