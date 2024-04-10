const solr = require("solr-client");

const client = solr.createClient({
  host: process.env.SOLR_HOST, // Solr server hostname
  port: process.env.SOLR_PORT, // Default Solr port
  core: process.env.SOLR_CORE, // Name of the Solr core or collection
  path: process.env.SOLR_PATH, // Path to Solr instance (if not in root)
});

// client.ping().then((res) => {
//   console.log("RES", res);
// });
// const isSolrClientConnected = await client.ping();

// if (isSolrClientConnected.status === "OK") {
//   console.log("Solr client connected");
// } else {
//   console.log("Solr client failed to connect");
// }

// const document = {
//   id: 2,
//   title_t: "Sample3 Title",
//   description_t: "Sample3 Description",
// };

// const addDocumentsToSolr = async () => {
//   try {
//     var query = "q=*:*";
//     // console.log("client", client);
//     const test = await client.deleteAll();
//     console.log("Test", test.response);
//   } catch (err) {
//     console.log("err", err);
//   }
// };

// addDocumentsToSolr();

module.exports = {
  client,
};
