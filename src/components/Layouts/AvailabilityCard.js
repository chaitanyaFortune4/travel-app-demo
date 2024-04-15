"use client";
import React, { useState } from "react";
import { HiMiniCheckCircle } from "react-icons/hi2";

const AvailabilityCard = ({ price = 0, travelers = 1, increseCount }) => {
  
  return (
    <div className="availability-card">
      <div className="card-header">
        <h3>From ₹{price} </h3>
        <p className="text-12">Price varies by group size</p>
      </div>
      <div
        style={{ textDecoration: "underline", marginBottom: "1rem" }}
        className="text-14"
      >
        Lowest Price Guarantee
      </div>
      <div className="form-group">
        <h2 style={{ marginBottom: "1rem" }}>Select Date and Travelers</h2>

        <div className="input-field">
          <input type="date" id="date" />
        </div>

        <div className="input-field">
          <input
            type="number"
            id="travelers"
            min="1"
            value={travelers}
            onChange={(e) => increseCount(e)}
          />
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
