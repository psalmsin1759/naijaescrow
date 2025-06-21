'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCopy } from 'react-icons/fa';
import {Order} from "@/app/(dashboard)/dashboard/orders/page";

export default function OrderSuccessPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const mockOrder : Order = {
      id: id as string,
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '08012345678',
      item: 'MacBook Pro',
      description: "",
      amount: "350000",
      deliveryFee: "5000",
      status: 'pending',
      date: ""
    };
    setOrder(mockOrder);
  }, [id]);

  if (!order) return <p className="p-6">Loading order details...</p>;

  const paymentLink = `/pay/${order.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-lg space-y-6"
    >
      <div className="flex items-center gap-3">
        <FaCheckCircle className="text-green-600 text-3xl" />
        <div>
          <h2 className="text-2xl font-bold text-green-700">Order Created Successfully!</h2>
          <p className="text-gray-600">Share this link with the buyer to proceed with payment.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-800">
        <div className="space-y-1">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer:</strong> {order.customer}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
        </div>
        <div className="space-y-1">
          <p><strong>Item:</strong> {order.item}</p>
          <p><strong>Amount:</strong> ₦{order.amount.toLocaleString()}</p>
          <p><strong>Delivery Fee:</strong> ₦{order.deliveryFee.toLocaleString()}</p>
          <p><strong>Status:</strong> 
            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs capitalize">
              {order.status}
            </span>
          </p>
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-2">Payment Link:</label>
        <div className="flex items-center border rounded-md overflow-hidden bg-gray-50">
          <input
            type="text"
            readOnly
            value={paymentLink}
            className="flex-1 px-3 py-2 bg-gray-50 text-sm outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-primary text-white hover:bg-primary-dark transition text-sm flex items-center gap-2"
          >
            {copied ? (
              <>
                Copied <FaCheckCircle className="text-white text-sm" />
              </>
            ) : (
              <>
                Copy <FaCopy className="text-white text-sm" />
              </>
            )}
          </button>
        </div>
        <a
          href={paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-primary hover:underline"
        >
          ➜ View payment page
        </a>
      </div>
    </motion.div>
  );
}
