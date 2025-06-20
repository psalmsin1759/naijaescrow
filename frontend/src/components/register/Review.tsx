'use client';

import { motion } from 'framer-motion';
import { useForm } from '@/context/FormContext';

export default function Review({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const { data } = useForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Review Information</h2>
      <p className="text-gray-600">Please confirm your details before submitting.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Business Info */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">Business Details</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><span className="font-medium">Name:</span> {data.businessName || '—'}</p>
            <p><span className="font-medium">Email:</span> {data.businessEmail || '—'}</p>
            <p><span className="font-medium">Phone:</span> {data.businessPhone || '—'}</p>
            <p><span className="font-medium">Website:</span> {data.website || '—'}</p>
            <p><span className="font-medium">Address:</span> {data.address || '—'}</p>
            <p><span className="font-medium">Description:</span> {data.description || '—'}</p>
          </div>
        </div>

        {/* Admin Info */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">Admin Info</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p><span className="font-medium">Name:</span> {data.adminFirstName} {data.adminLastName}</p>
            <p><span className="font-medium">Email:</span> {data.adminEmail}</p>
            <p><span className="font-medium">Phone:</span> {data.adminPhone || '—'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
        >
          Back
        </button>

        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition"
        >
          Submit
        </button>
      </div>
    </motion.div>
  );
}
