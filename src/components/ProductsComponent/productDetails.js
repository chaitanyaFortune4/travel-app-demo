"use client";
import React, { useEffect, useState } from "react";
import { LuShare, LuClock3 } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { GoStarFill } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
import ProductDetailsImageContainer from "./ProductDetailsImageContainer";
import data from "../../utils/dummyData.json";
import { CiMobile3 } from "react-icons/ci";
import { PiChatTextLight } from "react-icons/pi";
import { HiMiniXMark } from "react-icons/hi2";
import { IoCheckmark } from "react-icons/io5";

import Link from "next/link";
import { Title } from "../Items/Title";
import { Divder } from "../Items/Divder";
import AvailabilityCard from "../Layouts/AvailabilityCard";

export default function ProductDetails({ productDetails }) {
  const [savedProductData, setSavedProductData] = useState();
  console.log("PROD", productDetails);

  console.log("Data", savedProductData);

  useEffect(() => {
    setSavedProductData(JSON.parse(localStorage.getItem("product")));
  }, []);
  const [travelers, setTravelers] = useState(1);

  const increseCount = () => {
    setTravelers((prev) => prev + 1);
  };

  return (
    <div
      style={{
        marginTop: "5rem",
        marginLeft: "8rem",
        marginRight: "8rem",
        border: "1px solid red",
      }}
    >
      <Title title={productDetails.title} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "1rem" }}>
            {" "}
            <GoStarFill /> {productDetails.reviews.totalReviews}
          </div>
          <div style={{ marginRight: "1rem" }}>
            <SlBadge /> Badge of Excellence{" "}
          </div>
          <div style={{ marginRight: "1rem" }}> Corsica, France</div>
        </div>
        <div>
          <LuShare /> Share <FaChevronDown />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "65%" }}>
          {/* <ProductDetailsImageContainer /> */}
        </div>{" "}
        <div style={{ marginInline: "1rem" }}>
          <AvailabilityCard
            price={savedProductData?.pricing?.summary?.fromPrice}
            travelers={travelers}
            increseCount={increseCount}
          />
        </div>
      </div>
      {/* <div style={{ paddingInline: "10rem" }}>
        <Divder />
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "1rem" }}>
            <LuClock3 /> 6 hours
          </div>
          <div style={{ marginRight: "1rem" }}>
            <CiMobile3 /> Mobile ticket{" "}
          </div>
          <div style={{ marginRight: "1rem" }}>
            {" "}
            <PiChatTextLight />
            Offered in: English <Link href={"/"}>and 5 more </Link>{" "}
          </div>
        </div>
        <Divder />
    
        <div>
          <Title title={"Overview"} />
          <p>{productDetails.description}</p>
        </div>
        <Divder />

        <div style={{ marginBottom: "2rem" }}>
          <Title title={"What's Included"} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <ul style={{ listStyleType: "none" }}>
                {productDetails.inclusions.map((item, index) => (
                  <li key={index}>
                    <IoCheckmark /> &nbsp;
                    {item.description || item.otherDescription}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <ul style={{ listStyleType: "none" }}>
                {productDetails.exclusions.map((item, index) => (
                  <li key={index}>
                    <HiMiniXMark /> &nbsp;
                    {item.otherDescription}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <Title title={"Additonal Info"} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <ul style={{ listStyleType: "none" }}>
                {productDetails.additionalInfo.map((item, index) => (
                  <li key={index}>
                    <IoCheckmark /> &nbsp;
                    {item.description || item.otherDescription}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ fontWeight: "bold" }}>
            Operated by{" "}
            <span style={{ color: "red" }}>{productDetails.supplier.name}</span>
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <Title title={"Cancellation policy"} />
          <div>{productDetails.cancellationPolicy.description}</div>
        </div>
      </div> */}
    </div>
  );
}
