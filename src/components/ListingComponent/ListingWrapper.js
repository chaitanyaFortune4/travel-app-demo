import Products from "../ProductsComponent/products";
import AttractionsSection from "../AttractionComponent/AttractionsSection";
import { getDestinationById } from "@/services/apiServices";

const ListingWrapper = async ({ destinationId }) => {
  const selectedDestinationObj = {
    filtering: {
      destination: destinationId,
    },
    currency: "INR",
  };
  const result = await getDestinationById(selectedDestinationObj);
  console.log("result", result.data.attractionData);

  return (
    <>
      <h1>listing page</h1>
      <Products products={result.data.data} />
      <AttractionsSection data={result.data.attractionData} />
    </>
  );
};

export default ListingWrapper;
