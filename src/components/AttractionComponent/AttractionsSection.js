"use client";
import React from "react";
import AttractionCard from "./AttractionCard";
import { Title } from "../Items/Title";

const AttractionsSection = ({ data }) => {
  // console.log("data", data[0]);

  return (
    <div style={{ margin: "5rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {data.length > 0 && <Title title={"Popular Attractions"} />}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {data.slice(0, 10).map((item, index) => (
          <AttractionCard
            key={index}
            title={item.title}
            imageSrc={item.thumbnailURL}
            href={item.pageUrlName}
          />
        ))}
      </div>
    </div>
  );
};

export default AttractionsSection;
