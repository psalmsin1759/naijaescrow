'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import { FaWallet, FaMoneyBillWave } from 'react-icons/fa';

export default function WalletPage() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [banks] = useState(['Access Bank', 'GTBank', 'Zenith Bank', 'UBA']);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName] = useState('Samson Ude');

  const walletData = {
    total: 350000,
    withdrawn: 150000,
  };

  const walletHistory = [
    { date: '2024-06-01', type: 'Credit', amount: 200000, description: 'Order #001' },
    { date: '2024-06-05', type: 'Debit', amount: 50000, description: 'Withdrawal to UBA' },
    { date: '2024-06-10', type: 'Credit', amount: 150000, description: 'Order #004' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-r from-green-100 to-green-200 p-5 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">Total in Wallet</p>
            <h3 className="text-2xl font-bold text-green-800">₦{walletData.total.toLocaleString()}</h3>
          </div>
          <FaWallet className="text-3xl text-green-700" />
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">Total Withdrawn</p>
            <h3 className="text-2xl font-bold text-blue-800">₦{walletData.withdrawn.toLocaleString()}</h3>
          </div>
          <FaMoneyBillWave className="text-3xl text-blue-700" />
        </div>
      </motion.div>

      {/* Withdraw Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition font-medium shadow"
        >
          Withdraw Funds
        </button>
      </motion.div>

      {/* Wallet History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow p-6  overflow-x-auto"
      >
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {walletHistory.map((entry, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{entry.date}</td>
                <td className="px-4 py-3">{entry.type}</td>
                <td className={`px-4 py-3 font-semibold ${entry.type === 'Credit' ? 'text-green-600' : 'text-red-500'}`}>
                  ₦{entry.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3">{entry.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Withdraw Modal */}
      <Modal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        title="Withdraw Funds"
      >
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <input
            type="number"
            placeholder="Amount to Withdraw"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Bank</option>
            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>

          <input
            placeholder="Account Number"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            value={accountName}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 text-gray-600"
            placeholder="Account Name"
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            className="bg-primary w-full text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
          >
            Submit Withdrawal
          </button>
        </motion.form>
      </Modal>
    </motion.div>
  );
}
