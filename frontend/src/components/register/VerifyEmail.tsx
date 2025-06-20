'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VerifyEmail({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setError('');
  };

  const handleSubmit = () => {
    if (code.trim().length < 4) {
      setError('Verification code must be at least 4 characters');
      return;
    }

    console.log('Verification Code:', code); // Replace with API call if needed
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verify Your Email</h2>
      <p className="text-gray-600 text-sm">
        A 4-digit verification code has been sent to your email. Please enter it below to verify your
        email address.
      </p>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
        <input
          type="text"
          value={code}
          onChange={handleChange}
          maxLength={6}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>

      <div className="flex justify-between pt-6">
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
