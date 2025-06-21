'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-4xl w-full bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>

        <section className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold mb-2">1. Introduction</h2>
            <p>
              At Naija Escrow, your privacy is a top priority. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">2. Information We Collect</h2>
            <ul className="list-disc pl-6">
              <li><strong>Personal Information:</strong> such as your name, email, phone number, and payment details.</li>
              <li><strong>Transaction Data:</strong> order details, payment history, and dispute records.</li>
              <li><strong>Technical Data:</strong> browser type, IP address, and device information.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6">
              <li>Facilitate secure transactions between buyers and sellers</li>
              <li>Communicate updates and support-related messages</li>
              <li>Enhance platform performance and user experience</li>
              <li>Ensure compliance with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">4. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your data with third-party payment processors, service providers, or authorities where legally required.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">5. Data Security</h2>
            <p>
              We implement robust security measures to protect your information from unauthorized access, loss, or misuse.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">6. Cookies</h2>
            <p>
              Our platform uses cookies to improve user experience and track analytics. You can control cookie preferences in your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent to data processing</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">8. Updates to This Policy</h2>
            <p>
              We may update this policy occasionally. When we do, we’ll revise the “Last Updated” date below. Continued use of the platform indicates your agreement to the changes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please email us at{" "}
              <a href="mailto:privacy@naijaescrow.com" className="text-primary font-medium">
                support@naijaescrow.com
              </a>.
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-6">Last Updated: June 20, 2025</p>
        </section>
      </div>
    </motion.div>
  );
}
