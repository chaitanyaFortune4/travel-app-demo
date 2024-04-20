"use client";

import {
  convertFlag,
  convertToSlug,
  eventTrigger,
  timer,
} from "@/utils/common";
import { apiList } from "@/utils/constants";

import { useRouter } from "next/navigation";
import { useState } from "react";
import commonStyle from "../../assets/styles/common.module.scss";
import CustomImage from "../CommonComponent/CustomImage";
import StarRating from "../CommonComponent/StarRating";
import listStyle from "@/css/listing_page/listing.module.scss";

const Products = ({ products }) => {
  const router = useRouter();

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
        {/* {products?.length > 0 &&
          products.map((product, idx) => (
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
                <CustomImage
                  height={200}
                  width={330}
                  src={product.images[0].variants[8].url}
                  style={{
                    borderRadius: "0.5rem",
                  }}
                />
              </div>
              <div style={{ padding: "0.3rem" }}>
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
            </div>
          ))} */}
        {products?.length > 0 &&
          products.map((product, idx) => (
            <div
              key={idx}
              className={listStyle["list-card"]}
              onClick={(e) => productHandler(product)}
            >
              <div className={listStyle["img-wrapper"]}>
                <CustomImage
                  className={listStyle["card-img"]}
                  height={250}
                  width={300}
                  src={product.images[0].variants[8].url}
                  // style={{
                  //   borderRadius: "0.5rem",
                  // }}
                />
              </div>
              <div className={listStyle["right-col"]}>
                <div>
                  <h3 className={listStyle["card-title"]}>{product.title}</h3>
                  <div className={listStyle["rating-wrapper"]}>
                    <StarRating
                      rating={product.reviews?.combinedAverageRating}
                    />
                    {product.reviews?.totalReviews}
                  </div>
                  <div
                    className={listStyle["caed-desc"]}
                    style={{ fontWeight: "300" }}
                  >
                    {product.description.slice(0, 200)}
                    {product.description.length > 200 && (
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          marginLeft: "0.5rem",
                          textDecoration: "underline",
                          color: "#5a74ff",
                          cursor: "pointer",
                        }}
                      >
                        ...More
                      </button>
                    )}
                  </div>

                  {product.duration && (
                    <div className={listStyle["timer-txt"]}>
                      {timer(product.duration)}
                    </div>
                  )}
                  <div className={listStyle["offer-detail"]}>
                    {product.flags.map((flag, idx) => (
                      <div key={idx}>{convertFlag(flag)}</div>
                    ))}
                  </div>
                </div>
                <div className={listStyle["price-details"]}>
                  from
                  <p>
                    Rs{" "}
                    <span className={listStyle["price-amount"]}>
                      {" "}
                      {product.pricing.summary.fromPrice}
                    </span>
                  </p>
                  <p className={listStyle["price-desc"]}>
                    price varies by group size
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Products;
