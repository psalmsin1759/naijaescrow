'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-4xl w-full bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Terms & Conditions</h1>

        <section className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to Naija Escrow. By accessing our services, you agree to abide by these Terms and Conditions. If you disagree with any part, you may not use our service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">2. Service Overview</h2>
            <p>
              Naija Escrow is a platform that securely holds funds between a buyer and seller until the agreed transaction is completed. This ensures trust and safety in transactions.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">3. User Responsibilities</h2>
            <ul className="list-disc pl-6">
              <li>Provide accurate and complete information.</li>
              <li>Do not use the platform for fraudulent transactions.</li>
              <li>Comply with all applicable laws and regulations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">4. Fees</h2>
            <p>
              A service fee will be charged on each escrow transaction. The fee amount is disclosed before initiating a transaction.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">5. Dispute Resolution</h2>
            <p>
              If there is a disagreement between buyer and seller, users can initiate a dispute. Our team will review the case and make a fair resolution decision based on the evidence provided.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account if you violate these terms or engage in suspicious activity.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">7. Changes to Terms</h2>
            <p>
              Naija Escrow may update these terms at any time. Continued use of our services after changes implies your acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">8. Contact</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:support@naijaescrow.com" className="text-primary font-medium">
                support@naijaescrow.com
              </a>.
            </p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
