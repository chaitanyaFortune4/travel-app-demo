import {
  addDataSolr,
  searchByIdDataSolr,
  updateDataSolr,
} from "@/helpers/solrHelpers";
import { apiGetCall, apiPostCall } from "@/services/thirdPartyApiService";
import { solrDataName } from "@/utils/constants";

export const getAllDestinationsController = async () => {
  try {
    const query = `q=id:1&dataName:${solrDataName.allDestinations}`;
    const searchSolrResult = await searchByIdDataSolr(query);

    if (searchSolrResult.status) {
      return {
        ...searchSolrResult,
        data: JSON.parse(searchSolrResult.data[0].destinationsList),
      };
    }
    const response = await apiGetCall(
      `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/destinations`
    );
    const transformedData = {
      id: "1",
      dataName: solrDataName.allDestinations,
      destinationsList: JSON.stringify(response.data),
      time_to_live_s: "+1DAY",
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
    const payload = {
      filtering: {
        destination: `${reqBody.destinationId}`,
      },
      currency: "INR",
    };
    const query = `q=id:${reqBody.destinationId}&dataName:${solrDataName.destinationById}`;
    const searchSolrResult = await searchByIdDataSolr(query);
    if (searchSolrResult.status) {
      if (searchSolrResult.data[0].hasOwnProperty("destinationDetails")) {
        return {
          ...searchSolrResult,
          data: JSON.parse(searchSolrResult.data[0].destinationDetails),
        };
      } else {
        const response = await apiPostCall(
          `${process.env.VIATOR_BASEURL}/partner/products/search`,
          payload
        );

        const existingData = searchSolrResult.data[0];
        // Exclude the _version_ field from the existing data
        const { _version_, expire_at_dt, ...dataWithoutVersion } = existingData;
        const transformedData = {
          ...dataWithoutVersion,
          destinationDetails: JSON.stringify(response.products),
        };

        addDataSolr(transformedData);
        return {
          status: true,
          message: "Destination products fetched successfully",
          data: response.products,
        };
      }
    }
    const response = await apiPostCall(
      `${process.env.VIATOR_BASEURL}/partner/products/search`,
      payload
    );
    const transformedData = {
      id: reqBody.destinationId,
      dataName: solrDataName.destinationById,
      destinationDetails: JSON.stringify({ products: response.products }),
      time_to_live_s: "+1DAY",
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
    if (searchSolrResult.status) {
      return {
        ...searchSolrResult,
        data: JSON.parse(searchSolrResult.data[0].productDetails),
      };
    }
    const response = await apiGetCall(
      process.env.VIATOR_BASEURL + `/partner/products/${reqBody}`
    );
    const transformedData = {
      id: reqBody,
      dataName: solrDataName.productByProductCode,
      productDetails: JSON.stringify(response),
      time_to_live_s: "+1DAY",
    };
    addDataSolr(transformedData);
    return {
      status: true,
      message: "Product details fetched successfully",
      data: response,
    };
  } catch (error) {
    console.log("getProductDetailsByProductCode error", error);
    return {
      status: false,
      message: "getProductDetailsByProductCode controller failed",
      error: error,
    };
  }
};

export const getAttractionsByDestIdController = async (reqBody) => {
  try {
    const payload = {
      destId: reqBody.destinationId,
      topX: "",
      sortOrder: "RECOMMENDED",
    };
    const query = `q=id:${reqBody.destinationId}`;
    const searchSolrResult = await searchByIdDataSolr(query);
    if (searchSolrResult.status) {
      if (searchSolrResult.data[0].hasOwnProperty("attractionsList")) {
        return {
          ...searchSolrResult,
          data: JSON.parse(searchSolrResult.data[0].attractionsList),
        };
      } else {
        const response = await apiPostCall(
          `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/attractions`,
          payload
        );
        const existingData = searchSolrResult.data[0];
        // Exclude the _version_ field from the existing data
        const { _version_, expire_at_dt, ...dataWithoutVersion } = existingData;
        const transformedData = {
          ...dataWithoutVersion,
          attractionsList: JSON.stringify(response.data),
        };
        addDataSolr(transformedData);
        return {
          status: true,
          message: "Attractions fetched successfully",
          data: response.data,
        };
      }
    }
    const response = await apiPostCall(
      `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/attractions`,
      payload
    );
    const transformedData = {
      id: reqBody.destinationId,
      dataName: solrDataName.destinationById,
      attractionsList: JSON.stringify(response.data),
      time_to_live_s: "+1DAY",
    };
    addDataSolr(transformedData);
    return {
      status: true,
      message: "Attractions fetched successfully",
      data: response.data,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "getAttractionByDestId controller failed",
      error: error,
    };
  }
};

export const getAttractionsBySeoIdController = async (reqBody) => {
  try {
    const query = `q=id:${reqBody}&dataName:${solrDataName.attractionBySeoId}`;
    const searchSolrResult = await searchByIdDataSolr(query);
    if (searchSolrResult.status) {
      return {
        ...searchSolrResult,
        data: JSON.parse(searchSolrResult.data[0].attractionDetails),
      };
    }
    const response = await apiGetCall(
      process.env.VIATOR_BASEURL +
        `/partner/v1/attraction/products?seoId=${reqBody}`
    );
    const transformedData = {
      id: reqBody,
      dataName: solrDataName.attractionBySeoId,
      attractionDetails: JSON.stringify(response.data),
      time_to_live_s: "+1DAY",
    };
    addDataSolr(transformedData);
    return {
      status: true,
      message: "Attraction details fetched successfully",
      data: response.data,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "getAttractionDetailsBySeoId controller failed",
      error: error,
    };
  }
};
