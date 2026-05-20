'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    if (confirm('Are you sure you want to delete this job?')) {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`);
      router.push('/');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!job) return <div className="p-6">Job not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      
      <div className="space-y-3">
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Category:</strong> {job.category}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Contact:</strong> {job.contactName}</p>
        <p><strong>Email:</strong> {job.contactEmail}</p>
        <p><strong>Created:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
        
        <div className="flex items-center gap-4 mt-4">
          <strong>Status:</strong>
          <select 
            value={job.status}
            onChange={(e) => updateStatus(e.target.value)} 
            className="border p-2 rounded"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
          
          <button 
            onClick={deleteJob} 
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          
          <Link href="/" className="text-blue-500 ml-4">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}