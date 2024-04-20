export const baseUrl = "http://192.168.10.147:3000";

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
  fileUploadProduct: `public/json/product`,
  getDestinationBySeoId: `${baseUrl}/api/getDestinationBySeoId`,
  fileUploadProductDestinationById: `public/json/productListDestinationById`,
};

