"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";


type FormDataType = {
  accountNumber: string;
  bank: string;
  bvn: string;
};

type FormErrorsType = {
  accountNumber?: string;
  bank?: string;
  bvn?: string;
};

export default function PayoutDetailsPage() {
  const [formData, setFormData] = useState<FormDataType>({
    accountNumber: "",
    bank: "",
    bvn: "",
  });

  const [errors, setErrors] = useState<FormErrorsType>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors: FormErrorsType = {};

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required.";
    } else if (!/^\d{10}$/.test(formData.accountNumber)) {
      newErrors.accountNumber = "Account number must be 10 digits.";
    }

    if (!formData.bank.trim()) {
      newErrors.bank = "Please select a bank.";
    }

    if (!formData.bvn.trim()) {
      newErrors.bvn = "BVN is required.";
    } else if (!/^\d{11}$/.test(formData.bvn)) {
      newErrors.bvn = "BVN must be 11 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    // Simulate API request
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setLoading(false);
      alert("Payout details submitted successfully!");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Payout Details</h2>
      <p className="text-sm text-gray-600 mb-6">
        Please enter your payout bank information
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Account Number
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.accountNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.accountNumber && (
            <p className="text-sm text-red-600 mt-1">
              {errors.accountNumber}
            </p>
          )}
        </div>

        {/* Bank Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bank
          </label>
          <select
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.bank ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a bank</option>
            <option value="Access Bank">Access Bank</option>
            <option value="GTBank">GTBank</option>
            <option value="Zenith Bank">Zenith Bank</option>
            <option value="UBA">UBA</option>
          </select>
          {errors.bank && (
            <p className="text-sm text-red-600 mt-1">{errors.bank}</p>
          )}
        </div>

        {/* BVN */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            BVN
          </label>
          <input
            type="text"
            name="bvn"
            value={formData.bvn}
            onChange={handleChange}
            className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.bvn ? "border-red-500" : "border-gray-300"
            }`}
          />
          <span className="text-xs text-gray-500">
            Please enter the BVN associated with this bank account.
          </span>
          {errors.bvn && (
            <p className="text-sm text-red-600 mt-1">{errors.bvn}</p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`bg-primary text-white px-6 py-2 rounded-md transition duration-300 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary-dark"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
