'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    question: "What is Naija Escrow?",
    answer:
      "Naija Escrow is a secure platform that helps facilitate transactions between buyers and sellers, holding funds until both parties are satisfied.",
  },
  {
    question: "How does escrow payment work?",
    answer:
      "The buyer sends payment to Naija Escrow. Once the seller ships and the buyer confirms receipt, the funds are released to the seller.",
  },
  {
    question: "Is it safe to use Naija Escrow?",
    answer:
      "Absolutely. Naija Escrow holds the funds securely and ensures fair resolution of disputes before releasing any funds.",
  },
  {
    question: "What if I don’t receive my item?",
    answer:
      "If the item isn’t delivered or is not as described, you can start a dispute. Naija Escrow will investigate and ensure a fair resolution.",
  },
  {
    question: "Are there any fees involved?",
    answer:
      "Yes, a small transaction fee is charged depending on the amount. All fees are clearly disclosed before payment.",
  },
];

export default function FaqPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border rounded-lg shadow">
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform ${
                    activeIndex === index ? 'rotate-180' : ''
                  } text-gray-500`}
                />
              </button>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 text-sm text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
