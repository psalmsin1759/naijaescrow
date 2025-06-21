"use client"
import React, {useState} from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { navItems } from "@/utils/data";
import { IoMdMenu } from "react-icons/io";
import MobileSideBar from "@/components/header/MobileSideBar";

export default function NavBar() {

  const [open, setOpen] = useState(false);

  const closeMobileNave = () => {
    setOpen(false);
  }

  return (
    <div className="py-6 px-10 ">
      <nav>
        <div className="flex justify-between items-center">
          <Logo  />
          <div className="hidden md:block">
            <ul className=" flex items-center text-gray-600 gap-6 ">
              {navItems.map((navItem, index) => (
                <li className="inline-block py-1 px-3 hover:underline hover:text-primary font-semibold" key={index}>
                  <Link href={navItem.path}>{navItem.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/register" className="hidden md:block cursor-pointer w-28 py-2 px-5 text-white font-semibold bg-primary shadow border-primary rounded hover:bg-white hover:border-primary hover:border-2 hover:text-primary">
              Register
            </Link>

            <Link href={"/login"} className="hidden md:block cursor-pointer w-28 py-1.5 px-5 border-2 text-primary font-semibold  border-primary rounded hover:bg-primary hover:text-white">
              Login
            </Link>
          </div>
          <div className="md:hidden cursor-pointer">
            <IoMdMenu onClick={() => setOpen(!open)}  className="text-4xl" />
          </div>
        </div>
      </nav>

     
      <MobileSideBar open={open} close={closeMobileNave} />
    </div>
  );
}
