"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaWallet,
  FaExchangeAlt,
  FaClock,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import Modal from "@/components/ui/Modal";
import CreateOrderForm from "@/components/orders/CreateOrderForm";
import {
  getOrdersByBusinessId,
  getBusinessOrderStats,
  Order,
  Stats,
} from "@/utils/api/Order";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

   const [orders, setOrders] = useState<Order[]>([]);
    const [stats, setStats] = useState<Stats>({
      total: 0,
      pending: 0,
      completed: 0,
      cancelled: 0,
    });
  
    const { auth } = useAuth();
    const businessId = auth?.business;
  
    const fetchOrdersAndStats = async () => {
      const res = await getOrdersByBusinessId(businessId!);
      if (res.success && res.data) setOrders(res.data);
  
      const statsRes = await getBusinessOrderStats(businessId!);
      setStats(statsRes.data!);
    };
    useEffect(() => {
      if (!businessId) return;
  
      fetchOrdersAndStats();
    }, [businessId]);
  
     const statusColors: Record<string, string> = {
  released: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  shipped: "bg-sky-50 text-sky-700 border border-sky-200",
  delivered: "bg-indigo-50 text-indigo-700 border border-indigo-200",
  paid: "bg-blue-50 text-blue-700 border border-blue-200",
  cancelled: "bg-rose-50 text-rose-700 border border-rose-200",
  default: "bg-gray-50 text-gray-700 border border-gray-200",
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
            value: stats.pending,
            desc: "Awaiting confirmation",
            icon: <FaClock />,
            color: "bg-yellow-100 text-yellow-800",
          },
          {
            title: "Completed Transactions",
            value: stats.completed,
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
                {orders.map((order, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 font-medium">{order._id}</td>
                    <td className="py-2 px-4">{order.buyerName}</td>
                    <td className="py-2 px-4">{order.amount}</td>
                    <td className="py-2 px-4">
                      <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      statusColors[order.status] || statusColors.default
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                    </td>
                    <td className="py-2 px-4">{order.createdAt}</td>
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
          <CreateOrderForm />
        </Modal>
      </>
    </motion.div>
  );
}
