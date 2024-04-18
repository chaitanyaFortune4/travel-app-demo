import { apiList } from "@/utils/constants";
import axios from "axios";

export const getAllDestinations = async () => {
  try {
    const destinations = await axios.get(apiList.getAllDestinations);
    return destinations;
  } catch (error) {
    console.log("allDestinations Error", error);
    throw error;
  }
};

export const getDestinationById = async (destinationParams) => {
  try {
    const destinationById = await axios.post(
      apiList.getDestinationById,
      destinationParams
    );
    return destinationById;
  } catch (error) {
    console.log("getDestinationById", error);
    throw error;
  }
};

export const getAttractionsByDestId = async (destinationParams) => {
  try {
    const attractionByDestId = await axios.post(
      apiList.getAttractionsByDestId,
      destinationParams
    );
    return attractionByDestId;
  } catch (error) {
    console.log("getAttractionByDestId", error);
    throw error;
  }
};

export const getProductByProductCode = async (productCode) => {
  try {
    const productByProductCode = await axios.get(
      `${apiList.getProductDetailsByProductCode}${productCode}`
    );
    return productByProductCode;
  } catch (error) {
    console.log("productByProductCode", error);
    throw error;
  }
};

export const getAttractionsBySeoId = async (seoId) => {
  try {
    const attractionBySeoId = await axios.get(
      `${apiList.getAttractionBySeoId}${seoId}`
    );
    return attractionBySeoId;
  } catch (error) {
    console.log("attractionBySeoId", error);
    throw error;
  }
};
