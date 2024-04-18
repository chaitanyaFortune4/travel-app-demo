import { apiGetCall, apiPostCall } from "@/services/thirdPartyApiService";
import { transformData } from "@/utils/common";

export const getAllDestinationsController = async () => {
  try {
    // const searchSolrResult = await searchAllDataSolrDbController();
    // if (searchSolrResult.status && searchSolrResult.isStale === false) {
    //   return searchSolrResult;
    // }
    const response = await apiGetCall(
      `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/destinations`
    );
    const transformedData = transformData(response.data);
    // addDataSolrDbController(transformedData);
    return {
      status: true,
      message: "Data found successfully",
      data: transformedData,
    };
  } catch (error) {
    console.log("getAllDestinationController error", error);
    return {
      status: false,
      message: "getAllDestinations controller failed",
      error: error,
    };
  }
};

export const getDestinationByIdController = async (id) => {
  try {
    let payload = {
      "filtering": {
        "destination": `${id}`
      },
      "currency": "INR"
    }
    const responseSearchProduct = await apiPostCall(
      `${process.env.VIATOR_BASEURL}/partner/products/search`,
      payload
    );
    const attReqBody = {
      destId: id,
      sortOrder: "RECOMMENDED",
    };
    const attractionData = await apiPostCall(
      `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/attractions`,
      attReqBody
    );
    function modifyResponse(originalResponse) {
      const modifiedProducts = originalResponse?.products?.map(product => {
        const modifiedProduct = {
          productCode: product.productCode,
          title: product.title,
          description: product.description,
          images: [
            {
              imageSource: product.images[0].imageSource,
              caption: product.images[0].caption,
              isCover: product.images[0].isCover,
              variants: [
                {
                  height: 160,
                  width: 240,
                  url: product.images[0].variants[8].url // Using the 400x400 variant
                }
              ]
            }
          ],
          duration: {
            variableDurationFromMinutes: product.duration?.variableDurationFromMinutes,
            variableDurationToMinutes: product.duration?.variableDurationToMinutes
          },
          pricing: {
            summary: {
              fromPrice: product.pricing.summary.fromPrice,
              fromPriceBeforeDiscount: product.pricing.summary.fromPriceBeforeDiscount
            },
            currency: product.pricing.currency
          },
          flags: product.flags
        };
        return modifiedProduct;
      });
      return modifiedProducts;
    }
    const modifiedResponse = modifyResponse(responseSearchProduct);
    function modifyAttraction(data) {
      const modifiedAttractions = data.data.map(item => {
        const modifiedArrraction = {
          sortOrder: item.sortOrder,
          pageUrlName: item.pageUrlName,
          seoId: item.seoId,
          thumbnailURL: item.thumbnailURL,
          title: item.title
        }
        return modifiedArrraction;
      })
      return modifiedAttractions
    }
    const modifiedAttractionResponse = modifyAttraction(attractionData)
    return {
      status: true,
      message: "Destination products fetched successfully",
      productList: modifiedResponse,
      attractionData: modifiedAttractionResponse
    };
  } catch (error) {
    console.log("getDestinationById error", error);
    return {
      status: false,
      message: "getDestinationById controller failed",
      error: error,
    };
  }
};

export const getProductdetailsByID = async (req) => {
  const params = req.nextUrl.searchParams;
  let id = params.get("query");
  try {
    const resp = await apiGetCall(
      process.env.VIATOR_BASEURL + `/partner/products/${id}`
    );
    await resp.images.forEach(image => {
      image.variants = image.variants.find(variant => variant.height === 446);
    });
    let modifyProduct = {
      productCode: resp.productCode,
      title: resp.title,
      priceInfo: resp.pricingInfo,
      images: resp.images,
      description: resp.description,
      inclusions: resp.inclusions,
      additionalInfo: resp.additionalInfo,
      cancellationPolicy: resp.cancellationPolicy,
      reviews: resp.reviews
    }
    return modifyProduct;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAttractionController = async (seoId) => {
  try {
    const response = await apiGetCall(
      `${process.env.VIATOR_BASEURL}/partner/v1/attraction/products?seoId=${seoId}`
    );
    return {
      status: true,
      message: "Data found successfully",
      data: response,
    };
  } catch (error) {
    console.log("getAttractionController error", error);
    return {
      status: false,
      message: "getAttractions controller failed",
      error: error,
    };
  }
};