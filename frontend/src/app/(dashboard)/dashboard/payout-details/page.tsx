"use client";
import AddPayout from "@/components/payout/AddPayout";
import Modal from "@/components/ui/Modal";
import { Payout, usePayoutContext } from "@/context/PayoutContext";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function PayoutDetails() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  //const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { payouts, deletePayout } = usePayoutContext();

  //const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);

  const handleDelete = (payout: Payout) => {
    deletePayout(payout.accountNumber);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="w-full flex justify-end">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
        >
          <FaPlus /> Add Payout Details
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">All Payout information</h3>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4">Account</th>
              <th className="py-2 px-4">Account Name</th>
              <th className="py-2 px-4">Bank</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payouts.map((payout, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4 font-medium">
                  {payout.accountNumber}
                </td>
                <td className="py-2 px-4">{payout.accountName}</td>
                <td className="py-2 px-4">{payout.bank}</td>

                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(payout)}
                    className="text-primary hover:underline"
                  >
                    <FaTrash className="inline mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Payout Details"
      >
        <AddPayout showViewModal={setShowCreateModal} />
      </Modal>

     {/*  <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={` Details - ${selectedOrder?.orderId}`}
      >
        <ChangeOrderForm
          selectedOrder={selectedOrder!}
          businessId={businessId!}
          showViewModal={() => setShowViewModal(false)}
          fetchOrdersAndStats={fetchOrdersAndStats}
        />
      </Modal> */}
    </motion.div>
  );
}
