'use client';

import { motion } from 'framer-motion';

export default function SidebarStepper({ step }: { step: number }) {
  const steps = [
    {
      title: 'Business Details',
      description: 'Tell us about your business to get started.',
    },
     {
      title: 'Verify Email',
      description: 'Check your email and enter the verification code.',
    },
    {
      title: 'Add Admin',
      description: 'Assign an admin to manage your business account.',
    },
    {
      title: 'Review',
      description: 'Confirm that all information provided is accurate.',
    },
    {
      title: 'Welcome to Naija Escrow',
      description: 'You’re all set! Explore your dashboard and start transacting securely.',
    },
  ];

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full md:max-w-xs h-full"
    >
      <motion.h3
        className="text-xl font-semibold mb-8 text-gray-800 tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Get Started with Naija Escrow
      </motion.h3>

      <ol className="space-y-6">
        {steps.map((label, index) => {
          const current = index + 1 === step;
          const complete = index + 1 < step;

          return (
            <motion.li
              key={index}
              className={`flex items-start gap-4 transition-all duration-300 ${
                current ? 'bg-gray-50 p-3 rounded-lg border border-primary/40' : ''
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`w-8 h-8 rounded-full text-sm flex items-center justify-center font-semibold transition-all ${
                  complete
                    ? 'bg-primary text-white'
                    : current
                    ? 'bg-secondary text-white shadow'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {complete ? '✓' : index + 1}
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm font-medium ${
                    current ? 'text-primary' : 'text-gray-800'
                  }`}
                >
                  {label.title}
                </span>
                <span className="text-xs text-gray-500">{label.description}</span>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </motion.aside>
  );
}
