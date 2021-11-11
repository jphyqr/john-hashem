import keys from "../../config/keys";

const { Client } = require("@notionhq/client");

// export default function handler(req, res) {
//   try {
//     res.status(200).json({ name: "John Doe" });
//     console.log("GET NOTION PAGE");
//     const response = await notion.pages.retrieve({ page_id: req.body.pageId });
//     console.log(response);
//     res.status(200).json({ response });
//   } catch (error) {
//     res.status(422).send({ error: error });
//   }
// }

export default async function handler(req, res) {
  try {
    console.log("GET NOTION PAGE", req.body.token);

    const notion = new Client({ auth: req.body.token });

    const response = await notion.blocks.children.list({
      block_id: req.body.pageId,
    });

    res.status(200).send(response.results);
  } catch (error) {
    res.status(422).send({ error: error });
  }
}
