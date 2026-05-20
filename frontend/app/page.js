'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      const params = {};
      if (category) params.category = category;
      if (status) params.status = status;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, { params });
      setJobs(res.data);
    };
    fetchJobs();
  }, [category, status]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Service Request Board</h1>
      
      <div className="flex gap-4 mb-6">
        <select 
          onChange={(e) => setCategory(e.target.value)} 
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option>Plumbing</option>
          <option>Electrical</option>
          <option>Painting</option>
          <option>Joinery</option>
        </select>
        
        <select 
          onChange={(e) => setStatus(e.target.value)} 
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
        
        <Link href="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
          + New Request
        </Link>
      </div>

      {jobs.map((job) => (
        <div key={job._id} className="border p-4 mb-3 rounded shadow">
          <h2 className="text-xl font-semibold">{job.title}</h2>
          <p className="text-gray-600">{job.category} | {job.location}</p>
          <p className="text-sm">Status: <span className="font-bold">{job.status}</span></p>
          <Link href={`/jobs/${job._id}`} className="text-blue-500 mt-2 inline-block">
            View Details →
          </Link>
        </div>
      ))}
      
      {jobs.length === 0 && <p>No job requests found.</p>}
    </div>
  );
}