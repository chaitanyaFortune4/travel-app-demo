import { postApiData } from "@/services/thirdPartyApiService";
import { apiList } from "./constants";

export const eventTrigger = async (data) => {
    let mobile = localStorage.getItem("mobile");
    let payload = {
        id: data.productCode,
        name: data.title,
        mobile: mobile,
    };
    await postApiData(apiList.addTracksdata, payload);
};