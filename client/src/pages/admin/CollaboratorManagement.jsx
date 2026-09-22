import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FaCheck, FaGlobe, FaImage, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';

const CollaboratorManagement = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    active: true,
    sortOrder: 0,
    image: null
  });

  useEffect(() => {
    fetchCollaborators();
  }, []);

  const fetchCollaborators = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/collaborators/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setCollaborators(response.data.data || []);
    } catch (error) {
      console.error('Error fetching collaborators', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setFormData({ name: '', website: '', active: true, sortOrder: 0, image: null });
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    setFormData((previous) => ({ ...previous, image: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.image) {
      alert('Please provide the collaborator name and image.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('website', formData.website || '');
      payload.append('active', String(formData.active));
      payload.append('sortOrder', String(formData.sortOrder || 0));
      payload.append('image', formData.image);

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/collaborators`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setIsModalOpen(false);
      fetchCollaborators();
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating collaborator');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this collaborator from the homepage?')) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/collaborators/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      fetchCollaborators();
    } catch (error) {
      alert('Error deleting collaborator');
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8 font-inter">
      <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-6 lg:p-8 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            Homepage Content
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">Collaborator Logos</h1>
          <p className="text-gray-500 text-sm mt-1">Upload partner logos that appear in the collaborator section on the homepage.</p>
        </div>
        <button onClick={openModal} className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-[0_4px_14px_0_rgba(79,70,229,0.28)] transition-all cursor-pointer">
          <FaPlus size={12} /> Add Collaborator
        </button>
      </div>

      <div className="bg-white/75 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80 overflow-hidden">
        {loading ? (
          <div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 p-6">
            {collaborators.length === 0 ? (
              <div className="col-span-full text-center p-10 text-slate-400 font-medium">No collaborator logos uploaded yet.</div>
            ) : collaborators.map((item) => (
              <div key={item._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${item.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                    {item.active ? <FaCheck size={10} /> : <FaTimes size={10} />}
                    {item.active ? 'Active' : 'Hidden'}
                  </span>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors" aria-label="Delete collaborator">
                    <FaTrash size={12} />
                  </button>
                </div>
                <div className="h-24 rounded-xl overflow-hidden border border-slate-200 bg-white flex items-center justify-center mb-3">
                  <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full object-contain p-2" />
                </div>
                <p className="font-bold text-slate-800">{item.name}</p>
                {item.website && <a href={item.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 mt-1.5"><FaGlobe size={10} /> {item.website}</a>}
                <p className="text-[11px] text-slate-500 mt-1.5">Sort order: {item.sortOrder || 0}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex justify-end font-inter">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-indigo-700/20 backdrop-blur-sm" onClick={() => !submitting && setIsModalOpen(false)} />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }} className="bg-white/40 backdrop-blur-3xl border-l border-white/60 shadow-[-20px_0_40px_rgba(0,0,0,0.08)] w-full max-w-xl h-full overflow-y-auto relative z-10 p-6 md:p-10 flex flex-col">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-indigo-600 bg-white/60 backdrop-blur-md p-2.5 rounded-full border border-white/50 shadow-sm transition-all z-20 cursor-pointer"><FaTimes /></button>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Add Collaborator Logo</h2>
                <form onSubmit={handleSubmit} className="space-y-5 flex-1 text-sm">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Collaborator Name *</label>
                    <input type="text" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="e.g. SkillBridge Labs" className="w-full p-3.5 bg-white/50 border border-white/60 rounded-xl font-medium text-slate-900 focus:bg-white/70 focus:border-indigo-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Website</label>
                    <input type="url" value={formData.website} onChange={(event) => setFormData({ ...formData, website: event.target.value })} placeholder="https://example.com" className="w-full p-3.5 bg-white/50 border border-white/60 rounded-xl font-medium text-slate-900 focus:bg-white/70 focus:border-indigo-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Display Order</label>
                    <input type="number" value={formData.sortOrder} onChange={(event) => setFormData({ ...formData, sortOrder: Number(event.target.value) || 0 })} className="w-full p-3.5 bg-white/50 border border-white/60 rounded-xl font-medium text-slate-900 focus:bg-white/70 focus:border-indigo-600 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1.5">Collaborator Logo *</label>
                    <input type="file" accept="image/*" required onChange={handleImageChange} className="w-full p-3.5 bg-white/60 border border-dashed border-slate-300 rounded-xl text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-600 file:text-white file:font-bold file:cursor-pointer" />
                    {selectedImage && <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 bg-white p-2"><img src={URL.createObjectURL(selectedImage)} alt="Preview" className="max-h-28 mx-auto object-contain" /></div>}
                  </div>
                  <label className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/50 border border-slate-200">
                    <span className="text-sm font-medium text-slate-700">Show on homepage</span>
                    <button type="button" onClick={() => setFormData((previous) => ({ ...previous, active: !previous.active }))} className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${formData.active ? 'bg-indigo-600' : 'bg-slate-300'}`}><span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${formData.active ? 'translate-x-6' : 'translate-x-1'}`} /></button>
                  </label>
                  <button type="submit" disabled={submitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-70">{submitting ? 'Uploading...' : 'Save Collaborator'}</button>
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

export default CollaboratorManagement;
