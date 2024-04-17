import Link from "next/link";
import React from "react";

const AttractionCard = ({ imageSrc, title, href = "" }) => {
  return (
    <Link href={href}>
      <div className="card">
        <img src={`${imageSrc}`} style={{ width: "100%", height: "100%" }} />
        <div className="overlay"></div>
        <p className="centered title">{title}</p>
      </div>
    </Link>
  );
};

export default AttractionCard;
