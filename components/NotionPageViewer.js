import axios from "axios";
import React, { useEffect } from "react";
import keys from "../config/keys";

const NotionPageViewer = ({ id, url }) => {
  useEffect(() => {
    const getNotionPage = async () => {
      try {
        console.log("notion toke", keys.notionToken);
        const webRes = await fetch("http://localhost:3000/api/getNotionPage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            pageId: id,
            token: keys.notionToken,
            notionUrl: url,
          }),
        });
        let json = await webRes.json();
        console.log(json);
      } catch (error) {
        console.log("error getting page", error.message);
      }
    };

    if (!id) return;

    getNotionPage();
  }, [id]);

  return <div>{id}</div>;
};

export default NotionPageViewer;
