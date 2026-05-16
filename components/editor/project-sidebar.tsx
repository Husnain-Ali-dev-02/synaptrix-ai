"use client";

import React from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-40",
          "w-80 h-full",
          "bg-(--color-bg-surface)",
          "border-r border-(--color-border-subtle)",
          "flex flex-col",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-(--color-border-subtle)">
          <h2 className="text-lg font-semibold text-(--color-text-primary)">
            Projects
          </h2>
          <button
            onClick={onClose}
            className={cn(
              "p-2 rounded-md",
              "hover:bg-(--color-bg-elevated)",
              "text-(--color-text-secondary)",
              "transition-colors"
            )}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="my-projects">
            <div className="px-4 py-3 border-b border-(--color-border-subtle)">
              <TabsList className="w-full justify-start gap-0">
                <TabsTrigger
                  value="my-projects"
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    "data-active:bg-(--color-bg-elevated) data-active:text-(--color-text-primary)",
                    "text-(--color-text-secondary) hover:bg-(--color-bg-elevated)"
                  )}
                >
                  My Projects
                </TabsTrigger>
                <TabsTrigger
                  value="shared"
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    "data-active:bg-(--color-bg-elevated) data-active:text-(--color-text-primary)",
                    "text-(--color-text-secondary) hover:bg-(--color-bg-elevated)"
                  )}
                >
                  Shared
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              <TabsContent value="my-projects">
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <p className="text-(--color-text-muted) text-sm">
                    No projects yet
                  </p>
                  <p className="text-(--color-text-faint) text-xs mt-1">
                    Create your first project to get started
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="shared">
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <p className="text-(--color-text-muted) text-sm">
                    No shared projects
                  </p>
                  <p className="text-(--color-text-faint) text-xs mt-1">
                    Projects shared with you will appear here
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer - New Project button */}
        <div className="px-4 py-4 border-t border-(--color-border-subtle)">
          <Button className="w-full flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
};

export default ProjectSidebar;
