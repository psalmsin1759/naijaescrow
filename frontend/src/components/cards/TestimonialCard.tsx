import React from 'react'

interface TestimonialProps {
  id: number
  name: string
  text: string
  img: string
  delay: number
}

export default function TestimonialCard({ name, text, img }: TestimonialProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={img}
            alt={name}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <h4 className="text-md font-semibold text-gray-800">{name}</h4>
        </div>
        <p className="text-gray-600 text-sm">{text}</p>
      </div>
    </div>
  )
}
