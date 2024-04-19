import ProductDetails from "@/components/ProductsComponent/productDetails";
import { getProductByProductCode } from "@/services/apiServices";
import Link from "next/link";

const page = async ({ params }) => {
  const productResult = await getProductByProductCode(params.tourId);

  return (
    <>
      <div
        style={{ marginBottom: "2rem", textAlign: "center", cursor: "pointer" }}
      >
        <Link style={{ textDecoration: "none", color: "inherit" }} href="/">
          <h1>Travel App Demo</h1>
        </Link>
      </div>
      <div>
        <ProductDetails productDetails={productResult.data.data} />
      </div>
    </>
  );
};

export default page;
