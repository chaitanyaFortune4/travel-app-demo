"use client";

import { convertToSlug, eventTrigger } from "@/utils/common";
import { apiList } from "@/utils/constants1";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import listStyle from "../../assets/styles/listing_page/listing.module.scss"
import commonStyle from "../../assets/styles/common.module.scss"
const Products = ({ products }) => {
  const convertMinutesToHours = (minutes) => {
    var hours = Math.floor(minutes / 60); // Calculate hours
    var remainingMinutes = minutes % 60; // Calculate remaining minutes
    return hours + " hours ";
  };

  const timer = (duration) => {
    // console.log("DU", duration);
    const len = Object.keys(duration).length;
    if (len > 1) {
      return `${convertMinutesToHours(
        duration.variableDurationFromMinutes
      )} to ${convertMinutesToHours(duration.variableDurationToMinutes)}`;
    } else {
      return `${convertMinutesToHours(duration.fixedDurationInMinutes)}`;
    }
  };

  const convertFlag = (flag) => {
    return flag
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  function StarRating({ rating }) {
    // Round the rating to the nearest 0.5
    const roundedRating = Math.round(rating * 2) / 2;

    // Determine the number of filled and unfilled stars
    const filledStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const maxStars = 5;
    const unfilledStars = maxStars - filledStars - (hasHalfStar ? 1 : 0);

    // Array to store the JSX elements for stars
    const stars = [];

    // Add filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <i key={i} style={{ color: "yellow" }} className="fa-solid fa-star"></i>
      );
    }

    // Add half star if necessary
    if (hasHalfStar) {
      stars.push(
        <i
          key="half"
          style={{ color: "yellow" }}
          className="fa-solid fa-star-half-stroke"
        ></i>
      );
    }

    // Add unfilled stars
    for (let i = 0; i < unfilledStars; i++) {
      stars.push(
        <i
          key={i + filledStars + (hasHalfStar ? 1 : 0)}
          className="fa-regular fa-star"
        ></i>
      );
    }

    return <div>{stars}</div>;
  }

  return (
    <>
      {/* <div style={{ marginTop: "2rem" }}> */}
        {products?.length > 0 &&
          products.slice(0,3).map((product, idx) => (
            <Link href={`/tour/${convertToSlug(product.title)}`} key={idx}>
              <div className={listStyle["list-card"]}
                onClick={() => eventTrigger(product)}
              >
                <div>
                  <img
                    src={product.images[0].variants[8].url}
                    className={listStyle["card-img"]}
                    style={{
                      objectFit: "contain",
                    }}
                    alt="Picture of the author"
                  />
                </div>
                <div style={{ width: "60%" }}>
                  <h3 className={listStyle["card-title"]}>
                    {product.title}
                  </h3>
                  <div style={{ marginBottom: "1rem" }}>
                    <StarRating
                      rating={product.reviews?.combinedAverageRating}
                    />
                    {product.reviews?.totalReviews}
                  </div>
                  <div style={{ fontWeight: "300" }}>
                    {product.description.slice(0, 300)}
                    {product.description.length > 300 && (
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          marginLeft: "0.5rem",
                          textDecoration: "underline",
                        }}
                      >
                        ...More
                      </button>
                    )}
                  </div>

                  {product.duration && (
                    <div style={{ marginTop: "1rem" }}>
                      {timer(product.duration)}
                    </div>
                  )}
                  <div>
                    {product.flags.map((flag, idx) => (
                      <div key={idx}>{convertFlag(flag)}</div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    //   border: "1px solid red",
                    width: "8%",
                    textAlign: "right",
                  }}
                >
                  from
                  <p style={{ fontWeight: "bold" }}>
                    Rs {product.pricing.summary.fromPrice}
                  </p>
                  <p style={{ fontSize: "0.8rem" }}>
                    price varies by group size
                  </p>
                </div>
              </div>
            </Link>
          ))}
      {/* </div> */}
    </>
  );
};

export default Products;
