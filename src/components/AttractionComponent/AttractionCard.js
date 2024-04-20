import Image from "next/image";
import Link from "next/link";
import React from "react";

const AttractionCard = ({ imageSrc, title, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <Image src={`${imageSrc}`} width={200} height={200} alt="image" />
      <div className="overlay"></div>
      <p className="centered title">{title}</p>
    </div>
  );
};

export default AttractionCard;
