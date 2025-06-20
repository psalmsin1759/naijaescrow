import React from 'react'
import Image from 'next/image'


export default function Logo() {
  
  return (
    <div>
      <Image src={"/assets/images/naijaescrowlogo.png"} alt='Naija Escrow' width={180} height={81} />
    </div>
  )
}
