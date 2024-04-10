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

export const searchAllDataSolrDbController = async () => {
  try {
    const solrResponse = await client.searchAll();
    // console.log("Solr response:", solrResponse);
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

export const searchByIdDataSolrDbController = async (reqBody) => {
  try {
    const query = `q=id:${reqBody.id}`;
    const solrResponse = await client.search(query);
    // console.log("Solr response:", solrResponse);
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
