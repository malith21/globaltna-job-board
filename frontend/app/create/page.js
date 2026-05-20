'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateJob() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    contactName: '',
    contactEmail: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.title) err.title = 'Title is required';
    if (!form.description) err.description = 'Description is required';
    if (!form.category) err.category = 'Category is required';
    if (!form.location) err.location = 'Location is required';
    if (!form.contactName) err.contactName = 'Contact name is required';
    if (!form.contactEmail) err.contactEmail = 'Email is required';
    else if (!form.contactEmail.includes('@')) err.contactEmail = 'Valid email required';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, form);
      router.push('/');
    } catch (error) {
      alert('Error creating job');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Post a New Service Request</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            className="border p-2 w-full rounded"
            placeholder="Job Title *"
            onChange={(e) => setForm({...form, title: e.target.value})}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>
        
        <div>
          <textarea
            className="border p-2 w-full rounded"
            placeholder="Description *"
            rows="3"
            onChange={(e) => setForm({...form, description: e.target.value})}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        
        <div>
          <select
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({...form, category: e.target.value})}
          >
            <option value="">Select Category *</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Painting</option>
            <option>Joinery</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>
        
        <div>
          <input
            className="border p-2 w-full rounded"
            placeholder="Location * (e.g., Glasgow)"
            onChange={(e) => setForm({...form, location: e.target.value})}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>
        
        <div>
          <input
            className="border p-2 w-full rounded"
            placeholder="Contact Name *"
            onChange={(e) => setForm({...form, contactName: e.target.value})}
          />
          {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName}</p>}
        </div>
        
        <div>
          <input
            className="border p-2 w-full rounded"
            type="email"
            placeholder="Contact Email *"
            onChange={(e) => setForm({...form, contactEmail: e.target.value})}
          />
          {errors.contactEmail && <p className="text-red-500 text-sm">{errors.contactEmail}</p>}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded w-full disabled:bg-gray-400"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}