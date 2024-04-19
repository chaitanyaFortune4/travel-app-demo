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
import style from "../../assets/styles/productDetail_page/productDetail.module.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductDetails({ productDetails }) {
  const [savedProductData, setSavedProductData] = useState();
  const [show, setShow] = useState(false);
  const handleClose1 = () => setShow(false);
  const handleShow1 = () => setShow(true);
  console.log("PROD", productDetails);

  console.log("Data", savedProductData);

  useEffect(() => {
    if (localStorage.getItem("product")) {
      setSavedProductData(JSON.parse(localStorage.getItem("product")));
    }
  }, []);
  const [travelers, setTravelers] = useState(1);

  const increseCount = () => {
    setTravelers((prev) => prev + 1);
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

  return (
    <div className={style["productDetail-container"]}>
      <div>
        <div>
          <Title title={productDetails?.title} />
          <div
            style={{
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <StarRating
                rating={productDetails.reviews?.combinedAverageRating}
              />
              {productDetails.reviews?.totalReviews} reviews
            </div>
          </div>
        </div>
        <div className={style["imageContentwrapper"]}>
          <div className={style["carousel-wrapper"]}>
            {productDetails?.images && (
              <ProductDetailsImageContainer images={productDetails?.images} />
            )}
          </div>{" "}
          <div style={{ marginInline: "1rem" }}>
            <AvailabilityCard
              price={savedProductData?.pricing?.summary?.fromPrice}
              travelers={travelers}
              increseCount={increseCount}
            />
          </div>
        </div>
        <div className={style["details-wrapper"]}>
          <Divder />
          <div className={style["details-section1"]}>
            <div>
              <LuClock3 /> 6 hours
            </div>
            <div>
              <CiMobile3 /> Mobile ticket{" "}
            </div>
            <div>
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

          <div className={style["details-section3"]}>
            <Title title={"What's Included"} />
            <div className={style["details-section3-content"]}>
              <div style={{ flex: 1 }}>
                <ul style={{ listStyleType: "none" }}>
                  {productDetails.inclusions?.slice(0, 3).map((item, index) => (
                    <li key={index}>
                      <IoCheckmark /> &nbsp;
                      {item.description || item.otherDescription}
                    </li>
                  ))}
                </ul>
                <div
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={handleShow1}
                >
                  See more..
                </div>
              </div>

              {/* <div style={{ flex: 1 }}>
                <ul style={{ listStyleType: "none" }}>
                  {productDetails.exclusions.map((item, index) => (
                    <li key={index}>
                      <HiMiniXMark /> &nbsp;
                      {item.otherDescription}
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>

          <Modal size="lg" show={show} onHide={handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title>What's Included</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={style["details-section3"]}>
                <div className={style["details-section3-content"]}>
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
            </Modal.Body>
          </Modal>

          <div className={style["details-section4"]}>
            <Title title={"Additonal Info"} />
            <div className={style["details-section4-content"]}>
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
              <span style={{ color: "red" }}>
                {productDetails.supplier.name}
              </span>
            </div>
          </div>

          <div className={style["details-section5"]}>
            <Title title={"Cancellation policy"} />
            <div>{productDetails.cancellationPolicy.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
