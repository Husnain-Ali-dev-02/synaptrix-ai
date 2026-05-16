"use client";
import React from "react";
import { cn } from "../../lib/utils";

export const ScrollArea = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("overflow-auto touch-pan-y scrollbar-thin scrollbar-thumb-rounded", className)}>
      {children}
    </div>
  );
};

export default ScrollArea;
