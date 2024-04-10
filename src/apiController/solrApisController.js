import { client } from "@/db/config";

export const addDataSolrDbController = async (reqBody) => {
  try {
    const solrResponse = await client.add(reqBody);
    // console.log("Solr response:", solrResponse.responseHeader);
    return { status: true, message: "Data added succesfully" };
  } catch (err) {
    console.log("addDataSolrDbController", err);
    return { status: false, message: "Internal Solr server error" };
  }
};

export const deleteAllDataSolrDbController = async () => {
  try {
    const solrResponse = await client.deleteAll();
    //   console.log("Solr response:", solrResponse.responseHeader);
    return { status: true, message: "All data deleted succesfully" };
  } catch (err) {
    console.log("addDataSolrDbController", err);
    return { status: false, message: "Internal Solr server error" };
  }
};

export const searchDataSolrDbController = async () => {
  try {
    const solrResponse = await client.searchAll();
    console.log("Solr response:", solrResponse);
    return {
      status: true,
      message: "Data found succesfully",
      data: solrResponse.response,
    };
  } catch (err) {
    console.log("searchDataSolrDbController", err);
    return { status: false, message: "Internal Solr server error" };
  }
};

export const searchByIdDataSolrDbController = async () => {
  try {
    const query = "q=*:*";
    const solrResponse = await client.search();
    console.log("Solr response:", solrResponse);
    return {
      status: true,
      message: "Data found succesfully",
      data: solrResponse.response,
    };
  } catch (err) {
    console.log("searchDataSolrDbController", err);
    return { status: false, message: "Internal Solr server error" };
  }
};
