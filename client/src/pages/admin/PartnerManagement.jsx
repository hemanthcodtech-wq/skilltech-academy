import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FaUserShield, FaPlus, FaSearch, FaTimes, FaTrash } from 'react-icons/fa';

const PartnerManagement = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/partners`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setPartners(res.data.data);
    } catch (err) {
      console.error("Error fetching partners", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({ name: '', email: '', phone: '', password: '' });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this partner?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/partners/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchPartners();
    } catch (err) {
      alert('Error deleting partner');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/partners`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setIsModalOpen(false);
      fetchPartners();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating partner');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPartners = partners.filter(p => 
    p.emailOrPhone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-24 md:pb-8 font-inter">
      
      {/* Top Banner Header */}
      <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-6 lg:p-8 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            Administration
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">Partner Management</h1>
          <p className="text-gray-500 text-sm mt-1">Add and manage authorized partners who can access the partner portal.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-64">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/90 border border-gray-200/80 rounded-2xl text-xs lg:text-sm font-medium text-gray-800 placeholder-gray-400 shadow-xs focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all"
            />
          </div>
          <button 
            onClick={handleOpenModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-[0_4px_14px_0_rgba(41,120,56,0.39)] transition-all cursor-pointer"
          >
            <FaPlus size={12} /> Add Partner
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white/75 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <th className="p-5 pl-8">Partner Name</th>
                  <th className="p-5">Contact (Email/Phone)</th>
                  <th className="p-5">Date Added</th>
                  <th className="p-5 text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80 text-sm">
                {filteredPartners.map((partner) => (
                  <tr key={partner._id} className="hover:bg-white/90 transition-colors">
                    <td className="p-5 pl-8 font-bold text-gray-900 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <FaUserShield size={14} />
                      </div>
                      {partner.name || 'N/A'}
                    </td>
                    <td className="p-5 text-gray-600 font-medium">
                      {partner.email} <br />
                      <span className="text-xs text-gray-400">{partner.phone}</span>
                    </td>
                    <td className="p-5 text-gray-600 font-medium text-xs">
                      {new Date(partner.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-5 pr-8 text-right">
                      <button 
                        onClick={() => handleDelete(partner._id)}
                        className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center"
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredPartners.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-10 text-center text-gray-400 font-medium">
                      No partners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end font-inter">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-indigo-700/20 backdrop-blur-sm"
                onClick={() => !submitting && setIsModalOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="bg-white/40 backdrop-blur-3xl border-l border-white/60 shadow-[-20px_0_40px_rgba(0,0,0,0.08)] w-full max-w-xl h-full overflow-y-auto relative z-10 p-6 md:p-10 flex flex-col overflow-x-hidden"
              >
                <div className="absolute top-[-5%] right-[-10%] w-72 h-72 bg-indigo-600/30 rounded-full blur-[90px] pointer-events-none"></div>
                
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-slate-500 hover:text-indigo-600 bg-white/60 backdrop-blur-md p-2.5 rounded-full border border-white/50 shadow-sm transition-all z-20 cursor-pointer"
                >
                  <FaTimes />
                </button>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-6 relative z-10">Add New Partner</h2>

                <form onSubmit={handleSubmit} className="space-y-5 flex-1 relative z-10 text-sm">
                  
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Partner Full Name *</label>
                    <input
                      type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Acme Tech Solutions"
                      className="w-full p-3.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl font-medium text-sm text-slate-900 focus:bg-white/70 focus:border-indigo-600 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Email Address *</label>
                    <input
                      type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="partner@example.com"
                      className="w-full p-3.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl font-medium text-sm text-slate-900 focus:bg-white/70 focus:border-indigo-600 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Phone Number</label>
                    <input
                      type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9876543210"
                      className="w-full p-3.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl font-medium text-sm text-slate-900 focus:bg-white/70 focus:border-indigo-600 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Temporary Password *</label>
                    <input
                      type="password" required minLength="6" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter a strong password"
                      className="w-full p-3.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl font-medium text-sm text-slate-900 focus:bg-white/70 focus:border-indigo-600 focus:outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all"
                    />
                  </div>

                  <div className="pt-6 mt-auto">
                    <button type="submit" disabled={submitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_0_rgba(41,120,56,0.39)] transition-all disabled:opacity-70 flex justify-center items-center cursor-pointer">
                      {submitting ? 'Creating...' : 'Create Partner Account'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default PartnerManagement;
