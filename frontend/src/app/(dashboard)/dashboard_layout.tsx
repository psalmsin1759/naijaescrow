"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaWallet,
  FaExchangeAlt,
  FaGavel,
  FaTachometerAlt,
  FaMoneyCheckAlt,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaKey,
  FaSignOutAlt,
  FaComments,
  FaMoneyBillWave
} from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { initSocket } from "@/utils/socket";
import Logo from "@/components/shared/Logo";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: <FaTachometerAlt /> },
  { name: "Orders", href: "/dashboard/orders", icon: <FaMoneyCheckAlt /> },
  { name: "Wallet", href: "/dashboard/wallet", icon: <FaWallet /> },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: <FaExchangeAlt />,
  },
  { name: "Chat", href: "/dashboard/chat", icon: <FaComments /> },
  { name: "Dispute", href: "/dashboard/dispute", icon: <FaGavel /> },
  { name: "Payout Details", href: "/dashboard/payout-details", icon: <FaMoneyBillWave /> },
];

export default function DashboardChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const [hasUnread, setHasUnread] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!auth?.business) return;

    const socket = initSocket();
    socketRef.current = socket;

    const roomId = auth.business;
    console.log("business room " + roomId);
    const inputx = { type: "business", id: roomId };
    socket.emit("joinRoom", inputx);
    //socket.emit("joinRoom", { type: "business", id: auth.business });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket.on("newMessage", (data) => {
      setHasUnread(true);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [auth?.business]);

  const showChatPage = () => {
    router.push("/dashboard/chat");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 hidden md:flex flex-col justify-between">
        <div>
         {/*  <h2 className="text-xl font-bold mb-6 text-primary">Naija </h2> */}
           <Logo />
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-lg transition hover:bg-primary/10 ${
                  pathname === item.href
                    ? "bg-primary text-white"
                    : "text-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <footer className="text-sm text-gray-500 mt-10">
          &copy; {new Date().getFullYear()} Naija Escrow
        </footer>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity ${
          sidebarOpen ? "block md:hidden" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>
      <aside
        className={`fixed z-40 top-0 left-0 w-64 h-full bg-white shadow-md p-5 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center mb-6">
          <Logo />
          <button onClick={toggleSidebar}>
            <FaTimes className="text-gray-600" />
          </button>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={toggleSidebar}
              className={`flex items-center px-4 py-2 rounded-lg transition hover:bg-primary/10 ${
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-gray-700"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center md:justify-end relative">
          <div className="md:hidden">
            <button onClick={toggleSidebar}>
              <FaBars className="text-gray-700 text-xl" />
            </button>
          </div>

          {/* Hover Dropdown */}
          <div className="flex gap-2">
            <div
              className="relative group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="text-sm text-gray-700 flex items-center gap-2 cursor-pointer hover:text-primary transition">
                Welcome, {auth?.adminFirstName}
                <FaUserCircle className="text-lg" />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg border border-gray-200 rounded-lg z-50 overflow-hidden animate-fade-in">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition"
                  >
                    <FaUserCircle className="mr-2 text-primary" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/admins"
                    className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition"
                  >
                    <FaUserCircle className="mr-2 text-primary" />
                    Admins
                  </Link>
                  <Link
                    href="/dashboard/change-password"
                    className="flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition"
                  >
                    <FaKey className="mr-2 text-yellow-500" />
                    Change Password
                  </Link>
                  <Link
                    href="/"
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-3 hover:bg-gray-50 text-sm text-red-600 transition"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </Link>
                </div>
              )}
            </div>
            <button
              onClick={() => showChatPage()}
              className="relative cursor-pointer text-primary text-xl hover:text-primary-dark transition"
            >
              <FaComments />
              {hasUnread && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-screen-lg w-full mx-auto">{children}</div>
        </main>

        {/* Footer */}
        <footer className="bg-white text-center py-3 text-sm text-gray-500 shadow-inner">
          Naija Escrow &copy; {new Date().getFullYear()} — All rights reserved.
        </footer>
      </div>
      <ToastContainer />
    </div>
  );
}
