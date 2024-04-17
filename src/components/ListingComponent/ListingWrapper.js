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

  return (
    <>
      <h1 className="m-5">listing page</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Products products={result.data.data} />
      <AttractionsSection data={result.data.attractionData} />
    </>
  );
};

export default ListingWrapper;
