"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createOrder } from "@/utils/api/Order";
import { toast } from "react-toastify";

export default function CreateOrderForm() {
  const { auth } = useAuth();
  const businessId = auth?.business;

  const router = useRouter();

  const [form, setForm] = useState({
    buyerName: "",
    //buyerEmail: "",
    //buyerPhone: "",
    productName: "",
    productDescription: "",
    amount: "",
    deliveryFee: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessId) {
      toast.error("Business ID is missing");
      return;
    }

    const payload = {
      buyerName: form.buyerName,
      //buyerEmail: form.buyerEmail,
      //buyerPhone: form.buyerPhone,
      product: {
        name: form.productName,
        description: form.productDescription,
      },
      amount: parseFloat(form.amount),
      deliveryFee: parseFloat(form.deliveryFee),
      businessId,
    };

    const response = await createOrder(payload);
    if (response.success && response.data) {
      //toast.success("Order created successfully");
      router.push(`/dashboard/orders/success/${response.data._id}`);
    } else {
      toast.error(response.message || "Failed to create order");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-sm text-gray-700"
    >
      <div>
        <label className="block mb-1 font-medium">Customer Name</label>
        <input
          name="buyerName"
          value={form.buyerName}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          required
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            name="buyerPhone"
            value={form.buyerPhone}
            onChange={handleChange}
            placeholder="e.g. 08012345678"
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="buyerEmail"
            type="email"
            value={form.buyerEmail}
            onChange={handleChange}
            placeholder="e.g. customer@example.com"
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div> */}

      <div>
        <label className="block mb-1 font-medium">Order Item</label>
        <input
          name="productName"
          value={form.productName}
          onChange={handleChange}
          placeholder="e.g. Apple MacBook Pro"
          required
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Item Description</label>
        <textarea
          name="productDescription"
          value={form.productDescription}
          onChange={handleChange}
          placeholder="Short description of the item"
          rows={3}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Amount (₦)</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="e.g. 200000"
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Delivery Fee (₦)</label>
          <input
            name="deliveryFee"
            type="number"
            value={form.deliveryFee}
            onChange={handleChange}
            placeholder="e.g. 5000"
            required
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md font-medium transition-all duration-300"
        >
          Submit Order
        </button>
      </div>
    </form>
  );
}
