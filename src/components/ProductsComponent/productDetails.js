"use client";
import React, { useState } from "react";
import { LuShare, LuClock3 } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { FaChevronDown } from "react-icons/fa";
import ProductDetailsImageContainer from "./ProductDetailsImageContainer";
import TravelersPhotosSection from "./TravelersPhotosSection";
import SeeMoreModal from "./SeeMoreModal.js";
import { CiMobile3 } from "react-icons/ci";
import { PiChatTextLight } from "react-icons/pi";
import { HiMiniXMark } from "react-icons/hi2";
import { IoCheckmark } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { Title } from "../Items/Title";
import { Divder } from "../Items/Divder";
import AvailabilityCard from "../Layouts/AvailabilityCard";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import StarRating from "../common/starRating";

export default function ProductDetails({ data }) {
  const [travelers, setTravelers] = useState(1);
  const [infoModal, setInfoModal] = useState(false);
  const [whatsIncludeModal, setWhatsIncludeModal] = useState(false);
  // console.log("data", data);
  const onCkickChangeCount = (action) => {
    action === "add" ? setTravelers((p) => p + 1) : setTravelers((p) => p - 1);
  };

  const excludedItems = ["Room service", "Mini bar"];

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <h6>Offered in:</h6>
      <p>German, English, Spanish</p>
    </Tooltip>
  );

  return (
    <div className="product-details-page-container">
      <div className="title-content">
        <Title title={data?.title} />
        <div className="flex space-between mb">
          <div className="flex">
            <div className="flex mr">
              <StarRating rating={5} />
              &nbsp;
              {data?.reviews?.totalReviews} Reviews
            </div>
            <div className="flex mr">
              <SlBadge /> Badge of Excellence
            </div>
            <div className="mr"> Corsica, France</div>
          </div>
          <div>
            <LuShare /> Share <FaChevronDown />
          </div>
        </div>
      </div>
      <div className="flex product-detail-view-point">
        <div>
          <ProductDetailsImageContainer data={data?.images} />
        </div>
        {/* <div style={{ marginInline: "1rem" }}> */}
        <AvailabilityCard
          price={"2,966.11"}
          travelers={travelers}
          onCkickChangeCount={onCkickChangeCount}
        />
        {/* </div> */}
      </div>
      <div className="content">
        <Divder />
        <div className="flex">
          <div className="flex mr">
            <LuClock3 color="#008768" />
            &nbsp;6 hours
          </div>
          <div className="flex mr">
            <CiMobile3 color="#008768" />
            &nbsp;Mobile ticket
          </div>
          <div className="flex mr">
            <PiChatTextLight color="#008768" />
            &nbsp;Offered in: English &nbsp;
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
              className="and-more"
            >
              <div className="and-more">and 5 more</div>
            </OverlayTrigger>
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
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="included-section"
          >
            <div style={{ flex: 1 }}>
              <ul>
                {data?.inclusions.slice(0, 3).map((item, index) => (
                  <li key={index}>
                    <IoCheckmark /> &nbsp;
                    {item.description
                      ? item.description
                      : item.otherDescription}
                  </li>
                ))}
              </ul>
              {data?.inclusions?.length > 3 && (
                <div
                  className="and-more"
                  onClick={() => setWhatsIncludeModal(true)}
                >
                  see {data?.inclusions?.length - 3} more
                </div>
              )}
            </div>
            <div style={{ flex: 1 }} className="excluded">
              <ul>
                {excludedItems.map((item, index) => (
                  <li key={index}>
                    <HiMiniXMark /> &nbsp;
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <SeeMoreModal
            title={"What's Included"}
            show={whatsIncludeModal}
            onHide={() => setWhatsIncludeModal(false)}
            body={
              <div className="included-section">
                <div style={{ flex: 1 }}>
                  <ul>
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
                <div style={{ flex: 1 }} className="excluded">
                  <ul>
                    {excludedItems.map((item, index) => (
                      <li key={index}>
                        <HiMiniXMark /> &nbsp;
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
          />
        </div>
        <Divder />
        <div>
          <Title title={"Additional Info"} />
          <ul style={{ paddingInline: "1rem" }}>
            {data?.additionalInfo?.slice(0, 3).map((item, index) => (
              <li style={{ marginBottom: "1rem" }} key={index}>
                <BsDot /> &nbsp;{item.description}{" "}
              </li>
            ))}
          </ul>
          {data?.additionalInfo?.length > 3 && (
            <div className="and-more" onClick={() => setInfoModal(true)}>
              see {data?.additionalInfo?.length - 3} more
            </div>
          )}
          <SeeMoreModal
            title={"Additional Info"}
            show={infoModal}
            onHide={() => setInfoModal(false)}
            body={
              <ul style={{ paddingInline: "1rem" }}>
                {data?.additionalInfo?.map((item, index) => (
                  <li style={{ marginBottom: "1rem" }} key={index}>
                    <BsDot /> &nbsp;{item.description}
                  </li>
                ))}
              </ul>
            }
          />
        </div>
        <Divder />
        <TravelersPhotosSection data={data?.images} />
        <Divder />
      </div>
    </div>
  );
}
