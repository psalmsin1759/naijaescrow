"use client";

import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { TestimonialData } from "@/utils/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonial() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="py-12 px-4 mb-10 md:px-10 flex flex-col items-center gap-8 bg-gray-50">
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
          What are our customers saying?
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Hear from real users who’ve trusted NaijaEscrow to make their online
          transactions safer and stress-free.
        </p>
      </motion.div>

      <div className="w-full max-w-6xl">
        <Slider {...settings}>
          {TestimonialData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="px-2 h-auto flex items-stretch"
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
