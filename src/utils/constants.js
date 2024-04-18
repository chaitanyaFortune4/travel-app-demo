export const baseUrl = "http://localhost:3000";

export const apiList = {
  getAllDestinations: `${baseUrl}/api/getAllDestinations`,
  getDestinationById: `${baseUrl}/api/getDestinationById`,
  getProductDetailsByProductCode: `${baseUrl}/api/getProductDetailsByProductCode?query=`,
  getAttractionsByDestId: `${baseUrl}/api/getAttractionsByDestId`,
  getAttractionBySeoId: `${baseUrl}/api/getAttractionDetailsBySeoId?seoId=`, // seoId=123456

  //Apis for direct Solr queries
  createSchemaSolr: `${baseUrl}/api/solr/createSchemaSolr`,
  addDataSolr: `${baseUrl}/api/solr/addDataSolr`,
  updateDataSolr: `${baseUrl}/api/solr/updateDataSolr`,
  searchDataSolr: `${baseUrl}/api/solr/searchAllDataSolr`,
  searchByIdDataSolr: `${baseUrl}/api/solr/searchByIdDataSolr`,
  deleteAllDataSolr: `${baseUrl}/api/solr/deleteAllDataSolr`,
  addTracksdata: `${baseUrl}/api/getTracksData`,
};

// dataNames used for grouping Solr documents
export const solrDataName = {
  allDestinations: `allDestinations`,
  destinationById: `destinationById`,
  productByProductCode: `productByProductCode`,
  attractionBySeoId: `attractionBySeoId`,
};
