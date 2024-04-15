export const baseUrl = "http://localhost:3000";

export const apiList = {
  getAllDestinations: `${baseUrl}/api/getAllDestinations`,
  getDestinationById: `${baseUrl}/api/getDestinationById`,
  // getDestinationDetailsByProductId: `${baseUrl}/api/getDestinationDetailByProductId`,
  getProductDetailsByProductCode: `${baseUrl}/api/getProductDetailsByProductCode`,
  createSchemaSolr: `${baseUrl}/api/solr/createSchemaSolr`,
  addDataSolr: `${baseUrl}/api/solr/addDataSolr`,
  updateDataSolr: `${baseUrl}/api/solr/updateDataSolr`,
  searchDataSolr: `${baseUrl}/api/solr/searchAllDataSolr`,
  searchByIdDataSolr: `${baseUrl}/api/solr/searchByIdDataSolr`,
  deleteAllDataSolr: `${baseUrl}/api/solr/deleteAllDataSolr`,
  addTracksdata: `${baseUrl}/api/getTracksData`,
};

export const solrDataName = {
  destinations: `destinations`,
  destinationById: `destinationById`,
  productByProductCode: `productByProductCode`,
  attractionsByDestId: `attractionsByDestId`,
};
