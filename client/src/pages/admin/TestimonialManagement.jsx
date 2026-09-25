import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
  FaComments, FaEdit, FaPlus, FaSearch, FaStar, FaTimes,
  FaTrash, FaToggleOn, FaToggleOff
} from 'react-icons/fa';

const emptyForm = {
  name: '',
  role: '',
  course: '',
  rating: 5,
  image: '',
  imageFile: null,
  text: '',
  published: true,
  sortOrder: 0
};

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/testimonials/all`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setTestimonials(res.data.data || []);
    } catch (err) {
      console.error('Error fetching testimonials', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTestimonials = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return testimonials.filter((item) =>
      item.name?.toLowerCase().includes(term) ||
      item.course?.toLowerCase().includes(term) ||
      item.role?.toLowerCase().includes(term) ||
      item.text?.toLowerCase().includes(term)
    );
  }, [searchTerm, testimonials]);

  const openCreateModal = () => {
    setEditingTestimonial(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name || '',
      role: testimonial.role || '',
      course: testimonial.course || '',
      rating: testimonial.rating || 5,
      image: testimonial.image || '',
      imageFile: null,
      text: testimonial.text || '',
      published: testimonial.published !== false,
      sortOrder: testimonial.sortOrder || 0
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingTestimonial
        ? `${import.meta.env.VITE_API_BASE_URL}/admin/testimonials/${editingTestimonial._id}`
        : `${import.meta.env.VITE_API_BASE_URL}/admin/testimonials`;

      const method = editingTestimonial ? 'put' : 'post';
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('role', formData.role);
      payload.append('course', formData.course);
      payload.append('rating', String(formData.rating));
      payload.append('text', formData.text);
      payload.append('published', String(formData.published));
      payload.append('sortOrder', String(formData.sortOrder));
      if (formData.imageFile) {
        payload.append('image', formData.imageFile);
      }

      await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      setIsModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving testimonial');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublished = async (testimonial) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/testimonials/${testimonial._id}`,
        { ...testimonial, published: !testimonial.published },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      fetchTestimonials();
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating testimonial status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      fetchTestimonials();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting testimonial');
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8 font-inter">
      <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-6 lg:p-8 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            Home Page Content
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">Add student stories and control what appears in the Home page testimonial slider.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:w-72">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/90 border border-gray-200/80 rounded-2xl text-xs lg:text-sm font-medium text-gray-800 placeholder-gray-400 shadow-xs focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all"
            />
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-[0_4px_14px_0_rgba(41,120,56,0.39)] transition-all"
          >
            <FaPlus size={12} /> Add Testimonial
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredTestimonials.map((item) => (
            <div key={item._id} className="bg-white/75 backdrop-blur-2xl rounded-[2rem] border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-6 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-2xl object-cover border border-gray-100 shadow-sm" />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-lg border border-indigo-100">
                    {(item.name || 'S').charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-black text-gray-900 truncate">{item.name}</h2>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${item.published ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                      {item.published ? 'Published' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-600 mt-1">{item.role || 'Skill Tech Learner'}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.course || 'Skill Tech Academy'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => handleTogglePublished(item)} className="p-2.5 rounded-xl bg-gray-50 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all" title="Toggle published">
                    {item.published ? <FaToggleOn size={18} /> : <FaToggleOff size={18} />}
                  </button>
                  <button onClick={() => openEditModal(item)} className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all" title="Edit testimonial">
                    <FaEdit size={14} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all" title="Delete testimonial">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
                  {[...Array(Number(item.rating) || 5)].map((_, index) => <FaStar key={index} />)}
                  <span className="ml-2 text-xs font-bold text-gray-400">Order {item.sortOrder || 0}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">"{item.text}"</p>
              </div>
            </div>
          ))}

          {filteredTestimonials.length === 0 && (
            <div className="xl:col-span-2 p-12 text-center bg-white/70 rounded-[2rem] border border-dashed border-gray-200 text-gray-400 font-medium">
              No testimonials found.
            </div>
          )}
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end font-inter">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-indigo-700/20 backdrop-blur-sm"
                onClick={() => !submitting && setIsModalOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                className="bg-white/50 backdrop-blur-3xl border-l border-white/60 shadow-[-20px_0_40px_rgba(0,0,0,0.08)] w-full max-w-2xl h-full overflow-y-auto relative z-10 p-6 md:p-10 flex flex-col overflow-x-hidden"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-slate-500 hover:text-indigo-600 bg-white/70 backdrop-blur-md p-2.5 rounded-full border border-white/50 shadow-sm transition-all z-20"
                >
                  <FaTimes />
                </button>

                <div className="flex items-center gap-3 mb-6 pr-12">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
                    <FaComments />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                    <p className="text-xs text-slate-500 font-medium">Published testimonials appear automatically on the Home page.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 flex-1 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Student Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3.5 bg-white/60 border border-white/70 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Role / Achievement</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. Digital Marketing Professional"
                        className="w-full p-3.5 bg-white/60 border border-white/70 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Course Name</label>
                      <input
                        type="text"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        placeholder="e.g. Digital Marketing Mastery"
                        className="w-full p-3.5 bg-white/60 border border-white/70 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Rating</label>
                      <select
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                        className="w-full p-3.5 bg-white/60 border border-white/70 rounded-xl font-bold text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                      >
                        {[5, 4, 3, 2, 1].map((value) => (
                          <option key={value} value={value}>{value} Stars</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Student Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, imageFile: e.target.files?.[0] || null })}
                      className="w-full p-3.5 bg-white/60 border border-white/70 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                    />
                    {formData.imageFile && (
                      <p className="mt-2 text-xs text-slate-500">Selected: {formData.imageFile.name}</p>
                    )}
                    {formData.image && !formData.imageFile && (
                      <p className="mt-2 text-xs text-slate-500">Current image will be kept unless you choose a replacement.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Testimonial Message *</label>
                    <textarea
                      required
                      rows="6"
                      maxLength="600"
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      className="w-full p-3.5 bg-white/60 border border-white/70 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all resize-none"
                    />
                    <p className="text-[11px] text-slate-400 font-semibold mt-1">{formData.text.length}/600 characters</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1.5 text-sm">Display Order</label>
                      <input
                        type="number"
                        value={formData.sortOrder}
                        onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                        className="w-full p-3.5 bg-white/60 border border-white/70 rounded-xl font-bold text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                      />
                    </div>
                    <label className="flex items-center gap-3 p-4 bg-white/60 border border-white/70 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="w-5 h-5 accent-indigo-600"
                      />
                      <span className="font-bold text-slate-700">Show on Home page</span>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_0_rgba(41,120,56,0.39)] transition-all disabled:opacity-70 flex justify-center items-center"
                    >
                      {submitting ? 'Saving...' : editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
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

export default TestimonialManagement;
