import Link from "next/link";
import React from "react";

const AttractionCard = ({ imageSrc, title, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={`${imageSrc}`} style={{ width: "100%", height: "100%" }} />
      <div className="overlay"></div>
      <p className="centered title">{title}</p>
    </div>
  );
};

export default AttractionCard;
