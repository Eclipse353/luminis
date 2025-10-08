import express from "express";
import fetch from "node-fetch"; // npm i node-fetch@2
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// proxy endpoint
app.get("/scram/fetch/:encodedUrl", async (req, res) => {
  try {
    const encodedUrl = req.params.encodedUrl;
    const url = Buffer.from(encodedUrl, "base64").toString("utf-8");

    const response = await fetch(url);
    const contentType = response.headers.get("content-type") || "text/html";
    const body = await response.text();

    res.setHeader("Content-Type", contentType);
    res.send(body);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error");
  }
});

// serve static frontend
app.use(express.static("public"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

