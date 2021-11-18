const needle = require("needle");

const endpointURL = "https://api.twitter.com/2/users/by?usernames=";

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.TWITTER_BEARER_TOKEN;

export default async function handler(req, res) {
  try {
    async function getRequest() {
      const params = {
        usernames: "wagmimap", // Edit usernames to look up
        "user.fields": "created_at,description", // Edit optional query parameters here
        expansions: "pinned_tweet_id",
      };

      // this is the HTTP header that adds bearer token authentication
      const res = await needle("get", endpointURL, params, {
        headers: {
          "User-Agent": "v2UserLookupJS",
          authorization: `Bearer ${bearerToken}`,
        },
      });

      if (res.body) {
        return res.body;
      } else {
        throw new Error("Unsuccessful request");
      }
    }

    (async () => {
      try {
        // Make request
        const response = await getRequest();
        console.dir(response, {
          depth: null,
        });
      } catch (e) {
        console.log(e);
        process.exit(-1);
      }
      process.exit();
    })();
  } catch (error) {
    console.log("ERROR", error);
  }
}
