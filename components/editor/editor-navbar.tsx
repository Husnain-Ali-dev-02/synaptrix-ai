"use client";

import React from "react";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";

interface EditorNavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const EditorNavbar: React.FC<EditorNavbarProps> = ({
  sidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40",
        "h-16 flex items-center",
        "bg-(--color-bg-elevated)",
        "border-b border-(--color-border-subtle)"
      )}
    >
      {/* Left section - Sidebar toggle */}
      <div className="flex items-center px-4">
        <Button
          variant="ghost"
          onClick={onToggleSidebar}
          className="p-2"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5 text-(--color-text-primary)" />
          ) : (
            <PanelLeftOpen className="h-5 w-5 text-(--color-text-primary)" />
          )}
        </Button>
      </div>

      {/* Center section - Title/Logo */}
      <div className="flex-1 flex items-center justify-center">
        {/* Empty for now - can be extended with project name, breadcrumbs, etc. */}
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center px-4 gap-4">
        <UserButton />
      </div>
    </nav>
  );
};

export default EditorNavbar;
