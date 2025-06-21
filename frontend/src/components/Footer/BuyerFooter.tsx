import React from "react";
import {
  FaLock,
  FaShieldAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

export default function BuyerFooter() {
  return (
    <footer className="bg-white border-t text-sm text-gray-600 px-4 py-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Security Info */}
        <div className="flex items-center gap-4 text-gray-700">
          <FaLock className="text-green-600" />
          <FaShieldAlt className="text-blue-600" />
          <span className="hidden sm:inline">100% Secure & Encrypted Payments</span>
        </div>

        {/* Payment Icons */}
        <div className="flex items-center gap-4 text-gray-500 text-xl">
          <FaCcVisa />
          <FaCcMastercard />
          <FaCcPaypal />
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} Naija Escrow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
