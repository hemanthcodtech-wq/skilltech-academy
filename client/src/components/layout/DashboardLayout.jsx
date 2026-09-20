import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

const DashboardLayout = () => {
  return (
    <div className="dashboard-shell min-h-screen font-inter">
      <TopNav />
      
      {/* Main Content Area: clearance for fixed TopNav and sticky BottomNav */}
      <main className="dashboard-main pt-20 pb-24 md:pb-8 min-h-screen">
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
