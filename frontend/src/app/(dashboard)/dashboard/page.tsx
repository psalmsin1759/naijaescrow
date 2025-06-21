"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaExchangeAlt,
  FaClock,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
export default function DashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    //const newOrder = await createOrder(formData);

    router.push(`/dashboard/orders/success/1224}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Transactions",
            value: "₦12,500",
            desc: "All-time transactions",
            icon: <FaExchangeAlt />,
            color: "bg-blue-100 text-blue-800",
          },
          {
            title: "Wallet Balance",
            value: "₦150,000",
            desc: "Available funds",
            icon: <FaWallet />,
            color: "bg-green-100 text-green-800",
          },
          {
            title: "Pending Transactions",
            value: "3",
            desc: "Awaiting confirmation",
            icon: <FaClock />,
            color: "bg-yellow-100 text-yellow-800",
          },
          {
            title: "Completed Transactions",
            value: "18",
            desc: "Successfully processed",
            icon: <FaCheckCircle />,
            color: "bg-purple-100 text-purple-800",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-4 bg-white shadow rounded-lg flex items-center space-x-4"
          >
            <div className={`p-3 rounded-full ${card.color}`}>{card.icon}</div>
            <div>
              <h4 className="text-sm text-gray-500">{card.title}</h4>
              <p className="text-xl font-bold">{card.value}</p>
              <p className="text-xs text-gray-400">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white shadow rounded-lg flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Create New Escrow Order</h3>
          <p className="text-sm text-gray-500">
            Send a secure payment request to a buyer.
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-white px-5 py-2 rounded-md flex items-center gap-2 hover:bg-primary-dark transition"
        >
          <FaPlus /> New Order
        </button>
      </div>

      {/* Recent Orders Table */}
      <>
        <div className="w-full overflow-x-auto bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="min-w-full sm:min-w-[640px]">
            <table className=" w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Buyer</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "ORD1234",
                    buyer: "Chinedu O.",
                    amount: "₦50,000",
                    status: "Pending",
                    date: "2025-06-14",
                  },
                  {
                    id: "ORD1233",
                    buyer: "Ngozi A.",
                    amount: "₦75,000",
                    status: "Completed",
                    date: "2025-06-13",
                  },
                  {
                    id: "ORD1232",
                    buyer: "Ibrahim K.",
                    amount: "₦30,000",
                    status: "Cancelled",
                    date: "2025-06-12",
                  },
                ].map((order, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 font-medium">{order.id}</td>
                    <td className="py-2 px-4">{order.buyer}</td>
                    <td className="py-2 px-4">{order.amount}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Order"
        >
          <form className="space-y-4 text-sm text-gray-700">
            <div>
              <label className="block mb-1 font-medium">Customer Name</label>
              <input
                placeholder="e.g. John Doe"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  placeholder="e.g. 08012345678"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="e.g. customer@example.com"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Order Item</label>
              <input
                placeholder="e.g. Apple MacBook Pro"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Item Description</label>
              <textarea
                placeholder="Short description of the item"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                rows={3}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Amount (₦)</label>
                <input
                  placeholder="e.g. 200000"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Delivery Fee (₦)
                </label>
                <input
                  placeholder="e.g. 5000"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-medium transition-all duration-300"
              >
                Submit Order
              </button>
            </div>
          </form>
        </Modal>
      </>
    </motion.div>
  );
}
