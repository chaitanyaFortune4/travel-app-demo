"use client";
import Image from "next/image";
import React from "react";
import CustomImage from "../CommonComponent/CustomImage";

export default function AttractionCard({ imageSrc, title, onClick }) {
  return (
    <>
      <div className="card" onClick={onClick}>
        <CustomImage src={imageSrc} height={250} width={250} alt="image" />
        <div className="overlay"></div>
        <p className="centered title">{title}</p>
      </div>
    </>
  );
}
