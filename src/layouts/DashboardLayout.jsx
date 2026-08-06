import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { CommandPalette } from '../components/common/CommandPalette';
import { FloatingAIChat } from '../components/common/FloatingAIChat';

export const DashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-transparent flex flex-col selection:bg-fuchsia-500 selection:text-white">

      <Navbar isDashboard={true} />
      
      <div className="flex flex-1">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <CommandPalette />
      <FloatingAIChat />
    </div>
  );
};
