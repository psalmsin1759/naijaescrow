'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCopy } from 'react-icons/fa';
import {getOrdersById, Order} from "@/utils/api/Order";
import Link from "next/link";

export default function OrderSuccessPage() {
 const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchOrderById = async (id: string) => {
    const res = await  getOrdersById(id);
    setOrder(res.data!);
  }

  useEffect(() => {
    fetchOrderById(id);
  }, [id]);

  if (!order) return <p className="p-6">Loading order details...</p>;

  const paymentLink = `https://naijaescrow.vercel.app/buyer/pay/${order._id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  //

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
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Customer:</strong> {order.buyerName}</p>
          <p><strong>Email:</strong> {order.buyerEmail}</p>
          <p><strong>Phone:</strong> {order.buyerPhone}</p>
        </div>
        <div className="space-y-1">
          <p><strong>Item:</strong> {order.product.name}</p>
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
        <Link
          href={`/buyer/pay/${order._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm text-primary hover:underline"
        >
          ➜ View payment page
        </Link>
      </div>
    </motion.div>
  );
}
