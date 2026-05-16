"use client";
import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors";
    const variantCls =
      variant === "ghost"
        ? "bg-transparent hover:bg-[var(--color-bg-surface)]"
        : "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]";

    return <button ref={ref} className={cn(base, variantCls, className)} {...props} />;
  }
);
Button.displayName = "Button";

export default Button;
