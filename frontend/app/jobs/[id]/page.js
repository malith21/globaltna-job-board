'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export default function JobDetail({ params }) {
  const { id } = React.use(params);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        alert('Job not found');
        router.push('/');
      }
      setLoading(false);
    };
    fetchJob();
  }, [id, router]);

  const updateStatus = async (status) => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, { status });
      setJob({ ...job, status });
    } catch (error) {
      alert('Error updating status');
    }
  };

  const deleteJob = async () => {
    if (confirm('Are you sure you want to delete this job request?')) {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`);
      router.push('/');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!job) return <div className="p-6 text-center">Job not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-6">
          ← Back to all requests
        </Link>

        {/* Status Banner */}
        <div className={`${getStatusColor(job.status)} border rounded-xl p-4 mb-6 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {job.status === 'Open' ? '🟢' : job.status === 'In Progress' ? '🟡' : '⚪'}
            </span>
            <span className="font-medium">Status: {job.status}</span>
          </div>
          <select 
            value={job.status}
            onChange={(e) => updateStatus(e.target.value)} 
            className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{job.title}</h1>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">📂 {job.category}</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">📍 {job.location}</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">📅 {new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">👤</span>
                  <span className="font-medium">{job.contactName}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-gray-400">📧</span>
                  <a href={`mailto:${job.contactEmail}`} className="text-blue-600 hover:text-blue-800">
                    {job.contactEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end">
          <button 
            onClick={deleteJob} 
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
          >
            🗑️ Delete Request
          </button>
        </div>
      </div>
    </div>
  );
}