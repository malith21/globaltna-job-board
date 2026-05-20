'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) err.contactEmail = 'Enter a valid email address';
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
      // Send data WITHOUT emoji in category
      const dataToSend = {
        ...form,
        category: form.category // This should be "Plumbing", not "🔧 Plumbing"
      };
      console.log('Sending data:', dataToSend);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, dataToSend);
      router.push('/');
    } catch (error) {
      console.error('Error:', error.response?.data);
      alert(`Error: ${error.response?.data?.error || 'Please try again'}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-4">
          ← Back to Home
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Post a New Service Request</h1>
          <p className="text-gray-600 mb-6">Fill out the details below to get help from qualified tradespeople</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g., Need a plumber for leaking tap"
                onChange={(e) => setForm({...form, title: e.target.value})}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                placeholder="Describe the job in detail..."
                rows="4"
                onChange={(e) => setForm({...form, description: e.target.value})}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                {/* IMPORTANT: Values are WITHOUT emoji, but display WITH emoji */}
                <select
                  className={`w-full px-4 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                  value={form.category}
                  onChange={(e) => setForm({...form, category: e.target.value})}
                >
                  <option value="">Select a category</option>
                  <option value="Plumbing">🔧 Plumbing</option>
                  <option value="Electrical">⚡ Electrical</option>
                  <option value="Painting">🎨 Painting</option>
                  <option value="Joinery">🔨 Joinery</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full px-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                  placeholder="e.g., Glasgow, Edinburgh"
                  onChange={(e) => setForm({...form, location: e.target.value})}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Name <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full px-4 py-2 border ${errors.contactName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                  placeholder="Your full name"
                  onChange={(e) => setForm({...form, contactName: e.target.value})}
                />
                {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-2 border ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500`}
                  placeholder="your@email.com"
                  onChange={(e) => setForm({...form, contactEmail: e.target.value})}
                />
                {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-md disabled:opacity-50"
            >
              {loading ? 'Submitting...' : '✓ Submit Service Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}