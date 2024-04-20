"use client";
import React, { useEffect, useState } from "react";
import { LuClock3, LuCopy, LuCopyCheck, LuMail } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import ProductDetailsImageContainer from "./productDetailsImageContainer";
import TravelersPhotosSection from "./travelersPhotosSection";
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
import SeeMoreModal from "./seeMoreModal";
import { NavDropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";
import copy from "clipboard-copy";

export default function ProductDetails({ data }) {
  const [travelers, setTravelers] = useState(1);
  const [infoModal, setInfoModal] = useState(false);
  const [productData, setProductData] = useState({});
  const [whatsIncludeModal, setWhatsIncludeModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  // console.log("data", data);

  useEffect(() => {
    let temData = localStorage.getItem("productData");
    setProductData(JSON.parse(temData));
  }, []);

  const onCkickChangeCount = (action) => {
    action === "add" ? setTravelers((p) => p + 1) : setTravelers((p) => p - 1);
  };

  const excludedItems = ["Room service", "Mini bar"];

  const RenderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <h6>Offered in:</h6>
      <p>German, English, Spanish</p>
    </Tooltip>
  );
  const SharePopUp = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      <h6>Offered in:</h6>
      <p>German, English, Spanish</p>
    </Tooltip>
  );
  const share = useRouter();
  const base = "http://localhost:3000";
  const links = base + share.asPath;
  const copyToClipboard = async (e) => {
    try {
      let url = window.location.href;
      await copy(url);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };
  function copyText(entryText) {
    console.log(navigator);
    navigator?.clipboard?.writeText(entryText);
  }

  return (
    <div className="product-details-page-container">
      <div className="title-content">
        <Title title={data?.title} />
        <Divder mrtop={false}/>
        <div className="flex space-between mb">
          <div className="flex rating-sec">
            <div className="flex mr">
              <StarRating rating={data?.reviews?.combinedAverageRating} />
              &nbsp;{data?.reviews?.totalReviews}
            </div>
            <div className="flex mr">
              <SlBadge /> &nbsp;Badge of Excellence
            </div>
            <div className="mr"> Corsica, France</div>
          </div>
          <div className="mr ">
            <NavDropdown
              title="Share"
              menuVariant="light"
              autoClose="outside"
              className="share-dropdown"
              
            >
              <NavDropdown.Item>
                <div onClick={copyToClipboard}>
                  {isCopied ? <LuCopyCheck /> : <LuCopy />} &nbsp;
                  {isCopied ? "Link Copied!" : "Copy Link"}
                </div>
              </NavDropdown.Item>

              <NavDropdown.Item><LuMail />&nbsp; Email</NavDropdown.Item>
            </NavDropdown>
            {/* <FaChevronDown /> */}
          </div>
        </div>
      </div>
      <div className="flex product-detail-view-point">
        <div>
          <ProductDetailsImageContainer data={data?.images} />
        </div>
        {/* <div style={{ marginInline: "1rem" }}> */}
        <AvailabilityCard
          price={productData?.pricing?.summary?.fromPrice}
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
              overlay={RenderTooltip}
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
