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

export default function ProductDetailsImageContainer() {
  const [thumbsSwiper, setThumbsSwiper] = useState('');
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
          {Array.from({ length: 6 }, (_, index) => (
            <SwiperSlide key={`thumb-slide-${index}`}>
              <img
                src={`https://swiperjs.com/demos/images/nature-${
                  index + 1
                }.jpg`}
                alt={`Nature ${index + 1}`}
                // style={{borderRadius:'10px'}}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div style={{ width: "80%", borderRadius: "10px" , }}>
        <Swiper
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          {...swiperTwoOptions}
        >
          {Array.from({ length: 6 }, (_, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <img
                src={`https://swiperjs.com/demos/images/nature-${
                  index + 1
                }.jpg`}
                alt={`Nature ${index + 1}`}
                // style={{borderRadius:'10px'}}

              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
