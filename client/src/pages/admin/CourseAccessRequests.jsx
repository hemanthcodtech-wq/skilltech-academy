import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { FaEnvelopeOpenText, FaSearch, FaUserGraduate } from 'react-icons/fa';

const statusClasses = {
  new: 'bg-blue-50 text-blue-700 border-blue-100',
  contacted: 'bg-amber-50 text-amber-700 border-amber-100',
  converted: 'bg-emerald-50 text-emerald-700 border-emerald-100'
};

const CourseAccessRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/course-access-requests`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setRequests(res.data.data || []);
    } catch (err) {
      console.error('Error fetching course access requests', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return requests.filter((request) =>
      request.name?.toLowerCase().includes(term) ||
      request.email?.toLowerCase().includes(term) ||
      request.phone?.toLowerCase().includes(term) ||
      request.courseTitle?.toLowerCase().includes(term) ||
      request.qualification?.toLowerCase().includes(term) ||
      request.interest?.toLowerCase().includes(term)
    );
  }, [requests, searchTerm]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/course-access-requests/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } }
      );
      setRequests((prev) => prev.map((request) => (
        request._id === id ? { ...request, status } : request
      )));
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating request');
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8 font-inter">
      <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-6 lg:p-8 border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            Lead Requests
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">Course Content Requests</h1>
          <p className="text-gray-500 text-sm mt-1">View students who submitted the public form before previewing course content.</p>
        </div>

        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/90 border border-gray-200/80 rounded-2xl text-xs lg:text-sm font-medium text-gray-800 placeholder-gray-400 shadow-xs focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredRequests.map((request) => (
            <div key={request._id} className="bg-white/75 backdrop-blur-2xl rounded-[2rem] border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100 shrink-0">
                  <FaEnvelopeOpenText />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-black text-gray-900">{request.name}</h2>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusClasses[request.status] || statusClasses.new}`}>
                      {request.status || 'new'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-indigo-600 mt-1">{request.email}</p>
                  {request.phone && <p className="text-xs text-gray-500 mt-0.5">{request.phone}</p>}
                </div>
                <select
                  value={request.status || 'new'}
                  onChange={(e) => updateStatus(request._id, e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none focus:border-indigo-600"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  <FaUserGraduate className="text-indigo-600" />
                  Requested Course
                </div>
                <p className="font-extrabold text-gray-900">{request.course?.title || request.courseTitle || 'Course removed'}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Submitted {new Date(request.createdAt).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-4 bg-white rounded-2xl border border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Qualification</p>
                  <p className="font-semibold text-gray-700">{request.qualification || 'Not provided'}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Interest</p>
                  <p className="font-semibold text-gray-700">{request.interest || 'Not provided'}</p>
                </div>
              </div>

              {request.message && (
                <div className="p-4 bg-white rounded-2xl border border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Message</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{request.message}</p>
                </div>
              )}
            </div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="xl:col-span-2 p-12 text-center bg-white/70 rounded-[2rem] border border-dashed border-gray-200 text-gray-400 font-medium">
              No course content requests found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseAccessRequests;
