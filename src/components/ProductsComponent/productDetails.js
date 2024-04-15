'use client'
import React, { useState } from "react";
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

export default function ProductDetails({ dataa }) {
  const [travelers, setTravelers] = useState(1);
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
            {" "}
            <GoStarFill /> 37 Reviews
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
          <ProductDetailsImageContainer />
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
            Offered in: English <Link href={"/"}>and 5 more </Link>{" "}
          </div>
        </div>
        <Divder />
        {/* <Title title={"Explore our promoted experiences"} /> */}
        <div>
          <Title title={"Overview"} />
          <p>
            Enjoy personalized attention and a flexible itinerary on this
            private tour of Mumbai. With a dedicated guide in the lead, visit
            Mumbai highlights such as Taj Mahal Palace Hotel, the Gateway of
            India, Tower of Silence, and others. Listen to engaging commentary
            from your guide on the history, culture, and architecture of Mumbai
            as you travel. Read more about Private Mumbai Sightseeing Tour
            (Traveller's Choice Award Winner) -
            https://www.viator.com/tours/Mumbai/Private-Full-Day-Mumbai-Sightseeing-Tour/d953-34181P6?mcid=56757
          </p>
        </div>
        <Divder />

        <div>
          <Title title={"What's Included"} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ flex: 1 }}>
              <ul style={{ listStyleType: "none" }}>
                {includedItems.map((item, index) => (
                  <li key={index}>
                    <IoCheckmark /> &nbsp;
                    {item}
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
      </div>
    </div>
  );
}
