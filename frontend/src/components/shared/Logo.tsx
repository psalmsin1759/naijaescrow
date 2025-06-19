import React from 'react'
import Image from 'next/image'

interface LogoType {
  type: string;
}
export default function Logo({type}: LogoType) {
  const headerLogo = "/assets/images/naijaescrowlightlogo.png";
  const footerLogo = "/assets/images/naijaescrowdarklogo.png";

  return (
    <div>
      <Image src={type == "header" ?  headerLogo: footerLogo} alt='Naija Escrow' width={187} height={50} />
    </div>
  )
}
