import { transformData } from "@/utils/common";
import {
  addDataSolrDbController,
  searchAllDataSolrDbController,
  updateDataSolrDbController,
} from "./solrApisController";
import { apiGetCall, apiPostCall } from "@/services/thirdPartyApiService";

export const getAllDestinationsController = async () => {
  try {
    const searchSolrResult = await searchAllDataSolrDbController();
    if (searchSolrResult.status && searchSolrResult.isStale === false) {
      return searchSolrResult;
    }
    const response = await apiGetCall(
      `${process.env.VIATOR_BASEURL}/partner/v1/taxonomy/destinations`
    );
    const transformedData = transformData(response.data);
    addDataSolrDbController(transformedData);
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

    // console.log("Res2", response);

    const data = {
      id: reqBody.filtering.destination,
      products: response.products,
    };

    const result = await updateDataSolrDbController(data);
    console.log("result", result);
  } catch (error) {
    console.log("getDestinationById", error);
  }
};
