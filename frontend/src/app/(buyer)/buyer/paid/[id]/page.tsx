"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, ReactElement } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaCheckCircle,
  FaFlag,
  FaBoxOpen,
  FaTruck,
  FaHourglassHalf,
} from "react-icons/fa";
import { getOrdersById, Order, changeOrderStatus } from "@/utils/api/Order";
import { getBusinessById, Business } from "@/utils/api/Business";
import Modal from "@/components/ui/Modal";
import { toast } from "react-toastify";
import { creditWallet } from "@/utils/api/Wallet";
import { useOrder } from "@/context/OrderContext";

type OrderStatus = "paid" | "shipped" | "released";

export default function PaymentSuccessPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [businessId, setBusinessId] = useState("");
  const [business, setBusiness] = useState<Business | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

   const { setOrderContext } = useOrder();

  const fetchOrderById = async (id: string) => {
    const res = await getOrdersById(id);

    setOrder(res.data!);
     setOrderContext(res.data!);
    setBusinessId(res.data!.businessId);
    const resBiz = await getBusinessById(res.data!.businessId);
    setBusiness(resBiz.data!);
  };

  useEffect(() => {
   
    fetchOrderById(id);
  }, [id]);

  if (!order)
    return <p className="text-center mt-10 text-gray-500">Loading order...</p>;

  const total = order.amount + order.deliveryFee;

  const statusSteps: { label: string; icon: ReactElement; key: OrderStatus }[] =
    [
      {
        label: "Paid",
        icon: <FaHourglassHalf />,
        key: "paid",
      },
      {
        label: "Shipped",
        icon: <FaTruck />,
        key: "shipped",
      },
      {
        label: "Completed",
        icon: <FaBoxOpen />,
        key: "released",
      },
    ];

  const currentStatusIndex = statusSteps.findIndex(
    (s) => s.key === order.status
  );

  const fundWallet = async (amount: number, reference: string, name: string) => {
    const input = {
      userId: businessId,
      amount: amount,
      reference: reference,
      narration: `Payment from ${name}`,
      source: "order",
      type: "business",
    };

    await creditWallet(input);

  };

  function generateRandomId(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


  const changeStatusToComplete = async () => {
    const reference = generateRandomId(12);
    const res = await changeOrderStatus(order._id!, "released");
    if (res.success && res.data) {
      setOrder(res.data);
      fundWallet(total,reference, order.buyerName );
      toast.success("Trade completed!!");
    }
  };

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
          <h2 className="text-2xl font-bold text-gray-800">
            Payment Successful
          </h2>
        </div>

        <p className="text-gray-600 mb-6 text-sm">
          We have received your payment. Track its delivery progress below.
        </p>

        {/* Status Tracker */}
        <div className="flex items-center justify-between mb-6">
          {statusSteps.map((step, index) => (
            <div key={step.key} className="flex-1 text-center">
              <div
                className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center text-white mb-1
                  ${index <= currentStatusIndex ? "bg-primary" : "bg-gray-300"}
                `}
              >
                {step.icon}
              </div>
              <p
                className={`text-xs font-medium ${
                  index <= currentStatusIndex ? "text-primary" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-700 space-y-2 mb-6 border-t pt-4">
          {/* <p><strong>Transaction ID:</strong> {payment.transactionId}</p> */}
          <p>
            <strong>Date:</strong> {order.updatedAt}
          </p>
          <p>
            <strong>Customer:</strong> {order.buyerName}
          </p>
          <p>
            <strong>Item:</strong> {order.product.name}
          </p>
          <p>
            <strong>Amount:</strong> ₦{order.amount.toLocaleString()}
          </p>
          <p>
            <strong>Delivery Fee:</strong> ₦{order.deliveryFee.toLocaleString()}
          </p>
          <p className="text-lg font-semibold text-primary border-t pt-4">
            Total Paid: ₦{total.toLocaleString()}
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

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {order.status !== "released" && (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition"
            >
              Confirm Receipt
            </button>
          )}

          <Link
            href="/buyer/dispute"
            className="flex-1 flex items-center justify-center gap-2 border border-red-600 text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-50 transition"
          >
            <FaFlag /> Start Dispute
          </Link>
        </div>
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          title="Confirm Receipt"
        >
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              Are you sure you want to confirm receipt of this item? Once
              confirmed, the funds will be released to the vendor.
            </p>
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await changeStatusToComplete();
                  setShowConfirmModal(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </motion.div>
  );
}
