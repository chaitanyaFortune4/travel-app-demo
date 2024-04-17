"use client";
import ListingWrapper from "@/components/ListingComponent/ListingWrapper";
import React, { useEffect, useState } from "react";

const page = () => {
  const [destinationId, setDestinationId] = useState("");
  useEffect(() => {
    let val = localStorage.getItem("destinationId");
    setDestinationId(val);
  }, []);
  return (
    <div>
      <ListingWrapper destinationId={destinationId} />
    </div>
  );
};

export default page;
