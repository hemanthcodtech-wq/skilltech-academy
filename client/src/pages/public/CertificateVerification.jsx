import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaAward, FaArrowLeft, FaCheckCircle, FaSearch, FaTimesCircle } from 'react-icons/fa';

const formatDate = (value) => {
  if (!value) return 'Not available';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Not available'
    : date.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
};

const CertificateVerification = () => {
  const [certificateId, setCertificateId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = certificateId.trim();
    if (!value) return;

    setVerifying(true);
    setResult(null);
    setError('');

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/verify-certificate/${encodeURIComponent(value)}`
      );
      setResult(response.data.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Certificate ID not found or unverified.');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-inter py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
          <FaArrowLeft size={12} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FaAward size={22} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">Public Credential Check</p>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">Verify Certificate</h1>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Enter the certificate ID printed on a Skill Tech Academy certificate to confirm its authenticity.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={certificateId}
              onChange={(event) => setCertificateId(event.target.value)}
              placeholder="Enter certificate ID"
              className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
            <button
              type="submit"
              disabled={verifying || !certificateId.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors disabled:opacity-60"
            >
              <FaSearch size={13} />
              {verifying ? 'Checking...' : 'Verify'}
            </button>
          </form>

          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              <FaTimesCircle className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 sm:p-6"
            >
              <div className="flex items-center gap-2 text-emerald-700 font-black">
                <FaCheckCircle /> Certificate Verified
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 text-sm">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Certificate ID</span>
                  <span className="font-mono font-bold text-slate-900 break-all">{result.certificateId}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Status</span>
                  <span className="font-bold text-emerald-700">{result.status}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Student</span>
                  <span className="font-bold text-slate-900">{result.studentName}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Course</span>
                  <span className="font-bold text-slate-900">{result.courseTitle || 'Skill Tech Academy Course'}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Date of Issue</span>
                  <span className="font-semibold text-slate-700">{formatDate(result.issueDate)}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Issued By</span>
                  <span className="font-semibold text-slate-700">{result.issuer}</span>
                </div>
              </div>
              {result.certificateUrl && (
                <a
                  href={result.certificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-bold text-blue-700 hover:text-blue-900"
                >
                  View certificate PDF <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CertificateVerification;
