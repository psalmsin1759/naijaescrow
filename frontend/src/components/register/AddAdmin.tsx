'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from '@/context/FormContext';

export default function AddAdmin({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, setData } = useForm();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ [name]: value });
  };

  const validate = () => {
    const errs: typeof errors = {};

    if (!data.adminFirstName) errs.adminFirstName = 'First name is required';
    if (!data.adminLastName) errs.adminLastName = 'Last name is required';
    if (!data.adminEmail) errs.adminEmail = 'Email is required';
    if (!data.password) errs.password = 'Password is required';
    if (!data.confirmPassword) errs.confirmPassword = 'Confirm password is required';
    if (data.password !== data.confirmPassword) errs.confirmPassword = 'Passwords do not match';

    return errs;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Admin Information</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            name="adminFirstName"
            value={data.adminFirstName || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.adminFirstName && <p className="text-sm text-red-600">{errors.adminFirstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            name="adminLastName"
            value={data.adminLastName || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.adminLastName && <p className="text-sm text-red-600">{errors.adminLastName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            name="adminEmail"
            type="email"
            value={data.adminEmail || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.adminEmail && <p className="text-sm text-red-600">{errors.adminEmail}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone (optional)</label>
          <input
            name="adminPhone"
            value={data.adminPhone || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            value={data.password || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={data.confirmPassword || ''}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>
      </div>

      <div className="pt-6 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-400 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
}
