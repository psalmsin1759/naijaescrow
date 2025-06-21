'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function AboutPage() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">About Naija Escrow</h1>

        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          <strong>Naija Escrow</strong> is a secure online escrow platform built to foster safe transactions between buyers and sellers across Nigeria. Whether you&apos;re purchasing goods from an unknown seller or providing services to a new client, Naija Escrow ensures that your money and goods are protected until both parties fulfill their obligations.
        </p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Our mission is to build trust in digital commerce by offering a seamless and reliable escrow experience that reduces fraud, builds confidence, and empowers businesses and individuals.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Why Naija Escrow?</h2>
            <ul className="list-disc pl-6 text-gray-700 text-sm space-y-2">
              <li>✔️ Instant order creation & payment links</li>
              <li>✔️ Real-time order tracking and status updates</li>
              <li>✔️ Dispute management for unresolved issues</li>
              <li>✔️ Transparent fees and guaranteed payouts</li>
              <li>✔️ Buyer and seller protection policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Who Can Use Naija Escrow?</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              We serve individuals, small businesses, freelancers, marketplaces, and e-commerce platforms. Whether you’re selling a car, phone, land, or offering freelance services — Naija Escrow is here to secure your transaction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Got questions? Want to partner with us? Reach out at{" "}
              <a href="mailto:support@naijaescrow.com" className="text-primary font-medium">
                support@naijaescrow.com
              </a>{" "}
              or use our contact form.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
