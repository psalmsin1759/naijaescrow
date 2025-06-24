"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import dynamic from "next/dynamic";
import { getOrdersById, Order, changeOrderStatus, updateOrder } from "@/utils/api/Order";
import { getBusinessById, Business } from "@/utils/api/Business";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

export default function PayPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();

    const checkOrderStatusAndRedirect = (order: Order) => {
  const redirectStatuses = ["paid", "shipped", "delivered"];

  if (redirectStatuses.includes(order.status)) {
    router.push(`/buyer/paid/${order._id}`);
  }
};

  const fetchOrderById = async (id: string) => {
    const res = await getOrdersById(id);
    checkOrderStatusAndRedirect(res.data!)
    setOrder(res.data!);
    setName(res.data!.buyerName!);
     const resBiz =   await getBusinessById(res.data!.businessId)
     setBusiness(resBiz.data!);
  };


  const handUpdateOrder = async(email: string, phone: string) => {
    const updateValue = {
      buyerEmail: email,
      buyerPhone: phone,
    }
    await updateOrder(id, updateValue);
  }


  useEffect(() => {
    fetchOrderById(id);
  }, [id]);



  const changeOrderStatusToPaid = async () => {
    await changeOrderStatus(id, "paid");
  }

  if (!order)
    return <p className="text-center mt-10 text-gray-500">Loading order...</p>;

  const total = order.amount + order.deliveryFee;

  const isFormValid = name && email && phone;

  console.log(process.env.NEXT_PUBLIC_PAYSTACK_KEY!);
  const paystack = "pk_test_97ee6074455a1ee3f750f748f4580c0773168b1b";
  const componentProps = {
    email,
    amount: 5000,
    publicKey: paystack,
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: name,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: phone,
        },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (paymentData: any) => {
      console.log("Payment Success:", paymentData);
      changeOrderStatusToPaid()
      handUpdateOrder(email, phone);
      router.push(`/buyer/paid/${id}`);
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
          Payment for <span className="text-primary">{order.product.name}</span>
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
              disabled
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
            <label className="block mb-1 text-sm font-medium">
              Phone Number
            </label>
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
          <p>
            <strong>Description:</strong> {order.product.description}
          </p>
          <p>
            <strong>Amount:</strong> ₦{order.amount.toLocaleString()}
          </p>
          <p>
            <strong>Delivery Fee:</strong> ₦{order.deliveryFee.toLocaleString()}
          </p>
          <p className="text-lg font-semibold text-primary border-t pt-4">
            Total: ₦{total.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-100 rounded-md p-4 mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Business Information
          </h4>
          <p className="text-sm text-gray-600">
            <strong>{business?.name}</strong>
            <br />
            {business?.email}
            <br />
            {business?.phone}
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
