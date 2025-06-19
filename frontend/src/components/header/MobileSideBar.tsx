import React from "react";
import { navItems } from "@/utils/data";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface OpenProps {
  open: boolean;
}
export default function MobileSideBar({ open }: OpenProps) {
  console.log(open);
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 , y: -100}}
          className="md:hidden absolute top-20 left-0 w-full h-screen z-20"
        >
          <div className="text-xl font-semibold uppercase bg-primary text-white py-10 m-6 rounded-3xl ">
            <ul className="flex flex-col justify-center items-center gap-10">
              {navItems.map((navItem, index: number) => (
                <li key={index}>
                  <Link href={navItem.path}>{navItem.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
