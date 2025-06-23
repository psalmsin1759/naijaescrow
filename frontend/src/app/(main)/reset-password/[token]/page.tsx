'use client';

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { resetPassword } from "@/utils/api/Admin";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        toast.error("Password mismatch");
        return;
      }

      const res = await resetPassword(token, password);
      if (res.success) {
        toast.success(res.message);
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.message || "Something went wrong");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Server error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white shadow-lg mt-24 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter a new password for your account.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              New Password
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition font-medium"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <Link href="/login" className="text-primary hover:underline">
            ← Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
