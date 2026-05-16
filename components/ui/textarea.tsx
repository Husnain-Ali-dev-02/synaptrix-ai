"use client";
import React from "react";
import { cn } from "../../lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-md border px-3 py-2 bg-[var(--color-input)] text-[var(--color-foreground)] placeholder:text-[var(--color-text-muted)]",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export default Textarea;
