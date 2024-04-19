import Products from "../ProductsComponent/products";
import AttractionsSection from "../AttractionComponent/AttractionsSection";
import { getDestinationById } from "@/services/apiServices";
import commonStyle from "../../assets/styles/common.module.scss";
const ListingWrapper = async ({
  destinationName,
  destinationDetails,
  attractionsList,
}) => {
  return (
    <>
      <div className={commonStyle["container"]}>
        <h2 className={commonStyle["medium-title"]}>{destinationName} Tours</h2>
        <Products products={destinationDetails} />
        <AttractionsSection data={attractionsList} />
      </div>
    </>
  );
};

export default ListingWrapper;
