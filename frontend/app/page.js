'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const params = {};
      if (category) params.category = category;
      if (status) params.status = status;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, { params });
      setJobs(res.data);
      setLoading(false);
    };
    fetchJobs();
  }, [category, status]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return 'bg-green-500 text-white';
      case 'In Progress': return 'bg-yellow-500 text-white';
      case 'Closed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section - Darker for contrast */}
      <div className="bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🔧 Service Request Board</h1>
          <p className="text-lg md:text-xl text-blue-100">Find and manage service requests from homeowners</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters & Actions Bar - SOLID BACKGROUND */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {/* Category Filter - SOLID COLORS */}
              <select 
  value={category}
  onChange={(e) => setCategory(e.target.value)} 
  className="bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-medium"
>
  <option value="">📂 All Categories</option>
  <option value="Plumbing">🔧 Plumbing</option>
  <option value="Electrical">⚡ Electrical</option>
  <option value="Painting">🎨 Painting</option>
  <option value="Joinery">🔨 Joinery</option>
</select>
              
              {/* Status Filter - SOLID COLORS */}
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)} 
                className="bg-gray-50 border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors"
              >
                <option value="">📊 All Status</option>
                <option>🟢 Open</option>
                <option>🟡 In Progress</option>
                <option>⚪ Closed</option>
              </select>
            </div>
            
            <Link 
              href="/create" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
            >
              <span className="text-xl">+</span> New Service Request
            </Link>
          </div>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-md">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-lg">No job requests found</p>
            <Link href="/create" className="text-blue-600 hover:text-blue-700 mt-2 inline-block font-medium">
              Create the first request →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h2>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)} shadow-sm`}>
                      {job.status === 'Open' ? '🟢' : job.status === 'In Progress' ? '🟡' : '⚪'}
                      {' '}{job.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{job.description}</p>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-500">📂</span>
                    <span className="text-sm text-gray-700 font-medium">{job.category}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-500">📍</span>
                    <span className="text-sm text-gray-700">{job.location}</span>
                  </div>
                  
                  <Link 
                    href={`/jobs/${job._id}`} 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group-hover:gap-2 transition-all"
                  >
                    View Details 
                    <span className="ml-1 group-hover:ml-2 transition-all">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}