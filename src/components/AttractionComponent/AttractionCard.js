import Image from "next/image";
import Link from "next/link";
import React from "react";
import CustomImage from "../CommonComponent/CustomImage";

const AttractionCard = ({ imageSrc, title, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <CustomImage height={150} width={240} src={`${imageSrc}`} alt="image" />
      <div className="overlay"></div>
      <p className="centered title">{title}</p>
    </div>
  );
};

export default AttractionCard;
