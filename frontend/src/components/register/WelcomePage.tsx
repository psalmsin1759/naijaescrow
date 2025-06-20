'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen flex items-center justify-center bg-gray-50 p-6"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6 text-green-600 flex justify-center"
        >
          <FaCheckCircle size={64} />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Naija Escrow! 🎉</h1>
        <p className="text-gray-600 text-md mb-6">
          Your business and admin setup is complete. You&apos;re now ready to securely handle transactions with peace of mind.
        </p>

        <Link href="/dashboard">
          <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
