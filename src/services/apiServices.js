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
export const getDestinationBySeoId = async (seoId) => {
  try {
    const res = await axios.get(
      `${apiList.getDestinationBySeoId}?seoId=${seoId}`
    );
    return res;
  } catch (error) {
    console.log("getDestinationById", error);
    throw error;
  }
};
