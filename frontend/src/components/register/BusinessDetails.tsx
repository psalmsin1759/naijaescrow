'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@/context/FormContext';

export default function BusinessDetails({ onNext }: { onNext: () => void }) {
  const { data, setData } = useForm();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errs: typeof errors = {};
    if (!data.businessName) errs.businessName = 'Business name is required';
    if (!data.businessEmail) errs.businessEmail = 'Email is required';
    if (!data.businessPhone) errs.businessPhone = 'Phone is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    onNext();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData({ [name]: value });
    console.log ("data: " + data);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Business Information</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Name</label>
          <input
            name="businessName"
            value={data.businessName || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.businessName && <p className="text-sm text-red-600">{errors.businessName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            name="businessEmail"
            type="email"
            value={data.businessEmail || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.businessEmail && <p className="text-sm text-red-600">{errors.businessEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            name="businessPhone"
            value={data.businessPhone || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website (optional)</label>
          <input
            name="website"
            value={data.website || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            name="address"
            value={data.address || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea
            name="description"
            rows={3}
            value={data.description || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="pt-6 text-end">
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </motion.form>
  );
}
