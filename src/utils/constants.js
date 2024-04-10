export const baseUrl = "http://localhost:3000";

export const apiList = {
  getAllDestinations: `${baseUrl}/api/getAllDestinations`,
  getDestinationById: `${baseUrl}/api/getDestinationById`,
  getDestinationDetailsByProductId: `${baseUrl}/api/getDestinationDetailByProductId`,
  addDataSolrDB: `${baseUrl}/api/addDataSolrDB`,
  searchDataSolrDB: `${baseUrl}/api/searchDataSolrDB`,
  deleteAllDataSolrDB: `${baseUrl}/api/deleteAllDataSolrDB`,
};
