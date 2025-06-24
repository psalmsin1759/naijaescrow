"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaPlus,
  FaEye,
} from "react-icons/fa";
import Modal from "@/components/ui/Modal";
import {
  getOrdersByBusinessId,
  getBusinessOrderStats,
  Order,
  Stats,
  changeOrderStatus,
} from "@/utils/api/Order";

import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import CreateOrderForm from "@/components/orders/CreateOrderForm";

export default function OrdersPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

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
      className="space-y-6"
    >
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Pending Orders",
            count: stats.pending,
            icon: <FaClock />,
            color: "bg-yellow-100 text-yellow-800",
          },
          {
            title: "Total Orders",
            count: stats.total,
            icon: <FaClipboardList />,
            color: "bg-blue-100 text-blue-800",
          },
          {
            title: "Completed Orders",
            count: stats.completed,
            icon: <FaCheckCircle />,
            color: "bg-green-100 text-green-800",
          },
          {
            title: "Canceled Orders",
            count: stats.cancelled,
            icon: <FaTimesCircle />,
            color: "bg-red-100 text-red-800",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="flex items-center p-4 bg-white shadow rounded-lg space-x-4"
          >
            <div className={`p-3 rounded-full ${card.color}`}>{card.icon}</div>
            <div>
              <h4 className="text-sm text-gray-500">{card.title}</h4>
              <p className="text-xl font-bold">{card.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* New Order Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
        >
          <FaPlus /> Add New Order
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">All Orders</h3>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
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
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleView(order)}
                    className="text-primary hover:underline"
                  >
                    <FaEye className="inline mr-1" /> View
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
        title="Create New Order"
      >
        <CreateOrderForm />
      </Modal>

      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title={`Order Details - ${selectedOrder?.orderId}`}
      >
        {selectedOrder && (
          <div className="space-y-6 text-sm text-gray-800">
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">
                  Customer Name
                </p>
                <p className="font-medium">{selectedOrder.buyerName}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">Email</p>
                <p>{selectedOrder.buyerEmail}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">Phone</p>
                <p>{selectedOrder.buyerPhone}</p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">Product</p>
                <p className="font-medium">{selectedOrder.product.name}</p>
              </div>
            </div>

            {/* Description */}
            {selectedOrder.product.description && (
              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">
                  Description
                </p>
                <p className="leading-relaxed">
                  {selectedOrder.product.description}
                </p>
              </div>
            )}

            {/* Amounts */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">Amount</p>
                <p className="font-semibold text-green-600">
                  ₦{selectedOrder.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">
                  Delivery Fee
                </p>
                <p className="font-semibold text-blue-600">
                  ₦{selectedOrder.deliveryFee.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="block font-medium text-gray-700">
                  Order Status
                </span>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    selectedOrder.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedOrder.status === "paid"
                      ? "bg-blue-100 text-blue-800"
                      : selectedOrder.status === "shipped"
                      ? "bg-purple-100 text-purple-800"
                      : selectedOrder.status === "delivered"
                      ? "bg-indigo-100 text-indigo-800"
                      : selectedOrder.status === "released"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedOrder.status.toUpperCase()}
                </span>
              </div>

              <select
                value={selectedOrder.status}
                onChange={(e) =>
                  setSelectedOrder({ ...selectedOrder, status: e.target.value })
                }
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="shipped">Shipped</option>
               {/*  <option value="delivered">Delivered</option> */}
                <option value="cancelled">Cancelled</option>
              </select>

              <button
                onClick={async () => {
                  if (!selectedOrder) return;
                  const res = await changeOrderStatus(
                    selectedOrder._id!,
                    selectedOrder.status
                  );
                  if (res.success) {
                    toast.success("Status updated successfully");
                    setShowViewModal(false);
                    fetchOrdersAndStats();
                  } else {
                    toast.error(res.message || "Failed to update status");
                  }
                }}
                className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition"
              >
                Save Status
              </button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
