'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaFileUpload, FaExclamationTriangle } from 'react-icons/fa';

interface Order {
  id: string;
  item: string;
  customer: string;
  amount: number;
  deliveryFee: number;
  businessName: string;
  status: string;
}

export default function StartDisputePage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const mockOrder: Order = {
      id: id as string,
      item: 'MacBook Pro 14"',
      customer: 'John Doe',
      amount: 200000,
      deliveryFee: 5000,
      businessName: 'Techify Stores',
      status: 'shipped',
    };
    setOrder(mockOrder);
  }, [id]);

  const total = (order?.amount || 0) + (order?.deliveryFee || 0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ reason, message, file });
    alert('Dispute submitted successfully!');
    router.push('/buyer/disputes');
  };

  if (!order) return <p className="text-center mt-10 text-gray-500">Loading order...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto px-4 py-10"
    >
      <div className="mb-6 flex items-center justify-between">
        <button
          className="text-sm text-gray-500 hover:text-primary flex items-center gap-2"
          onClick={() => router.back()}
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-xl rounded-xl p-8"
      >
        <div className="mb-4 flex items-center gap-3">
          <FaExclamationTriangle className="text-red-500 text-xl" />
          <h2 className="text-xl font-bold text-gray-800">Start a Dispute</h2>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Having issues with your order? Fill the form below to initiate a dispute.
        </p>

        <div className="mb-6 space-y-1 text-sm text-gray-600 bg-gray-50 p-4 rounded">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Item:</strong> {order.item}</p>
          <p><strong>Seller:</strong> {order.businessName}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p className="text-primary font-semibold pt-2">
            Total: ₦{total.toLocaleString()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
          <div>
            <label className="block mb-1 font-medium">Dispute Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">-- Select a reason --</option>
              <option value="item_not_received">Item not received</option>
              <option value="item_damaged">Item was damaged</option>
              <option value="different_item">Wrong or different item</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Explain your issue</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Give details of what went wrong..."
              rows={4}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-medium">Optional Proof (Image/File)</label>
            <label className="flex items-center gap-2 border border-dashed border-gray-300 p-3 rounded cursor-pointer hover:border-primary">
              <FaFileUpload />
              <span>{file ? file.name : 'Upload file'}</span>
              <input
                type="file"
                className="hidden"
                accept="image/*,.pdf,.docx"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 transition"
          >
            Submit Dispute
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
