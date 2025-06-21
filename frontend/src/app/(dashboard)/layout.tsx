
import type { Metadata } from "next";
import React from "react";

import "../globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import DashboardChildLayout from "./dashboard_layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 export const metadata: Metadata = {
  title: "NaijaEscrow - Dashboard",
  description: "NaijaEscrow",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <DashboardChildLayout>
        {children}
       </DashboardChildLayout>
      </body>
    </html>
  );
}
