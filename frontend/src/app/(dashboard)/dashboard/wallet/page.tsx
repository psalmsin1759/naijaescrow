'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import { FaWallet, FaMoneyBillWave } from 'react-icons/fa';
import {getWallet, getTotalWithdrawn, getTransactions, WalletTransaction} from "@/utils/api/Wallet";
import { useAuth } from '@/context/AuthContext';

export default function WalletPage() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [banks] = useState(['Access Bank', 'GTBank', 'Zenith Bank', 'UBA']);
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName] = useState('Samson Ude');
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  const { auth } = useAuth();
  const businessId = auth?.business;

  const [wallet, setWallet] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  



 useEffect(() => {
    if (!businessId) return;
    fetchWallet(businessId)
    fetchTotalWithdrawn(businessId);
    fetchTransactions(businessId);
  }, [businessId]);


  const fetchWallet = async (businessId: string) => {
    const res = await getWallet(businessId);
    setWallet(res.data!.balance!)

  }

  const fetchTotalWithdrawn = async (businessId: string) => {
    const res = await getTotalWithdrawn(businessId)
    setTotalWithdrawn(res.data!)
  }

  const fetchTransactions = async (businessId: string) => {
    const res = await getTransactions(businessId)
    setTransactions(res.data!)
  }


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
            <h3 className="text-2xl font-bold text-green-800">₦{wallet}</h3>
          </div>
          <FaWallet className="text-3xl text-green-700" />
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">Total Withdrawn</p>
            <h3 className="text-2xl font-bold text-blue-800">₦{totalWithdrawn}</h3>
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
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{transaction.createdAt}</td>
                <td className="px-4 py-3">{transaction.type}</td>
                <td className={`px-4 py-3 font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                  ₦{transaction.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3">{transaction.narration}</td>
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
