import React from "react";
import { FaRegHeart } from "react-icons/fa";

const CardSwiperItem = ({ image, location, title, rating, price }) => {
  return (
    <div
      style={{
        width: "250px",
        height: "350px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <FaRegHeart />
        </div>
      </div>
      <div style={{ padding: "10px", fontSize: "14px", color: "#888" }}>
        {location}
      </div>
      <div style={{ padding: "10px", fontSize: "18px", fontWeight: "bold" }}>
        {title}
      </div>
      <div style={{ padding: "10px", fontSize: "16px" }}>{rating}</div>
      <div
        style={{
          padding: "10px",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#007bff",
        }}
      >
        {price}
      </div>
    </div>
  );
};

export default CardSwiperItem;
