import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function Logo() {
  
  return (
    <div>
      <Link href={"/"}>
       <Image src={"/assets/images/naijaescrowlogo.png"} alt='Naija Escrow' width={180} height={81} />
      </Link>
     
    </div>
  )
}
