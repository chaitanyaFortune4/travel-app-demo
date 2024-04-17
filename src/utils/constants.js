export const baseUrl = "http://localhost:3000";

export const apiList = {
  getAllDestinations: `${baseUrl}/api/getAllDestinations`,
  getDestinationById: `${baseUrl}/api/getDestinationById`,
  getDestinationDetailsByProductId: `${baseUrl}/api/getDestinationDetailByProductId`,
  createSchemaSolr: `${baseUrl}/api/solr/createSchemaSolr`,
  addDataSolr: `${baseUrl}/api/solr/addDataSolr`,
  updateDataSolr: `${baseUrl}/api/solr/updateDataSolr`,
  searchDataSolr: `${baseUrl}/api/solr/searchAllDataSolr`,
  searchByIdDataSolr: `${baseUrl}/api/solr/searchByIdDataSolr`,
  deleteAllDataSolr: `${baseUrl}/api/solr/deleteAllDataSolr`,
  addTracksdata: `${baseUrl}/api/getTracksData`,
  fileUpload: `public/json`,
  getDestinationBySeoId: `${baseUrl}/api/getDestinationBySeoId`,
};
