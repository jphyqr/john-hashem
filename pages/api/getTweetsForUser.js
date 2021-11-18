const needle = require("needle");

const userId = 1459337290396827654; //cryptohub
const url = `https://api.twitter.com/2/users/223541149/mentions`;

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.TWITTER_BEARER_TOKEN;

export default async function handler(req, res) {
  // this is the ID for @TwitterDev
  const getUserMentions = async () => {
    let userMentions = [];
    let params = {
      max_results: 100,
      "tweet.fields": "author_id",
    };

    const options = {
      headers: {
        "User-Agent": "v2UserMentionssJS",
        authorization: `Bearer ${bearerToken}`,
      },
    };

    let hasNextPage = true;
    let nextToken = null;
    console.log("Retrieving mentions...");
    while (hasNextPage) {
      let resp = await getPage(params, options, nextToken);
      if (
        resp &&
        resp.meta &&
        resp.meta.result_count &&
        resp.meta.result_count > 0
      ) {
        if (resp.data) {
          userMentions.push.apply(userMentions, resp.data);
        }
        if (resp.meta.next_token) {
          nextToken = resp.meta.next_token;
        } else {
          hasNextPage = false;
        }
      } else {
        hasNextPage = false;
      }
    }

    console.dir(userMentions, {
      depth: null,
    });

    console.log(`Got ${userMentions.length} mentions for user ID ${userId}!`);
  };

  const getPage = async (params, options, nextToken) => {
    if (nextToken) {
      params.pagination_token = nextToken;
    }

    try {
      const resp = await needle("get", url, params, options);

      if (resp.statusCode != 200) {
        console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
        return;
      }
      return resp.body;
    } catch (err) {
      throw new Error(`Request failed: ${err}`);
    }
  };

  try {
    await getUserMentions();
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.log("ERROR", error);
  }
}
