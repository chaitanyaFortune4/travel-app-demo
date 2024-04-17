"use client";
import AttractionWrapper from "@/components/AttractionComponent/AttractionWrapper";
import React, { useEffect, useState } from "react";

const page = () => {
  const [seoId, setseoId] = useState("");
  useEffect(() => {
    let val = localStorage.getItem("seoId");
    setseoId(val);
  }, []);
  return (
    <div>
      <AttractionWrapper seoId={seoId} />
    </div>
  );
};

export default page;
