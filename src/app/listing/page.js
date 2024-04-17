"use client";
import ListingWrapper from "@/components/ListingComponent/ListingWrapper";
import { usePathname } from "next/navigation";
import React from "react";

const page = () => {
  const pathname = usePathname();
  const destinationName = pathname;
  console.log(destinationName);
  return (
    <div>
      <ListingWrapper destination={destinationName} />
    </div>
  );
};

export default page;
