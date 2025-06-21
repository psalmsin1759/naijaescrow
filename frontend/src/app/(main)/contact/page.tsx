'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FaPhone, 
    FaEnvelope, 
    //FaMapMarkerAlt 
} from 'react-icons/fa';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    
    setTimeout(() => {
      alert('Message sent!');
      setForm({ name: '', email: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <motion.div
      className="min-h-screen px-4 py-12 bg-gray-50 flex items-start justify-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Form Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-sm text-gray-500 mb-6">
            Got questions or feedback? We&apos;d love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition font-medium"
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="bg-primary text-white p-8 flex flex-col justify-center space-y-4">
         {/*  <div>
            <h4 className="text-lg font-semibold mb-1">Our Office</h4>
            <p className="flex items-center gap-2 text-sm">
              <FaMapMarkerAlt /> 123 Market Road, Lagos, Nigeria
            </p>
          </div> */}

          <div>
            <h4 className="text-lg font-semibold mb-1">Email Us</h4>
            <p className="flex items-center gap-2 text-sm">
              <FaEnvelope /> support@naijaescrow.com
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-1">Call Us</h4>
            <p className="flex items-center gap-2 text-sm">
              <FaPhone /> +234 912 259 4985
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
