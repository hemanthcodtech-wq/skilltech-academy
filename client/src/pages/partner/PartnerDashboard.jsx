import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaBookOpen, FaRupeeSign, FaUsers, FaUserGraduate } from 'react-icons/fa';

const formatCurrency = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

const getDate = (value) => value
  ? new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
  : '-';

const PartnerDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/partner/dashboard`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        setDashboard(response.data.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load partner dashboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-20"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>;
  }

  if (error) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 font-medium">{error}</div>;
  }

  const stats = dashboard?.stats || {};

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-3xl rounded-3xl p-6 lg:p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 mb-2">Partner Overview</p>
        <h1 className="text-2xl lg:text-3xl font-black text-gray-800 tracking-tight mb-2">Revenue & Learner Insights</h1>
        <p className="text-gray-500 font-medium">View current platform enrollment, revenue, learner, and record details.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: FaRupeeSign, color: 'bg-emerald-600' },
          { label: 'Course Enrollments', value: stats.totalEnrollments || 0, icon: FaBookOpen, color: 'bg-blue-600' },
          { label: 'Unique Learners', value: stats.uniqueLearners || 0, icon: FaUserGraduate, color: 'bg-amber-500' },
          { label: 'Available Courses', value: stats.totalCourses || 0, icon: FaUsers, color: 'bg-indigo-600' }
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white/80 rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center text-xl`}><Icon /></div>
            <div>
              <p className="text-xs font-semibold text-slate-500">{label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="bg-white/80 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-900">Course Enrollment Stats</h2>
            <p className="text-xs text-slate-500 mt-1">Enrollment and revenue grouped by course.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[520px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <tr><th className="p-4">Course</th><th className="p-4">Enrolled</th><th className="p-4 text-right">Revenue</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {(dashboard?.courses || []).map((course) => (
                  <tr key={course.courseId}>
                    <td className="p-4"><p className="font-bold text-slate-800">{course.title}</p><p className="text-xs text-slate-500">{course.category}</p></td>
                    <td className="p-4 font-semibold text-slate-700">{course.enrollments}</td>
                    <td className="p-4 text-right font-bold text-emerald-700">{formatCurrency(course.revenue)}</td>
                  </tr>
                ))}
                {!dashboard?.courses?.length && <tr><td colSpan="3" className="p-8 text-center text-slate-400">No enrollment data available.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white/80 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-lg font-black text-slate-900">Learner Stats</h2>
            <p className="text-xs text-slate-500 mt-1">Learners with completed course payments.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[520px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <tr><th className="p-4">Learner</th><th className="p-4">Contact</th><th className="p-4">Courses</th><th className="p-4">Joined</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {(dashboard?.learners || []).map((learner) => (
                  <tr key={learner._id}>
                    <td className="p-4 font-bold text-slate-800">{learner.name || 'Unnamed learner'}</td>
                    <td className="p-4 text-slate-600">{learner.email || learner.emailOrPhone}<br /><span className="text-xs text-slate-400">{learner.phone || ''}</span></td>
                    <td className="p-4 font-semibold text-indigo-700">{learner.enrolledCourses}</td>
                    <td className="p-4 text-xs text-slate-500">{getDate(learner.createdAt)}</td>
                  </tr>
                ))}
                {!dashboard?.learners?.length && <tr><td colSpan="4" className="p-8 text-center text-slate-400">No learner data available.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="bg-white/80 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-lg font-black text-slate-900">Enrollment Records</h2>
          <p className="text-xs text-slate-500 mt-1">Recent completed enrollment and payment records.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              <tr><th className="p-4">Date</th><th className="p-4">Learner</th><th className="p-4">Course</th><th className="p-4">Invoice</th><th className="p-4">Status</th><th className="p-4 text-right">Amount</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {(dashboard?.records || []).map((record) => (
                <tr key={record._id}>
                  <td className="p-4 text-xs text-slate-500">{getDate(record.createdAt)}</td>
                  <td className="p-4"><p className="font-bold text-slate-800">{record.studentName}</p><p className="text-xs text-slate-500">{record.studentEmail}</p></td>
                  <td className="p-4 text-slate-700">{record.courseTitle}</td>
                  <td className="p-4 text-xs font-semibold text-slate-600">{record.invoiceNumber || '-'}</td>
                  <td className="p-4"><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-700">{record.paymentStatus}</span></td>
                  <td className="p-4 text-right font-black text-slate-900">{formatCurrency(record.amountPaid)}</td>
                </tr>
              ))}
              {!dashboard?.records?.length && <tr><td colSpan="6" className="p-10 text-center text-slate-400">No records available.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PartnerDashboard;
