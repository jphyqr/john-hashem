import keys from "../../config/keys";

var Airtable = require("airtable");
var base = new Airtable({ apiKey: keys.airtableKey }).base("app2zJHD2vbTCZ86e");

export default function handler(req, res) {
  try {
    console.log("key", "test");
    base("Website").find("reckFCjA8JCw9c5vE", function (err, record) {
      if (err) {
        console.error(err);
        res.status(422).send({ error: err });
      }
      console.log("Retrieved", record);
      res.status(200).json({ record });
    });
  } catch (error) {
    res.status(422).send({ error: error });
  }
}
