"use client";
import React, { ReactElement } from "react";
import { FiEdit } from "react-icons/fi";
import { MdLink, MdCheckCircleOutline } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { FaShippingFast, FaMoneyBillWave } from "react-icons/fa";
import BannerCard from "@/components/home/WorkflowCard";
import { motion } from "framer-motion";


interface Banner {
  title: string;
  description: string;
  icon: ReactElement;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function Banner() {
  const workflows: Banner[] = [
    {
      title: "Create an Order",
      description:
        "A seller or service provider creates an escrow order detailing the transaction, item, price, and delivery terms.",
      icon: <FiEdit />,
    },
    {
      title: "Share Payment Link",
      description:
        "The buyer receives a secure NaijaEscrow payment link to fund the order using Naira or other supported methods.",
      icon: <MdLink />,
    },
    {
      title: "Escrow Holds the Funds",
      description:
        "Once payment is made, NaijaEscrow safely holds the funds, ensuring neither party is at risk.",
      icon: <AiFillLock />,
    },
    {
      title: "Seller Ships or Delivers",
      description:
        "The seller proceeds to deliver the product or complete the service based on the agreed terms.",
      icon: <FaShippingFast />,
    },
    {
      title: "Buyer Confirms Delivery",
      description:
        "The buyer confirms receipt and satisfaction. If there's an issue, NaijaEscrow steps in to mediate.",
      icon: <MdCheckCircleOutline />,
    },
    {
      title: "Funds are Released",
      description:
        "Once confirmed, NaijaEscrow releases the funds to the seller's wallet instantly.",
      icon: <FaMoneyBillWave />,
    },
  ];

  return (
    <div className="py-4 px-10 flex flex-col items-center gap-4">
     
      <motion.div
        className="flex flex-col gap-2 items-center justify-center md:w-1/2 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-xl md:text-3xl font-semibold text-gray-600">
          How NaijaEscrow works
        </h1>
        <p className="text-gray-600 text-[12px]">
          NaijaEscrow simplifies secure transactions between buyers and sellers
          by acting as a trusted middleman. Our step-by-step process ensures
          that funds are safely held until both parties are satisfied—eliminating
          fraud and building trust in every deal.
        </p>
      </motion.div>

     
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {workflows.map((workflow, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <BannerCard {...workflow} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
