import React from "react";
import Logo from "../shared/Logo";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <div className="py-12 px-4 bg-gradient-to-r from-gray-900 to-gray-950 dark:bg-black rounded-t-3xl">
      <div className="">
        <div className="grid md:grid-cols-4 md:gap-4 py-5 items-center text-white  border-t-2 border-gray-300/10">
          <div>
            <div>
              <Logo  />
            </div>
            <p className=" text-[10px] mt-2">
              NaijaEscrow is Nigeria’s trusted digital escrow platform, designed
              to protect buyers and sellers during online transactions. Whether
              you’re shopping, selling, or hiring services, we ensure your money
              is secure until all terms are fulfilled. Join thousands of
              Nigerians already transacting safely with confidence.
            </p>
            <div className="flex gap-4  text-md mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiTiktok />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 md:ml-14">
            <div className="py-8 px-4">
                <h1 className="sm:text-lg text-xl font-bold sm:text-left text-justify mb-5" >Important links</h1>
                <ul className="flex flex-col gap-3 text-md text-gray-600 ">
                    <li className="hover:text-white">Home</li>
                    <li className="hover:text-white">About</li>
                    <li className="hover:text-white">Services</li>
                    <li className="hover:text-white">Contact</li>
                    <li className="hover:text-white">FAQs</li>
                </ul>
            </div>
            <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5 " >Support</h1>
                <ul className="flex flex-col text-md gap-3 text-gray-600">
                    <li className="hover:text-white">Contact</li>
                    <li className="hover:text-white">Terms</li>
                    <li className="hover:text-white">Privacy</li>
                    <li className="hover:text-white">Dispute</li>
                </ul>
            </div>
            <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5" >Resources</h1>
                <ul className="flex flex-col text-md gap-3 text-gray-600">
                    <li className="hover:text-white">Blog</li>
                    <li className="hover:text-white">FAQs</li>
                </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center text-white text-sm">
          Copyright © 2025 Samson Ude Lab
        </div>
      </div>

    </div>
  );
}
