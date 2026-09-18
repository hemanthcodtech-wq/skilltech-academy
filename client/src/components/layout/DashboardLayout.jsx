import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-bg-cream font-inter">
      <TopNav />
      
      {/* Main Content Area: clearance for fixed TopNav and sticky BottomNav */}
      <main className="pt-20 pb-24 md:pb-8 min-h-screen">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
