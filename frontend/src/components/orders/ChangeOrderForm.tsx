"use client";

import React, { useState } from "react";
import { changeOrderStatus, Order } from "@/utils/api/Order";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

interface Props {
  selectedOrder: Order;
  showViewModal: (input: boolean) => void;
  businessId: string;
  fetchOrdersAndStats: (businessId: string) => void;
}

export default function ChangeOrderForm({
  selectedOrder,
  businessId,
  showViewModal,
  fetchOrdersAndStats,
}: Props) {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusBadgeClass = (status: string) => {
    const classes: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-indigo-100 text-indigo-800",
      released: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return classes[status] || "bg-gray-100 text-gray-700";
  };

  const handleSubmit = async () => {
    if (!status) {
      toast.error("Please select a valid status");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await changeOrderStatus(selectedOrder._id!, status);

      if (res.success) {
        toast.success("Status updated successfully");
        showViewModal(false);
        fetchOrdersAndStats(businessId);
      } else {
        toast.error(res.message || "Failed to update status");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 text-sm text-gray-800">
      {/* Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Customer Name" value={selectedOrder.buyerName} />
        <Info label="Email" value={selectedOrder.buyerEmail} />
        <Info label="Phone" value={selectedOrder.buyerPhone!} />
        <Info label="Product" value={selectedOrder.product.name} />
      </div>

      {/* Description */}
      {selectedOrder.product.description && (
        <div>
          <p className="mb-1 text-xs text-gray-500 uppercase">Description</p>
          <p className="leading-relaxed">{selectedOrder.product.description}</p>
        </div>
      )}

      {/* Amounts */}
      <div className="grid grid-cols-2 gap-4">
        <Amount label="Amount" value={selectedOrder.amount} color="green" />
        <Amount
          label="Delivery Fee"
          value={selectedOrder.deliveryFee}
          color="blue"
        />
      </div>

      {/* Status Section */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="block font-medium text-gray-700">Order Status</span>
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${statusBadgeClass(
              status
            )}`}
          >
            {status.toUpperCase()}
          </span>
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Order["status"])}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="" disabled>
            -- Select Status --
          </option>
          <option value="shipped">Shipped</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`mt-4 w-full bg-primary text-white py-2 rounded-md transition ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primary-dark"
          }`}
        >
          {isSubmitting ? (
            <div className="flex gap-2 justify-center items-center">
              <FaSpinner className="animate-spin" /> Saving...
            </div>
          ) : (
            "Save Status"
          )}
        </button>
      </div>
    </div>
  );
}

// Helper subcomponents for cleaner layout

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="mb-1 text-xs text-gray-500 uppercase">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const Amount = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "green" | "blue";
}) => (
  <div>
    <p className="mb-1 text-xs text-gray-500 uppercase">{label}</p>
    <p className={`font-semibold text-${color}-600`}>
      ₦{value.toLocaleString()}
    </p>
  </div>
);
