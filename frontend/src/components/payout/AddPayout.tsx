"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { bvnDetailHolder, BvnDetail } from "@/utils/data";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { Payout, usePayoutContext } from "@/context/PayoutContext";

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

interface Props {
  showViewModal: (input: boolean) => void;
}

export default function AddPayout({showViewModal}: Props) {
  const [isBvnLoading, setIsBvnLoading] = useState(false);
  const [code, setCode] = useState("");
  const [isBvnVerified, setIsBvnVerified] = useState(false);
  const [myBvnDetails, setMyBvnDetails] = useState<BvnDetail | null>(null);

  const { addPayout } = usePayoutContext();

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

  const handleBvnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setFormData({
      ...formData,
      bvn: input,
    });

    if (input.length === 11) {
      getBvnDetails(input);
    } else {
      setMyBvnDetails(null);
    }
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

    const payload: Payout = {
      accountName: myBvnDetails!.name!,
      accountNumber: formData.accountNumber,
      bank: formData.bank,
      bvn: formData.bvn,
    };

    setTimeout(() => {
      addPayout(payload);
      showViewModal(false);
      setLoading(false);
      toast.success("Payout added");
    }, 1500);
  };

  const getBvnDetails = (bvn: string) => {
    setIsBvnLoading(true);
    setTimeout(() => {
      const bvnDetail =
        bvnDetailHolder.find((item) => item.bvn === bvn) || null;
      setMyBvnDetails(bvnDetail);
      setIsBvnLoading(false);
    }, 2000);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const verifyPhoneNumber = (e: React.MouseEvent) => {
    e.preventDefault();

    if (code.length === 0) {
      toast.error("Please enter verification code");
    } else if (code === "12345") {
      setIsBvnVerified(true);
      toast.success("BVN verified successfully!");
    } else {
      toast.error("Invalid verification code.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto bg-white "
    >
      <p className="text-sm text-gray-600 mb-6">
        Please enter your payout bank information
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* BVN */}
        <div>
          <label className="block text-sm font-medium text-gray-700">BVN</label>
          <input
            type="text"
            name="bvn"
            value={formData.bvn}
            onChange={handleBvnChange}
            className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-gray-300`}
          />
          <span className="text-xs text-gray-500">
            Please enter the BVN associated with this bank account.
          </span>
          {isBvnLoading ? (
            <FaSpinner className="animate-spin text-primary mt-2" />
          ) : (
            myBvnDetails?.name && (
              <p className="text-sm text-green-600 mt-1">{myBvnDetails.name}</p>
            )
          )}
          {errors.bvn && (
            <p className="text-sm text-red-600 mt-1">{errors.bvn}</p>
          )}
        </div>

        {/* Verify Code */}
        {myBvnDetails && (
          <div className="grid grid-cols-4 gap-2 items-end">
            <div className="col-span-3">
              <label className="block text-[12px] font-medium text-gray-700">
                Verify the SMS code sent to the phone number ****
                {myBvnDetails.phone.slice(-4)} associated with your BVN
              </label>
              <input
                type="number"
                name="code"
                placeholder="Enter 6-digit pin"
                onChange={handleCodeChange}
                className={`w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary border-gray-300`}
              />
            </div>
            <div className="col-span-1">
              <button
                type="button"
                onClick={verifyPhoneNumber}
                className={`bg-primary h-11 text-white px-6 py-2 rounded-md transition duration-300 hover:bg-primary-dark`}
              >
                Verify
              </button>
            </div>
          </div>
        )}

        {/* Remaining form */}
        {isBvnVerified && (
          <>
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
                <option value="Citibank Nigeria">Citibank Nigeria</option>
                <option value="Ecobank Nigeria">Ecobank Nigeria</option>
                <option value="Fidelity Bank">Fidelity Bank</option>
                <option value="First Bank of Nigeria">
                  First Bank of Nigeria
                </option>
                <option value="First City Monument Bank (FCMB)">
                  First City Monument Bank (FCMB)
                </option>
                <option value="Globus Bank">Globus Bank</option>
                <option value="Guaranty Trust Bank (GTBank)">
                  Guaranty Trust Bank (GTBank)
                </option>
                <option value="Heritage Bank">Heritage Bank</option>
                <option value="Jaiz Bank">Jaiz Bank</option>
                <option value="Keystone Bank">Keystone Bank</option>
                <option value="Polaris Bank">Polaris Bank</option>
                <option value="Providus Bank">Providus Bank</option>
                <option value="Stanbic IBTC Bank">Stanbic IBTC Bank</option>
                <option value="Standard Chartered Bank Nigeria">
                  Standard Chartered Bank Nigeria
                </option>
                <option value="Sterling Bank">Sterling Bank</option>
                <option value="SunTrust Bank">SunTrust Bank</option>
                <option value="Union Bank of Nigeria">
                  Union Bank of Nigeria
                </option>
                <option value="United Bank for Africa (UBA)">
                  United Bank for Africa (UBA)
                </option>
                <option value="Zenith Bank">Zenith Bank</option>
              </select>
              {errors.bank && (
                <p className="text-sm text-red-600 mt-1">{errors.bank}</p>
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
          </>
        )}
      </form>
    </motion.div>
  );
}
