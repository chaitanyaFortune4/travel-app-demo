"use client";
import React, { useState } from "react";
import { LuShare, LuClock3 } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { GoStarFill } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
import ProductDetailsImageContainer from "./ProductDetailsImageContainer";
import TravelersPhotosSection from "./TravelersPhotosSection";
// import data from "../../utils/dummyData.json";
import { CiMobile3 } from "react-icons/ci";
import { PiChatTextLight } from "react-icons/pi";
import { HiMiniXMark } from "react-icons/hi2";
import { IoCheckmark } from "react-icons/io5";

import Link from "next/link";
import { Title } from "../Items/Title";
import { Divder } from "../Items/Divder";
import AvailabilityCard from "../Layouts/AvailabilityCard";
import { Button } from "react-bootstrap";
import Image from "next/image";

export default function ProductDetails({ data }) {
  const [travelers, setTravelers] = useState(1);
  console.log("data", data);
  const increseCount = (e) => {
    setTravelers(e.target.value);
  };
  const includedItems = [
    "Daily breakfast",
    "Free WiFi access",
    "Access to gym facilities",
    "Complimentary toiletries",
  ];

  const excludedItems = ["Room service", "Mini bar"];

  return (
    <div style={{ marginTop: "5rem", marginLeft: "8rem", marginRight: "8rem" }}>
      <Title title={data?.title} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "1rem" }}>
            <GoStarFill /> {data?.reviews?.totalReviews} Reviews
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
          <ProductDetailsImageContainer data={data?.images} />
        </div>{" "}
        <div style={{ marginInline: "1rem" }}>
          <AvailabilityCard
            price={"2,966.11"}
            travelers={travelers}
            increseCount={increseCount}
          />
        </div>
      </div>
      <div style={{ paddingInline: "10rem" }}>
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
            Offered in: English{" "}
            <Link href={"/"} className="and-more">
              and 5 more{" "}
            </Link>{" "}
          </div>
        </div>
        <Divder />
        {/* <Title title={"Explore our promoted experiences"} /> */}
        <div>
          <Title title={"Overview"} />
          <p>{data?.description}</p>
        </div>
        <Divder />

        <div>
          <Title title={"What's Included"} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <ul style={{ listStyleType: "none" }}>
                {data?.inclusions.map((item, index) => (
                  <li key={index}>
                    <IoCheckmark /> &nbsp;
                    {item.description
                      ? item.description
                      : item.otherDescription}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <ul style={{ listStyleType: "none" }}>
                {excludedItems.map((item, index) => (
                  <li key={index}>
                    <HiMiniXMark /> &nbsp;
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Divder />
        <div>
          <Title title={"Additional Info"} />
          <ul style={{ paddingInline: "1rem" }}>
            {data?.additionalInfo?.map((item, index) => (
              <li style={{ marginBottom: "1rem" }} key={index}>
                {item.description}
              </li>
            ))}
          </ul>
        </div>
        <Divder />
        <TravelersPhotosSection data={data?.images} />
        <Divder />
      </div>
    </div>
  );
}
