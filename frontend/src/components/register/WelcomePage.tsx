"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { sendWelcomeEmail } from "@/utils/api/Business";
import { useAuth } from "@/context/AuthContext";

export default function WelcomePage() {
  const router = useRouter();

  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await sendWelcomeEmail(
        auth!.adminEmail!,
        auth!.adminFirstName!
      );

      router.push("/dashboard");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log (error.message);
      //toast.error(error.message || "Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-gray-50 p-6"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 text-green-600 flex justify-center"
        >
          <FaCheckCircle size={64} />
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to Naija Escrow! 🎉
        </h1>
        <p className="text-gray-600 text-md mb-6">
          Your business and admin setup is complete. You&apos;re now ready to
          securely handle transactions with peace of mind.
        </p>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            loading
              ? "bg-primary/50 text-white cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          {loading ? "Loading..." : " Go to Dashboard"}
        </button>
      </div>
    </motion.div>
  );
}
