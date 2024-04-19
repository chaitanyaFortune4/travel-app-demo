"use client";

import { convertToSlug, eventTrigger } from "@/utils/common";
import { apiList } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import commonStyle from "../../assets/styles/common.module.scss";

const Products = ({ products }) => {
  const router = useRouter();

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
        <i
          key={i}
          style={{ color: "#f5c542" }}
          className="fa-solid fa-star"
        ></i>
      );
    }

    // Add half star if necessary
    if (hasHalfStar) {
      stars.push(
        <i
          key="half"
          style={{ color: "#f5c542" }}
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

  const productHandler = (product) => {
    localStorage.setItem("product", JSON.stringify(product));
    router.push(`/tour/${product.productCode}`);
  };

  return (
    <>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {products?.length > 0 &&
          products.map((product, idx) => (
            // <div
            //   key={idx}
            //   style={{
            //     cursor: "pointer",
            //     border: "1px solid grey",
            //     padding: "1rem",
            //     width: "100%",
            //     display: "flex",
            //     justifyContent: "space-around",
            //     columnGap: "0.5rem",
            //   }}
            //   onClick={(e) => productHandler(product)}
            // >
            //   <div>
            //     <img
            //       src={product.images[0].variants[8].url}
            //       style={{
            //         // height: "100%",
            //         // width: "100%",
            //         objectFit: "contain",
            //       }}
            //       alt="Picture of the author"
            //     />
            //   </div>
            //   <div style={{ width: "60%" }}>
            //     <div
            //       style={{
            //         fontWeight: "bold",
            //         fontSize: "1rem",
            //         marginBottom: "1rem",
            //       }}
            //     >
            //       {product.title}
            //     </div>
            //     <div style={{ marginBottom: "1rem" }}>
            //       <StarRating rating={product.reviews?.combinedAverageRating} />
            //       {product.reviews?.totalReviews}
            //     </div>
            //     <div style={{ fontWeight: "300" }}>
            //       {product.description.slice(0, 300)}
            //       {product.description.length > 300 && (
            //         <button
            //           style={{
            //             background: "none",
            //             border: "none",
            //             marginLeft: "0.5rem",
            //             textDecoration: "underline",
            //           }}
            //         >
            //           ...More
            //         </button>
            //       )}
            //     </div>

            //     {product.duration && (
            //       <div style={{ marginTop: "1rem" }}>
            //         {timer(product.duration)}
            //       </div>
            //     )}
            //     <div>
            //       {product.flags.map((flag, idx) => (
            //         <div key={idx}>{convertFlag(flag)}</div>
            //       ))}
            //     </div>
            //   </div>
            //   <div
            //     style={{
            //       //   border: "1px solid red",
            //       width: "8%",
            //       textAlign: "right",
            //     }}
            //   >
            //     from
            //     <p style={{ fontWeight: "bold" }}>
            //       Rs {product.pricing.summary.fromPrice}
            //     </p>
            //     <p style={{ fontSize: "0.8rem" }}>price varies by group size</p>
            //   </div>
            // </div>
            <div
              key={idx}
              style={{
                cursor: "pointer",
                width: "330px",
              }}
              className={commonStyle["hoverable-div"]}
              onClick={(e) => productHandler(product)}
            >
              <div>
                <img
                  src={product.images[0].variants[8].url}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "0.5rem",
                  }}
                  alt="Picture of the author"
                />
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span className={commonStyle["title-span"]}>
                  {product.title}
                </span>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <StarRating rating={product.reviews?.combinedAverageRating} />
                {product.reviews?.totalReviews}
              </div>
              {product.duration && (
                <div style={{ marginTop: "1rem" }}>
                  {timer(product.duration)}
                </div>
              )}
              <div style={{ marginBottom: "0.5rem" }}>
                {product.flags.map((flag, idx) => (
                  <div key={idx}>{convertFlag(flag)}</div>
                ))}
              </div>
              <div style={{}}>
                <span style={{ fontWeight: "500" }}>from</span>
                <p
                  style={{
                    display: "inline",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  Rs {product.pricing.summary.fromPrice}
                </p>
                <p style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                  price varies by group size
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Products;
