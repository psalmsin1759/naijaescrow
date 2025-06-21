"use client"; 

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="py-4 px-10 grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
      
      <motion.div
        className="flex flex-col justify-center gap-5"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h3
          className="text-sm md:text-lg font-semibold text-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Secure Transactions. Trusted by Nigerians.
        </motion.h3>

        <motion.h1
          className="text-4xl md:text-5xl text-secondary font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Empowering Buyers & Sellers with{" "}
          <span className="text-primary">Safe Escrow Payments</span>
        </motion.h1>

        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Naija Escrow protects your money until goods are delivered or services
          are confirmed. Whether you’re running a business or making a personal
          purchase, we guarantee fairness, accountability, and peace of
          mind—every time.
        </motion.p>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/register" className="btn btn-primary">Register</Link>
          <button>🔐 Start Secure Trading Today</button>
        </motion.div>
      </motion.div>

    
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src={"/assets/images/escrowbanner1.png"}
          alt="banner1"
          width={565}
          height={450}
          className="drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
