"use client";
import React, { useEffect, useRef, useState } from "react";
import { HiMiniCheckCircle } from "react-icons/hi2";
import DropdownItem from "./DropdownItem";
import RoundedButton from "../Items/RoundedButton";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";

const AvailabilityCard = ({ price = 0, travelers = 1, onCkickChangeCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to handle click outside dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Effect to add click event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const applyChanges = () => {
    setIsOpen(false);
    togglePopup(false);
  };

  return (
    <div className="availability-card">
      <div className="card-header">
        <h4>From ₹{price} </h4>
        <p className="text-12">Price varies by group size</p>
      </div>
      <div
        style={{ textDecoration: "underline", marginBottom: "1rem" }}
        className="text-14"
      >
        Lowest Price Guarantee
      </div>
      <div className="form-group">
        <h4 style={{ marginBottom: "1rem" }}>Select Date and Travelers</h4>

        <div className="input-field">
          <input type="date" id="date" className="input" />
        </div>

        <div className="input-field">
          <div style={{ position: "relative" }}>
            <div onClick={togglePopup} className="input flex ">
              <IoPersonOutline />
              &nbsp;{travelers}
            </div>
            {isOpen && (
              <div className="popup">
                <div className="popup-content">
                  <div className="flex space-between pricing-row">
                    <div>age</div>
                    <div className="flex space-between mb">
                      <RoundedButton
                        onClick={() => onCkickChangeCount("remove")}
                        disabled={travelers === 1}
                      >
                        <AiOutlineMinusCircle
                          size={25}
                          color={`${travelers === 1 ? "" : "#008768"}`}
                        />
                      </RoundedButton>
                      <span className="">&nbsp;{travelers}&nbsp;</span>
                      <RoundedButton onClick={() => onCkickChangeCount("add")}>
                        &nbsp;<AiOutlinePlusCircle size={25} color="#008768" />
                      </RoundedButton>
                    </div>
                  </div>
                  <button onClick={applyChanges} className="submit-btn">
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <button className="submit-btn">Check Availability</button>
      <div className="note">
        <HiMiniCheckCircle color="#008768" /> Note: Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </div>
    </div>
  );
};

export default AvailabilityCard;
