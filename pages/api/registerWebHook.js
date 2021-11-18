const { Autohook } = require("twitter-autohook");

export default async function handler(req, res) {
  // this is the ID for @TwitterDev
  (async (start) => {
    try {
      const webhook = new Autohook({
        token: process.env.TWITTER_ACCESS_TOKEN,
        token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        env: "dev",
        port: 1338,
      });

      // Removes existing webhooks
      //    await webhook.removeWebhooks();
      // Listens to incoming activity
      // webhook.on("event", (event) => console.log("Something happened:", event));

      // Starts a server and adds a new webhook
      //   await webhook.start();

      await webhook.start();

      // Subscribes to your own user's activity
      // await webhook.subscribe({
      //   oauth_token: process.env.TWITTER_ACCESS_TOKEN,
      //   oauth_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      // });
    } catch (e) {
      // Display the error and quit
      console.error(e);
      process.exit(1);
    }
  })();
}
