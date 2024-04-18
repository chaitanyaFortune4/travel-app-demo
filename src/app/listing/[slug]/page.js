import React from "react";
import { postApiData } from "@/services/thirdPartyApiService";
import { apiList } from "@/utils/constants";
import ProductListingWrapper from "@/components/productListing/productListingWrapper";

const page = async ({ params }) => {
  let { slug } = params;
  let payload = {
    "destinationId": `${slug}`
  }
  let response = await postApiData(apiList.getDestinationById, payload)
  return (
    <div>
      <ProductListingWrapper data={response} />
    </div>
  );
};

export default page;
