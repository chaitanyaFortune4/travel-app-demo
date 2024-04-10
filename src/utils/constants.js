export const baseUrl = "http://localhost:3000";

export const apiList = {
  getAllDestinations: `${baseUrl}/api/getAllDestinations`,
  getDestinationById: `${baseUrl}/api/getDestinationById`,
  getDestinationDetailsByProductId: `${baseUrl}/api/getDestinationDetailByProductId`,
  addDataSolrDB: `${baseUrl}/api/solr/addDataSolr`,
  searchDataSolrDB: `${baseUrl}/api/solr/searchAllDataSolr`,
  searchByIdDataSolrDB: `${baseUrl}/api/solr/searchByIdDataSolr`,
  deleteAllDataSolrDB: `${baseUrl}/api/solr/deleteAllDataSolr`,
};
