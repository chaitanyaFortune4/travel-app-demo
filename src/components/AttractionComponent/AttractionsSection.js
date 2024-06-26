"use client";
import React from "react";
import AttractionCard from "./AttractionCard";
import { Title } from "../Items/Title";
import { useRouter } from "next/navigation";

const AttractionsSection = ({ data }) => {
  const router = useRouter();
  const onClickAttractionCard = (pageUrlName, seoId) => {
    localStorage.setItem("seo", seoId);
    router.push(`/attractions/${pageUrlName}/${seoId}`);
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {data.length > 0 && <Title title={"Popular Attractions"} />}
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.slice(0, 10).map((item, index) => (
          <AttractionCard
            key={index}
            title={item.title}
            imageSrc={item.thumbnailURL}
            onClick={() => onClickAttractionCard(item.pageUrlName, item.seoId)}
          />
        ))}
      </div>
    </div>
  );
};

export default AttractionsSection;
