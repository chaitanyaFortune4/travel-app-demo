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
    client
      .deleteAll()
      .then(() => {
        resolve({ status: true, message: "All data deleted succesfully" });
      })
      .catch((error) => {
        console.log("deleteAllDataSolr", error);
        reject({ status: false, message: "Internal Solr server error" });
      });
  });
};

export const deleteByIdSolr = (idObj) => {
  return new Promise((resolve, reject) => {
    client
      .deleteByID(idObj.id)
      .then(() => {
        resolve({ status: true, message: "Data deleted succesfully" });
      })
      .catch((error) => {
        console.log("deleteAllDataSolr", error);
        reject({ status: false, message: "Internal Solr server error" });
      });
  });
};

export const searchAllDataSolr = () => {
  return new Promise((resolve, reject) => {
    client
      .searchAll()
      .then((solrResponse) => {
        resolve({
          status: true,
          isStale: isDataStaleChecker(solrResponse.response.docs[0]?.updatedAt),
          message: "Data found succesfully",
          data: solrResponse.response.docs,
        });
      })
      .catch((error) => {
        console.log("searchAllDataSolr", error);
        reject({ status: false, message: "Internal Solr server error" });
      });
  });
};

export const searchByIdDataSolr = (query) => {
  return new Promise((resolve, reject) => {
    client
      .search(query)
      .then((solrResponse) => {
        if (solrResponse.response.numFound > 0) {
          resolve({
            status: true,
            message: "Data found succesfully",
            data: solrResponse.response.docs,
          });
        } else {
          resolve({
            status: false,
            message: "No data found",
            data: solrResponse.response.docs,
          });
        }
      })
      .catch((error) => {
        console.log("searchByIdDataSolr", error);
        reject({ status: false, message: "Internal Solr server error" });
      });
  });
};

export const updateDataSolr = (data) => {
  return new Promise((resolve, reject) => {
    client
      .atomicUpdate({
        id: data.id,
        [data.fieldName]: { set: data.dataToUpdate },
      })
      .then((solrResponse) => {
        console.log("SOLRRES", solrResponse);
        resolve({
          status: true,
          message: "Data updated succesfully",
        });
      })
      .catch((error) => {
        console.log("updateDataSolr", error);
        reject({ status: false, message: "Internal Solr server error" });
      });
  });
};
