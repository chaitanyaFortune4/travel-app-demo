"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowDropright } from "react-icons/io";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

export default function ProductDetailsImageContainer({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperOneOptions = {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 5,
    freeMode: true,
    watchSlidesProgress: true,
    direction: "vertical",
  };
  const swiperTwoOptions = {
    loop: true,
    spaceBetween: 10,
    navigation: true,
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%" }}>
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          {...swiperOneOptions}
        >
          {data?.slice(0, 5).map((item, index) => (
            <SwiperSlide key={`thumb-slide-${index}`}>
              <Image
                src={item.variants?.url}
                width={item.variants?.width}
                height={item.variants?.height}
                alt={`image ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div style={{ width: "80%", borderRadius: "10px" }}>
        <Swiper
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          {...swiperTwoOptions}
        >
          {data?.slice(0, 5).map((item, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <Image
                src={item.variants?.url}
                width={500}
                height={500}
                alt={`image ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
