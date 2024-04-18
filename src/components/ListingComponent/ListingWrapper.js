import Products from "../ProductsComponent/products";
import AttractionsSection from "../AttractionComponent/AttractionsSection";
import { getDestinationById } from "@/services/apiServices";
import commonStyle from "../../assets/styles/common.module.scss";
const ListingWrapper = async ({ destinationDetails, attractionsList }) => {
  return (
    <>
      <div className={commonStyle["container"]}>
        <h2 className={commonStyle["medium-title"]}>Listing Page</h2>

        <h1 className="m-5">listing page</h1>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        <Products products={destinationDetails} />
        <AttractionsSection data={attractionsList} />
      </div>
    </>
  );
};

export default ListingWrapper;
