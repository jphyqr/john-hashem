import keys from "../../config/keys";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: keys.airtableKey }).base("app2zJHD2vbTCZ86e");

export default function handler(req, res) {
  try {
    let services = [];
    let service_categories = [];
    base("Services")
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 300,
        view: "Raw",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function (record) {
            let obj = record.fields;

            obj.id = record.id;
            services.push(obj);
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

          base("ServicesCategories")
            .select({
              // Selecting the first 3 records in Grid view:
              maxRecords: 300,
              view: "Raw",
            })
            .eachPage(
              function page(records, fetchNextPage) {
                // This function (`page`) will get called for each page of records.

                records.forEach(function (record) {
                  let obj = record.fields;

                  obj.id = record.id;
                  service_categories.push(obj);
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
                  service_categories: service_categories,
                });
              }
            );
        }
      );
  } catch (error) {
    res.status(422).send({ error: error });
  }
}
