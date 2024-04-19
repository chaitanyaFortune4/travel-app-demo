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
import style from "../../assets/styles/productDetail_page/productDetail.module.scss";
import Image from "next/image";

export default function ProductDetailsImageContainer({ images }) {
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
    <div className={style["image-carousel"]}>
      <div className={style["sidebarImage-wrapper"]}>
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          {...swiperOneOptions}
        >
          {images?.slice(0, 5).map((item, index) => (
            <SwiperSlide key={`thumb-slide-${index}`}>
              <Image
                src={item.variants[8]?.url}
                width={item.variants[8]?.width}
                height={item.variants[8]?.height}
                alt={`image ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={style["mainImage-wrapper"]}>
        <Swiper
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
          {...swiperTwoOptions}
        >
          {images?.slice(0, 5).map((item, index) => (
            <SwiperSlide key={`slide-${index}`}>
              <Image
                className={style["mainImageSize"]}
                src={item.variants[8]?.url}
                alt={`image ${index + 1}`}
                // style={{ height: "100%", width: "100%" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
