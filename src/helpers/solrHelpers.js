import { client } from "@/db/config";
import { isDataStaleChecker } from "@/utils/common";

const getFieldNames = (obj) => {
  const fieldNames = new Set();
  extractFieldNames(obj, fieldNames);
  return Array.from(fieldNames);
};

const extractFieldNames = (obj, fieldNames) => {
  if (typeof obj !== "object" || obj === null) return;
  for (const key of Object.keys(obj)) {
    fieldNames.add(key);
    extractFieldNames(obj[key], fieldNames);
  }
};

export const createSchemaSolr = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const fieldNames = getFieldNames(data);
      const promises = fieldNames.map(async (fieldName) => {
        try {
          return await client.createSchemaField(fieldName, "text_general");
        } catch (error) {
          console.error(`Error creating schema field for ${fieldName}:`, error);
          return null;
        }
      });

      Promise.all(promises)
        .then((solrResponses) => {
          console.log("RES", solrResponses);
          resolve({
            status: true,
            message: "Schema fields created successfully",
          });
        })
        .catch((err) => {
          console.error("Promise.all err", err);
          reject({ status: false, message: "Internal Solr server error" });
        });
    } catch (err) {
      console.error("createSchemaSolr err", err);
      reject({ status: false, message: "Internal error" });
    }
  });
};

export const addDataSolr = (reqBody) => {
  return new Promise((resolve, reject) => {
    client
      .add(reqBody)
      .then((solrResponse) => {
        console.log("GG", solrResponse);
        resolve({ status: true, message: "Data added succesfully" });
      })
      .catch((error) => {
        console.log("addDataSolr", error);
        reject({ status: false, message: "Internal Solr server error" });
      });
  });
};

export const deleteAllDataSolr = () => {
  return new Promise((resolve, reject) => {
    try {
      client.deleteAll().then(() => {
        resolve({ status: true, message: "All data deleted succesfully" });
      });
    } catch (error) {
      console.log("deleteAllDataSolr", error);
      reject({ status: false, message: "Internal Solr server error" });
    }
  });
  // try {
  //   const solrResponse = await client.deleteAll();
  //   console.log("Solr response:", solrResponse.responseHeader);
  //   return { status: true, message: "All data deleted succesfully" };
  // } catch (err) {
  //   console.log("addDataSolrDbController", err);
  //   return { status: false, message: "Internal Solr server error" };
  // }
};

export const searchAllDataSolr = () => {
  return new Promise((resolve, reject) => {
    try {
      client.searchAll().then((solrResponse) => {
        resolve({
          status: true,
          isStale: isDataStaleChecker(solrResponse.response.docs[0]?.updatedAt),
          message: "Data found succesfully",
          data: solrResponse.response.docs,
        });
      });
    } catch (error) {
      console.log("searchAllDataSolr", error);
      reject({ status: false, message: "Internal Solr server error" });
    }
  });
};

export const searchByIdDataSolr = (reqBody) => {
  return new Promise((resolve, reject) => {
    try {
      const query = `q=id:${reqBody.id}`;
      client.search(query).then((solrResponse) => {
        resolve({
          status: true,
          message: "Data found succesfully",
          data: solrResponse.response.docs,
        });
      });
    } catch (error) {
      console.log("searchByIdDataSolr", error);
      reject({ status: false, message: "Internal Solr server error" });
    }
  });
};

export const updateDataSolr = (data) => {
  return new Promise((resolve, reject) => {
    try {
      // const test = [
      //   {
      //     productCode: "34181P6",
      //     title:
      //       "Private Mumbai Sightseeing Tour (Traveller's Choice Award Winner)",
      //     description:
      //       "Booking our city sightseeing tour is a great way to explore and experience the vibrant city of Mumbai. Our knowledgeable and friendly tour guides, who are Mumbai University students, will take you to the top attractions of the city such as the Gateway of India, Marine Drive, Crawford Market, and many more. You'll also get to see the stunning architecture of the colonial era and learn about the history, culture, and lifestyle of Mumbai. Our tour is conducted in an air-conditioned vehicle to make your experience comfortable and convenient. By booking our city sightseeing tour, you'll have an unforgettable experience and gain a deeper appreciation for the vibrant city of Mumbai.",
      //     images: [
      //       {
      //         imageSource: "SUPPLIER_PROVIDED",
      //         caption: "Private Full-Day Mumbai Sightseeing Tour",
      //         url: "https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-50x50/06/e4/85/39.jpg",
      //       },
      //       {
      //         imageSource: "SUPPLIER_PROVIDED",
      //         caption: "Private Full-Day Mumbai Sightseeing Tour",
      //         url: "https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-100x100/06/e4/85/39.jpg",
      //       },
      //     ],
      //     reviews: {
      //       sources: [
      //         {
      //           provider: "VIATOR",
      //           totalCount: 114,
      //           averageRating: 4,
      //         },
      //       ],
      //       totalReviews: 789,
      //       combinedAverageRating: 4.735108,
      //     },
      //   },
      // ];
      console.log("Data", data);
      client
        .add({ id: data.id, products: { set: data.products } })
        .then((solrResponse) => {
          console.log("SOLRRES", solrResponse);
          resolve({
            status: true,
            message: "Data updated succesfully",
          });
        });
    } catch (error) {
      console.log("updateDataSolr", error);
      reject({ status: false, message: "Internal Solr server error" });
    }
  });

  // try {
  //   console.log("data", data);
  //   const test = [
  //     {
  //       productCode: "34181P6",
  //       title:
  //         "Private Mumbai Sightseeing Tour (Traveller's Choice Award Winner)",
  //       description:
  //         "Booking our city sightseeing tour is a great way to explore and experience the vibrant city of Mumbai. Our knowledgeable and friendly tour guides, who are Mumbai University students, will take you to the top attractions of the city such as the Gateway of India, Marine Drive, Crawford Market, and many more. You'll also get to see the stunning architecture of the colonial era and learn about the history, culture, and lifestyle of Mumbai. Our tour is conducted in an air-conditioned vehicle to make your experience comfortable and convenient. By booking our city sightseeing tour, you'll have an unforgettable experience and gain a deeper appreciation for the vibrant city of Mumbai.",
  //       images: [
  //         {
  //           imageSource: "SUPPLIER_PROVIDED",
  //           caption: "Private Full-Day Mumbai Sightseeing Tour",
  //           url: "https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-50x50/06/e4/85/39.jpg",
  //         },
  //         {
  //           imageSource: "SUPPLIER_PROVIDED",
  //           caption: "Private Full-Day Mumbai Sightseeing Tour",
  //           url: "https://hare-media-cdn.tripadvisor.com/media/attractions-splice-spp-100x100/06/e4/85/39.jpg",
  //         },
  //       ],
  //       reviews: {
  //         sources: [
  //           {
  //             provider: "VIATOR",
  //             totalCount: 114,
  //             averageRating: 4,
  //           },
  //         ],
  //         totalReviews: 789,
  //         combinedAverageRating: 4.735108,
  //       },
  //     },
  //   ];
  //   const solrResponse = await client.atomicUpdate({
  //     id: data.id,

  //     products: {
  //       set: test,
  //     },
  //   });
  //   console.log("Solr response:", solrResponse);
  //   return {
  //     status: true,
  //     message: "Data found succesfully",
  //     data: solrResponse.response.docs,
  //   };
  // } catch (err) {
  //   console.log("updateDataSolrDbController", err);
  //   return { status: false, message: "Internal Solr server error" };
  // }
};
