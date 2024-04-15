import { addDataSolr, searchByIdDataSolr } from "@/helpers/solrHelpers";
import { apiGetCall, apiPostCall } from "@/services/thirdPartyApiService";
import { solrDataName } from "@/utils/constants";

export const getAllDestinationsController = async () => {
  try {
    const query = `q=dataName:${solrDataName.destinations}`;
    const searchSolrResult = await searchByIdDataSolr(query);
    if (searchSolrResult.status && searchSolrResult.isStale === false) {
      return {
        ...searchSolrResult,
        data: JSON.parse(searchSolrResult.data[0].data),
      };
    }
    const response = await apiGetCall(
      `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/destinations`
    );
    const transformedData = {
      id: "1",
      dataName: solrDataName.destinations,
      data: JSON.stringify(response.data),
      updatedAt: new Date(),
    };
    addDataSolr(transformedData);
    return {
      status: true,
      message: "Data found successfully",
      data: response.data,
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
  try {
    const query = `q=id:${reqBody.destinationId}&dataName:${solrDataName.destinationById}`;
    const searchSolrResult = await searchByIdDataSolr(query);

    if (searchSolrResult.status && searchSolrResult.isStale === false) {
      return {
        ...searchSolrResult,
        data: JSON.parse(searchSolrResult.data[0].data),
      };
    }
    const payload = {
      filtering: {
        destination: `${reqBody.destinationId}`,
      },
      currency: "INR",
    };
    const response = await apiPostCall(
      `${process.env.VIATOR_BASEURL}/partner/products/search`,
      payload
    );
    const transformedData = {
      id: reqBody.destinationId,
      dataName: solrDataName.destinationById,
      data: JSON.stringify({ products: response.products }),
      updatedAt: new Date(),
    };
    addDataSolr(transformedData);
    return {
      status: true,
      message: "Destination products fetched successfully",
      data: response.products,
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

export const getProductByCodeController = async (reqBody) => {
  try {
    const query = `q=id:${reqBody}&dataName:${solrDataName.productByProductCode}`;
    const searchSolrResult = await searchByIdDataSolr(query);
    if (searchSolrResult.status && searchSolrResult.isStale === false) {
      return {
        ...searchSolrResult,
        data: JSON.parse(searchSolrResult.data[0].data),
      };
    }
    const response = await apiGetCall(
      process.env.VIATOR_BASEURL + `/partner/products/${reqBody}`
    );
    const transformedData = {
      id: reqBody,
      dataName: solrDataName.productByProductCode,
      data: JSON.stringify(response),
      updatedAt: new Date(),
    };
    addDataSolr(transformedData);
    return {
      status: true,
      message: "Product details fetched successfully",
      data: response,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "getProductDetailsByProductCode controller failed",
      error: error,
    };
  }
};

export const getAttractionsByDestIdController = async (reqBody) => {
  try {
    const query = `q=id:${reqBody.destinationId}`;
    const searchSolrResult = await searchByIdDataSolr(query);
    console.log("ATT", searchSolrResult);
    if (searchSolrResult.status && searchSolrResult.isStale === false) {
      return {
        ...searchSolrResult,
        data: JSON.parse(searchSolrResult.data[0].data),
      };
    }
    const payload = {
      destId: reqBody.destinationId,
      topX: "",
      sortOrder: "RECOMMENDED",
    };
    const response = await apiPostCall(
      `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/attractions`,
      payload
    );
    const transformedData = {
      id: reqBody.destinationId,
      dataName: solrDataName.attractionsByDestId,
      data: JSON.stringify(response),
      updatedAt: new Date(),
    };
    // addDataSolr(transformedData);
    return {
      status: true,
      message: "Attractions fetched successfully",
      data: response,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "getProductDetailsByProductCode controller failed",
      error: error,
    };
  }
};
