import React from "react";
import Logo from "../shared/Logo";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  return (
    <div className="py-12 px-4 bg-gradient-to-r from-gray-900 to-gray-950 dark:bg-black rounded-t-3xl">
      <div className="">
        <div className="grid md:grid-cols-4 md:gap-4 py-5  border-t-2 border-gray-300/10">
          <div>
            <div>
              <Logo type="footer" />
            </div>
            <p className="text-gray-600 text-[10px] mt-2">
              NaijaEscrow is Nigeria’s trusted digital escrow platform, designed
              to protect buyers and sellers during online transactions. Whether
              you’re shopping, selling, or hiring services, we ensure your money
              is secure until all terms are fulfilled. Join thousands of
              Nigerians already transacting safely with confidence.
            </p>
            <div className="flex gap-4 text-gray-600 text-xl mt-2">
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
        </div>
      </div>
    </div>
  );
}
