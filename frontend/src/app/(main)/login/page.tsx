"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { login } from "@/utils/api/Admin";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { setAuth } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (email && password) {
        const res = await login(email, password);

        if (res.success) {
          const authData = {
            adminFirstName: res?.data?.firstName,
            adminLastName: res?.data?.lastName,
            adminEmail: res?.data?.email,
            adminPhone: res?.data?.phone,
          };

          setAuth(authData);
          toast.success("Login successfully");
          router.push("/dashboard");
        } else {
          toast.error(res.message || "Something went wrong");
        }
      } else {
        toast.success("Please enter all fields");
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
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 mt-24"
      >
        <h1 className="text-2xl font-bold text-center text-primary mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to your Naija Escrow admin account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-sm">Email</label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Password</label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none text-sm"
              />
            </div>
            <div className="text-right mt-1">
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
