import React from "react";
import { navItems } from "@/utils/data";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface OpenProps {
  open: boolean;
   close: () => void;
}

export default function MobileSideBar({ open, close }: OpenProps) {

  
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="md:hidden fixed top-20 left-0 w-full z-20 px-6"
        >
          <div className="bg-primary text-white py-10 px-6 rounded-3xl shadow-lg flex flex-col  h-full">
            <ul className="flex flex-col items-center gap-8 text-xl font-medium uppercase">
              {navItems.map((navItem, index) => (
                <li key={index}  onClick={close}>
                  <Link href={navItem.path}>{navItem.title}</Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-4 text-base font-normal">
              <Link
              onClick={close}
                href="/login"
                className="bg-white text-primary px-6 py-2 rounded-full w-full text-center font-medium transition hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
               onClick={close}
                href="/register"
                className="bg-secondary text-white px-6 py-2 rounded-full w-full text-center font-medium transition hover:bg-gray-700"
              >
                Register
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
