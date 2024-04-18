import React from "react";
import ListingWrapper from "@/components/ListingComponent/ListingWrapper";
import { postApiData } from "@/services/thirdPartyApiService";
import { apiList } from "@/utils/constants";

const page = async ({ params }) => {
  let { slug } = params;
  let payload = {
    "destinationId": `${slug}`
  }
  let response = await postApiData(apiList.getDestinationById, payload)
  return (
    <div>
      <ListingWrapper data={response} />
    </div>
  );
};

export default page;
