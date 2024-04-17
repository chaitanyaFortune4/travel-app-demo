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

export const getDestinationByIdController = async (reqBody) => {
  console.log("REQB", reqBody);
  try {
    const response = await apiPostCall(
      `${process.env.VIATOR_BASEURL}/partner/products/search`,
      reqBody
    );
    const attReqBody = {
      destId: reqBody?.filtering?.destination,
      sortOrder: "RECOMMENDED",
    };
    const attractionData = await apiPostCall(
      `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/attractions`,
      attReqBody
    );
    // console.log("Res2", response);
    // const data = {
    //   id: reqBody.filtering.destination,
    //   products: response.products,
    // };
    // const result = await updateDataSolrDbController(data);
    // console.log("result", result);

    return {
      status: true,
      message: "Destination products fetched successfully",
      data: response.products,
      attractionData: attractionData.data,
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
    return resp;
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
