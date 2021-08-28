import keys from "../../config/keys";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: keys.airtableKey }).base("app2zJHD2vbTCZ86e");

let services = [];
base("Services")
  .select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 200,
    view: "Raw",
  })
  .eachPage(
    function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function (record) {
        services.push({ id: record.id, ...record.fields });
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }

      return res.status(200).json({
        services: services,
      });
    }
  );
