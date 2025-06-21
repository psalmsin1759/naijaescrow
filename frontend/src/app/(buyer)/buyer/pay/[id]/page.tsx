"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

interface Order {
  id: string;
  customer: string;
  item: string;
  description: string;
  amount: number;
  deliveryFee: number;
  businessName: string;
  businessEmail: string;
}

export default function PayPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();

  useEffect(() => {
    const mockOrder: Order = {
      id: id as string,
      customer: "John Doe",
      item: 'MacBook Pro 14"',
      description: 'Brand new MacBook Pro 14" M2 16GB RAM 512GB SSD',
      amount: 200000,
      deliveryFee: 5000,
      businessName: "Techify Stores",
      businessEmail: "sales@techify.com",
    };
    setOrder(mockOrder);
  }, [id]);

  if (!order) return <p className="text-center mt-10 text-gray-500">Loading order...</p>;

  const total = order.amount + order.deliveryFee;

  const isFormValid = name && email && phone;

  console.log (process.env.NEXT_PUBLIC_PAYSTACK_KEY!);
  const paystack = "pk_test_97ee6074455a1ee3f750f748f4580c0773168b1b";
  const componentProps = {
    email,
    amount: 5000, 
    publicKey: paystack,
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "customer_name", value: name },
        { display_name: "Phone Number", variable_name: "phone_number", value: phone },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (paymentData: any) => {
      console.log("Payment Success:", paymentData);
      router.push("/buyer/paid/9383773");
    },
    onClose: () => alert("Payment cancelled"),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto px-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-xl p-8 w-full mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment for <span className="text-primary">{order.item}</span>
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Please fill in your details to continue.
        </p>

        {/* Customer Details */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="e.g. johndoe@gmail.com"
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              placeholder="e.g. 08012345678"
              className="w-full border px-3 py-2 rounded-md text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-700 mb-6 border-t pt-4">
          <p><strong>Description:</strong> {order.description}</p>
          <p><strong>Amount:</strong> ₦{order.amount.toLocaleString()}</p>
          <p><strong>Delivery Fee:</strong> ₦{order.deliveryFee.toLocaleString()}</p>
          <p className="text-lg font-semibold text-primary border-t pt-4">
            Total: ₦{total.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-100 rounded-md p-4 mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Business Information</h4>
          <p className="text-sm text-gray-600">
            <strong>{order.businessName}</strong><br />
            {order.businessEmail}
          </p>
        </div>

        {isFormValid ? (
          <PaystackButton
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-all duration-300 font-medium text-sm"
            {...componentProps}
          >
            <FaLock className="text-white" />
            Pay ₦{total.toLocaleString()} Securely
          </PaystackButton>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-white py-3 rounded-md cursor-not-allowed"
          >
            Fill all fields to proceed
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
