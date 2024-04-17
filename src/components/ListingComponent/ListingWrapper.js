import Products from "../ProductsComponent/products";
import AttractionsSection from "../AttractionComponent/AttractionsSection";
import { getDestinationById } from "@/services/apiServices";
import commonStyle from "../../assets/styles/common.module.scss"
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
    <div className={commonStyle["container"]}>
      <h2 className={commonStyle["medium-title"]}>Listing Page</h2>
      <Products products={result.data.data} />
      <AttractionsSection data={result.data.attractionData} />
    </div>
    </>
  );
};

export default ListingWrapper;
