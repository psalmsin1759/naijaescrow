'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus, FaEye } from 'react-icons/fa';
import Modal from '@/components/ui/Modal'; // Make sure you have this modal

interface Dispute {
  id: string;
  orderId: string;
  customer: string;
  reason: string;
  status: 'pending' | 'resolved' | 'rejected';
  createdAt: string;
}

export default function DisputePage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [viewDispute, setViewDispute] = useState<Dispute | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'resolved' | 'rejected'>('all');

  // Dummy fetch simulation
  useEffect(() => {
    setDisputes([
      {
        id: 'DPT123',
        orderId: 'ORD567',
        customer: 'John Doe',
        reason: 'Item not delivered',
        status: 'pending',
        createdAt: '2024-06-12',
      },
      {
        id: 'DPT124',
        orderId: 'ORD568',
        customer: 'Jane Smith',
        reason: 'Wrong item delivered',
        status: 'resolved',
        createdAt: '2024-06-10',
      },
    ]);
  }, []);

  const filteredDisputes = disputes.filter(
    (d) =>
      (filter === 'all' || d.status === filter) &&
      (d.customer.toLowerCase().includes(search.toLowerCase()) ||
        d.orderId.toLowerCase().includes(search.toLowerCase()))
  );

  const handleStatusChange = (id: string, status: Dispute['status']) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
    setViewDispute(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dispute Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
        >
          <FaPlus />
          Raise Dispute
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by customer or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 pl-10 rounded shadow-sm"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <select
          value={filter}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e) => setFilter(e.target.value as any)}
          className="border p-2 rounded shadow-sm"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto  bg-white p-6 shadow rounded">
        <table className="w-full min-w-[600px] text-sm text-left bg-white">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Dispute ID</th>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDisputes.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.id}</td>
                <td className="p-3">{d.orderId}</td>
                <td className="p-3">{d.customer}</td>
                <td className="p-3">{d.reason}</td>
                <td className="p-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      d.status === 'pending'
                        ? 'bg-yellow-500'
                        : d.status === 'resolved'
                        ? 'bg-green-600'
                        : 'bg-red-500'
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
                <td className="p-3">{d.createdAt}</td>
                <td className="p-3 text-right">
                  <button
                    className="text-primary hover:underline text-sm"
                    onClick={() => setViewDispute(d)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Dispute Modal */}
      <Modal
        isOpen={!!viewDispute}
        onClose={() => setViewDispute(null)}
        title={`Dispute - ${viewDispute?.id}`}
      >
        {viewDispute && (
          <div className="space-y-3 text-sm">
            <p><strong>Customer:</strong> {viewDispute.customer}</p>
            <p><strong>Order ID:</strong> {viewDispute.orderId}</p>
            <p><strong>Reason:</strong> {viewDispute.reason}</p>
            <p><strong>Status:</strong></p>
            <select
              className="w-full p-2 border rounded"
              value={viewDispute.status}
              onChange={(e) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                handleStatusChange(viewDispute.id, e.target.value as any)
              }
            >
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}
      </Modal>

      {/* Raise Dispute Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Raise a Dispute"
      >
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Order ID"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Customer Name"
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Describe the issue..."
            className="w-full border p-2 rounded"
            rows={3}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
          >
            Submit Dispute
          </button>
        </form>
      </Modal>
    </motion.div>
  );
}
