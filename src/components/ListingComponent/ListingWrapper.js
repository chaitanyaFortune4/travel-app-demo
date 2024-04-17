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
<<<<<<< HEAD
    <div className={commonStyle["container"]}>
      <h2 className={commonStyle["medium-title"]}>Listing Page</h2>
=======
      <h1 className="m-5">listing page</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
>>>>>>> 05a449790f9d6c6a5745cf20cf53a69a37da80e7
      <Products products={result.data.data} />
      <AttractionsSection data={result.data.attractionData} />
    </div>
    </>
  );
};

export default ListingWrapper;
