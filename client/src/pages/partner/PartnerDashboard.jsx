import React from 'react';
import { motion } from 'framer-motion';

const PartnerDashboard = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-3xl rounded-3xl p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <h1 className="text-3xl font-black text-gray-800 tracking-tight mb-2">Welcome, Partner!</h1>
        <p className="text-gray-500 font-medium">Your partner functionalities will be added here soon.</p>
      </motion.div>
    </div>
  );
};

export default PartnerDashboard;
