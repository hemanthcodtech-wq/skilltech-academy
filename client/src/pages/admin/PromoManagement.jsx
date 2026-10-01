import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaTag, FaBook, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const PromoManagement = () => {
  const [promos, setPromos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    code: '',
    courseId: '',
    setAmount: '',
    isActive: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const [promosRes, coursesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/promos`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/courses`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      if (promosRes.data.success) setPromos(promosRes.data.data);
      if (coursesRes.data.success) setCourses(coursesRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (editingId) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/admin/promos/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/promos`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving promo code');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this promo code?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/promos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      alert('Error deleting promo code');
    }
  };

  const toggleStatus = async (promo) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/admin/promos/${promo._id}`, { isActive: !promo.isActive }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      alert('Error updating status');
    }
  };

  const openModal = (promo = null) => {
    if (promo) {
      setEditingId(promo._id);
      setFormData({
        code: promo.code,
        courseId: promo.courseId?._id || promo.courseId,
        setAmount: promo.setAmount,
        isActive: promo.isActive
      });
    } else {
      setEditingId(null);
      setFormData({
        code: '',
        courseId: courses.length > 0 ? courses[0]._id : '',
        setAmount: '',
        isActive: true
      });
    }
    setShowModal(true);
  };

  return (
    <div className="space-y-8 pb-24 md:pb-8 font-inter">
      
      {/* Top Banner Header */}
      <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-6 lg:p-8 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            Discounts & Marketing
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">Promo Codes Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            Create and manage promotional discount codes for specific courses.
          </p>
        </div>
        
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_6px_20px_rgba(41,120,56,0.3)] transition-all flex items-center gap-2.5 w-max text-xs lg:text-sm group cursor-pointer"
        >
          <FaPlus size={12} className="group-hover:rotate-90 transition-transform" />
          <span>Create Promo Code</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white/75 backdrop-blur-2xl rounded-[2.25rem] border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-6 lg:p-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Promo Code</th>
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Final Price</th>
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {promos.map((promo) => (
                  <tr key={promo._id} className="border-b border-gray-50/50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-700 font-black tracking-wide text-sm">
                        <FaTag size={12} className="text-indigo-400" />
                        {promo.code}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FaBook className="text-gray-400" />
                        {promo.courseId?.title || 'Unknown Course'}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-emerald-600 font-bold text-lg">₹{promo.setAmount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleStatus(promo)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                          promo.isActive 
                            ? 'bg-emerald-100/50 text-emerald-600 hover:bg-emerald-100' 
                            : 'bg-red-100/50 text-red-600 hover:bg-red-100'
                        }`}
                      >
                        {promo.isActive ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                        {promo.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openModal(promo)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-500 hover:text-blue-600 flex items-center justify-center transition-colors shadow-sm"
                          title="Edit Promo"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button 
                          onClick={() => handleDelete(promo._id)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 flex items-center justify-center transition-colors shadow-sm"
                          title="Delete Promo"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {promos.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-12 px-4 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FaTag size={32} className="mb-3 opacity-20" />
                        <p className="text-sm font-medium">No promo codes found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal / Side Drawer */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex justify-end font-inter">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-indigo-700/20 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="bg-white/40 backdrop-blur-3xl border-l border-white/60 shadow-[-20px_0_40px_rgba(0,0,0,0.08)] w-full max-w-2xl h-full overflow-y-auto relative z-10 p-6 md:p-10 flex flex-col overflow-x-hidden"
            >
              {/* Glassmorphism background refraction blobs */}
              <div className="absolute top-[-5%] right-[-10%] w-72 h-72 bg-indigo-600/30 rounded-full blur-[90px] pointer-events-none"></div>
              <div className="absolute bottom-[20%] left-[-10%] w-64 h-64 bg-[#d67b22]/20 rounded-full blur-[90px] pointer-events-none"></div>

              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-indigo-600 bg-white/60 backdrop-blur-md p-2.5 rounded-full border border-white/50 shadow-sm transition-all z-20 cursor-pointer"
              >
                <FaTimes />
              </button>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-6 relative z-10">{editingId ? 'Edit Promo Code' : 'Create Promo Code'}</h2>
              <p className="text-xs text-gray-500 mb-6 -mt-4 relative z-10">Configure discount settings for checkout.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col relative z-10">
                <div className="grid grid-cols-1 gap-6 flex-1">
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wider text-xs">Promo Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                      className="w-full p-3.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl focus:border-indigo-600 focus:bg-white/70 focus:ring-2 focus:ring-indigo-600/20 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all font-bold uppercase tracking-widest placeholder:normal-case placeholder:font-medium placeholder:tracking-normal"
                      placeholder="e.g. SUMMER20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wider text-xs">Target Course *</label>
                    <select
                      required
                      value={formData.courseId}
                      onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                      className="w-full p-3.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl focus:border-indigo-600 focus:bg-white/70 focus:ring-2 focus:ring-indigo-600/20 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all font-semibold text-gray-800"
                    >
                      <option value="" disabled>Select a course...</option>
                      {courses.map(course => (
                        <option key={course._id} value={course._id}>{course.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 uppercase tracking-wider text-xs">Set Amount (₹) *</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.setAmount}
                      onChange={(e) => setFormData({...formData, setAmount: e.target.value})}
                      className="w-full p-3.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl focus:border-indigo-600 focus:bg-white/70 focus:ring-2 focus:ring-indigo-600/20 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all font-semibold"
                      placeholder="e.g. 499"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer p-4 bg-white/50 backdrop-blur-md border border-white/60 rounded-xl hover:bg-white/70 transition-colors shadow-sm">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600 focus:ring-2"
                      />
                      <div>
                        <div className="text-sm font-bold text-gray-800">Activate Code</div>
                        <div className="text-xs text-gray-500">Enable this promo code for students to use immediately.</div>
                      </div>
                    </label>
                  </div>

                </div>

                {/* Submit Action */}
                <div className="mt-8 pt-6 border-t border-white/50 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    className="px-8 py-3.5 bg-white/60 hover:bg-white border border-white/80 text-gray-700 font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-[0_6px_20px_rgba(41,120,56,0.25)] hover:-translate-y-0.5 transition-all"
                  >
                    Save Promo Code
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PromoManagement;
