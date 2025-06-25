import type { Metadata } from "next";
import React from "react";

import BuyerHeader from "@/components/header/BuyerHeader";
import "../globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import BuyerFooter from "@/components/Footer/BuyerFooter";
import { ToastContainer } from "react-toastify";
import { OrderProvider } from "@/context/OrderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NaijaEscrow - Buyer",
  description: "NaijaEscrow",
};

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrderProvider>
          <BuyerHeader />
          <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
            {children}
          </main>
          <BuyerFooter />
        </OrderProvider>

        <ToastContainer />
      </body>
    </html>
  );
}
