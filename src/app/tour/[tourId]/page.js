import ProductDetails from "@/components/ProductsComponent/productDetails";
import { getProductByProductCode } from "@/services/apiServices";

const page = async ({ params }) => {
  const productResult = await getProductByProductCode(params.tourId);

  return (
    <>
      <div>
        <ProductDetails productDetails={productResult.data.data} />
      </div>
    </>
  );
};

export default page;
