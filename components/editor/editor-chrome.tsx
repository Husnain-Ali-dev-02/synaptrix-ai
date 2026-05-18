"use client";

import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";

interface EditorChromeProps {
  children: React.ReactNode;
}

export const EditorChrome: React.FC<EditorChromeProps> = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Only show chrome if user is authenticated
  if (!isLoaded) {
    return <div className="flex-1">{children}</div>;
  }

  if (!isSignedIn) {
    return <>{children}</>;
  }

  return (
    <>
      <EditorNavbar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <ProjectSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 pt-16">{children}</main>
    </>
  );
};

export default EditorChrome;
