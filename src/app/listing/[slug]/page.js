"use client";
import ListingWrapper from "@/components/ListingComponent/ListingWrapper";
import React, { useEffect, useState } from "react";

const page = () => {
  const [destinationId, setDestinationId] = useState("");
    let val = localStorage.getItem("destinationId");
  // useEffect(() => {
  //   console.log('val--------',val)
  //   setDestinationId(val);
  // }, []);
  return (
    <div>
      <ListingWrapper destinationId={val} />
    </div>
  );
};

export default page;
