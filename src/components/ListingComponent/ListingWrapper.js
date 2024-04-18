'use client'
import Products from "../ProductsComponent/products";
import AttractionsSection from "../AttractionComponent/AttractionsSection";
import commonStyle from "../../assets/styles/common.module.scss"
const ListingWrapper = async ({ data }) => {
  return (
    <>
      <div className={commonStyle["container"]}>
        <h2 className={commonStyle["medium-title"]}>Listing Page</h2>
        <Products products={data.product} />
        <AttractionsSection attraction={data.attraction}  />
      </div>
    </>
  );
};

export default ListingWrapper;
