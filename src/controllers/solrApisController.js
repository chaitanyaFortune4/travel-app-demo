import { client } from "@/db/config";
import { isDataStaleChecker } from "@/utils/common";

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
      isStale: isDataStaleChecker(solrResponse.response.docs[0]?.updatedAt),
      message: "Data found succesfully",
      data: solrResponse.response.docs,
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
      data: solrResponse.response.docs,
    };
  } catch (err) {
    console.log("searchByIdDataSolrDbController", err);
    return { status: false, message: "Internal Solr server error" };
  }
};

export const updateDataSolrDbController = async (data) => {
  try {
    // const updateQuery = {
    //   id: "1", // Query to identify the document(s) to update
    // };

    // const updateData = {
    //   set: {
    //     destinationName: "test", // Updated field and value
    //   },
    // };
    console.log("data", data);
    const test = [
      {
        productCode: "34181P6",
        title:
          "Private Mumbai Sightseeing Tour (Traveller's Choice Award Winner)",
        description:
          "Booking our city sightseeing tour is a great way to explore and experience the vibrant city of Mumbai. Our knowledgeable and friendly tour guides, who are Mumbai University students, will take you to the top attractions of the city such as the Gateway of India, Marine Drive, Crawford Market, and many more. You'll also get to see the stunning architecture of the colonial era and learn about the history, culture, and lifestyle of Mumbai. Our tour is conducted in an air-conditioned vehicle to make your experience comfortable and convenient. By booking our city sightseeing tour, you'll have an unforgettable experience and gain a deeper appreciation for the vibrant city of Mumbai.",
        images: [
          {
            imageSource: "SUPPLIER_PROVIDED",
            caption: "Private Full-Day Mumbai Sightseeing Tour",
            url: "https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-50x50/06/e4/85/39.jpg",
          },
          {
            imageSource: "SUPPLIER_PROVIDED",
            caption: "Private Full-Day Mumbai Sightseeing Tour",
            url: "https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-100x100/06/e4/85/39.jpg",
          },
        ],
        reviews: {
          sources: [
            {
              provider: "VIATOR",
              totalCount: 114,
              averageRating: 4,
            },
          ],
          totalReviews: 789,
          combinedAverageRating: 4.735108,
        },
      },
    ];
    const solrResponse = await client.atomicUpdate({
      id: data.id,

      products: {
        set: test,
      },
    });
    console.log("Solr response:", solrResponse);
    return {
      status: true,
      message: "Data found succesfully",
      data: solrResponse.response.docs,
    };
  } catch (err) {
    console.log("updateDataSolrDbController", err);
    return { status: false, message: "Internal Solr server error" };
  }
};
