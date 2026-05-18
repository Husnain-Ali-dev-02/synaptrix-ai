"use client";
import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "destructive";
  size?: "default" | "icon" | "icon-sm";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors";
    const sizeClass =
      size === "icon"
        ? "h-10 w-10"
        : size === "icon-sm"
        ? "h-8 w-8"
        : "px-3 py-2";
    const variantCls =
      variant === "ghost"
        ? "bg-transparent hover:bg-[var(--color-bg-surface)]"
        : variant === "destructive"
        ? "bg-red-600 text-white hover:bg-red-700"
        : "bg-[var(--color-primary)] text-[var(--color-primary-foreground)]";

    return <button ref={ref} className={cn(base, sizeClass, variantCls, className)} {...props} />;
  }
);
Button.displayName = "Button";

export default Button;
