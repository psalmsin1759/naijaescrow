"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";
import { FaWallet, FaMoneyBillWave } from "react-icons/fa";
import {
  getWallet,
  getTotalWithdrawn,
  getTransactions,
  WalletTransaction,
} from "@/utils/api/Wallet";
import { useAuth } from "@/context/AuthContext";
import WithdrawForm from "@/components/wallet/WithdrawForm";

export default function WalletPage() {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  const { auth } = useAuth();
  const businessId = auth?.business;

  const closeWithdrawModal = () => setShowWithdrawModal(false);

  const fetchWalletData = async (businessId: string) => {
    try {
      const [walletRes, withdrawRes, txnRes] = await Promise.all([
        getWallet(businessId),
        getTotalWithdrawn(businessId),
        getTransactions(businessId),
      ]);

      if (walletRes.success) setWalletBalance(walletRes.data?.balance || 0);
      if (withdrawRes.success) setTotalWithdrawn(withdrawRes.data || 0);
      if (txnRes.success) setTransactions(txnRes.data || []);
    } catch (err) {
      console.error("Failed to fetch wallet data", err);
    }
  };

  useEffect(() => {
    if (businessId) {
      fetchWalletData(businessId);
    }
  }, [businessId]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Intl.DateTimeFormat("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateStr));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6"
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard
          label="Total in Wallet"
          value={walletBalance}
          icon={<FaWallet className="text-3xl text-green-700" />}
          bg="from-green-100 to-green-200"
          textColor="text-green-800"
        />
        <SummaryCard
          label="Total Withdrawn"
          value={totalWithdrawn}
          icon={<FaMoneyBillWave className="text-3xl text-blue-700" />}
          bg="from-blue-100 to-blue-200"
          textColor="text-blue-800"
        />
      </div>

     
      <div>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition font-medium shadow"
        >
          Withdraw Funds
        </button>
      </div>

     
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
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
            {transactions.map((txn, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{formatDate(txn.createdAt)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      txn.type === "credit"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {txn.type}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold">
                  ₦{txn.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3">{txn.narration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <Modal
        isOpen={showWithdrawModal}
        onClose={closeWithdrawModal}
        title="Withdraw Funds"
      >
        <WithdrawForm
          businessId={businessId}
          closeModal={closeWithdrawModal}
          refresh={() => businessId && fetchWalletData(businessId)}
        />
      </Modal>
    </motion.div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  bg,
  textColor,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
  textColor: string;
}) {
  return (
    <div
      className={`bg-gradient-to-r ${bg} p-5 rounded-lg shadow flex items-center justify-between`}
    >
      <div>
        <p className="text-sm text-gray-700">{label}</p>
        <h3 className={`text-2xl font-bold ${textColor}`}>
          ₦{value.toLocaleString()}
        </h3>
      </div>
      {icon}
    </div>
  );
}
