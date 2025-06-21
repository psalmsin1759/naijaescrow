"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  item: string;
  description: string;
  amount: string;
  deliveryFee: string;
  status: string;
  date: string;
}

export default function OrdersPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orders: Order[] = [
    {
      id: "ORD001",
      customer: "Fortune Ibe",
      email: "fabzz@yahoo.com",
      phone: "08012345678",
      item: "Laptop",
      description: "HP Pavilion 15",
      amount: "200,000",
      deliveryFee: "5,000",
      status: "Pending",
      date: "2025-06-14",
    },
    // More dummy orders...
  ];

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const router = useRouter();

  const handleSubmit = async () => {
    //const newOrder = await createOrder(formData);

    router.push(`/dashboard/orders/success/${orders[0].id}`);
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
            count: 3,
            icon: <FaClock />,
            color: "bg-yellow-100 text-yellow-800",
          },
          {
            title: "Total Orders",
            count: 12,
            icon: <FaClipboardList />,
            color: "bg-blue-100 text-blue-800",
          },
          {
            title: "Completed Orders",
            count: 7,
            icon: <FaCheckCircle />,
            color: "bg-green-100 text-green-800",
          },
          {
            title: "Canceled Orders",
            count: 2,
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
                <td className="py-2 px-4 font-medium">{order.id}</td>
                <td className="py-2 px-4">{order.customer}</td>
                <td className="py-2 px-4">{order.amount}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
              <label className="block mb-1 font-medium">Delivery Fee (₦)</label>
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

      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title={`Order Details - ${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <div className="space-y-4 text-sm text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">
                  Customer Name
                </p>
                <p className="font-medium">{selectedOrder.customer}</p>
              </div>

              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">Email</p>
                <p>{selectedOrder.email}</p>
              </div>

              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">Phone</p>
                <p>{selectedOrder.phone}</p>
              </div>

              <div>
                <p className="mb-1 text-xs text-gray-500 uppercase">
                  Order Item
                </p>
                <p>{selectedOrder.item}</p>
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs text-gray-500 uppercase">
                Description
              </p>
              <p className="text-sm leading-relaxed">
                {selectedOrder.description}
              </p>
            </div>

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

            <div className="pt-4">
              <label className="block mb-1 font-medium text-gray-700">
                Order Status
              </label>
              <select
                defaultValue={selectedOrder.status}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
