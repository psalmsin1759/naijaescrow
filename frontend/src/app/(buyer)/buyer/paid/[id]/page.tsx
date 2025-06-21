'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, ReactElement } from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";
import {
  FaCheckCircle,
  FaFlag,
  FaBoxOpen,
  FaTruck,
  FaHourglassHalf,
} from 'react-icons/fa';

type OrderStatus = 'pending' | 'shipped' | 'delivered';

interface PaymentDetails {
  id: string;
  customer: string;
  item: string;
  amount: number;
  deliveryFee: number;
  businessName: string;
  businessEmail: string;
  transactionId: string;
  paymentDate: string;
  status: OrderStatus;
}

export default function PaymentSuccessPage() {
  const { id } = useParams();
  const [payment, setPayment] = useState<PaymentDetails | null>(null);

  useEffect(() => {
    const mockPayment: PaymentDetails = {
      id: id as string,
      customer: 'John Doe',
      item: 'MacBook Pro 14"',
      amount: 200000,
      deliveryFee: 5000,
      businessName: 'Techify Stores',
      businessEmail: 'sales@techify.com',
      transactionId: 'TRX-987654321',
      paymentDate: new Date().toLocaleString(),
      status: 'shipped', // Change to simulate progress
    };

    setPayment(mockPayment);
  }, [id]);

  if (!payment) return <p className="text-center mt-10 text-gray-500">Loading payment details...</p>;

  const total = payment.amount + payment.deliveryFee;

  const statusSteps: { label: string; icon: ReactElement; key: OrderStatus }[] = [
    {
      label: 'Pending',
      icon: <FaHourglassHalf />,
      key: 'pending',
    },
    {
      label: 'Shipped',
      icon: <FaTruck />,
      key: 'shipped',
    },
    {
      label: 'Delivered',
      icon: <FaBoxOpen />,
      key: 'delivered',
    },
  ];

  const currentStatusIndex = statusSteps.findIndex(s => s.key === payment.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl w-full mx-auto px-4 py-10"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-lg rounded-xl p-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaCheckCircle className="text-green-600 text-3xl" />
          <h2 className="text-2xl font-bold text-gray-800">Payment Successful</h2>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
          Your order has been received. Track its delivery progress below.
        </p>

        {/* Status Tracker */}
        <div className="flex items-center justify-between mb-6">
          {statusSteps.map((step, index) => (
            <div key={step.key} className="flex-1 text-center">
              <div
                className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center text-white mb-1
                  ${index <= currentStatusIndex ? 'bg-primary' : 'bg-gray-300'}
                `}
              >
                {step.icon}
              </div>
              <p
                className={`text-xs font-medium ${
                  index <= currentStatusIndex ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-700 space-y-2 mb-6 border-t pt-4">
          <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
          <p><strong>Date:</strong> {payment.paymentDate}</p>
          <p><strong>Customer:</strong> {payment.customer}</p>
          <p><strong>Item:</strong> {payment.item}</p>
          <p><strong>Amount:</strong> ₦{payment.amount.toLocaleString()}</p>
          <p><strong>Delivery Fee:</strong> ₦{payment.deliveryFee.toLocaleString()}</p>
          <p className="text-lg font-semibold text-primary border-t pt-4">
            Total Paid: ₦{total.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-100 rounded-md p-4 mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Business Information</h4>
          <p className="text-sm text-gray-600">
            <strong>{payment.businessName}</strong><br />
            {payment.businessEmail}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => alert('Receipt confirmed!')}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition"
          >
            Confirm Receipt
          </button>

          <Link
            href="/buyer/dispute"
            className="flex-1 flex items-center justify-center gap-2 border border-red-600 text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-50 transition"
          >
            <FaFlag /> Start Dispute
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
