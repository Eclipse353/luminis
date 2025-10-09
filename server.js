import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

// proxy route
app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("No URL provided");

  try {
    // launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "networkidle2" });

    // rewrite all links to go through the proxy
    await page.evaluate(() => {
      const links = document.querySelectorAll("a[href]");
      links.forEach(a => {
        a.href = `/proxy?url=${btoa(a.href)}`;
      });
    });

    // get page content
    const html = await page.content();
    await browser.close();

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy error: " + err.message);
  }
});

// serve frontend (optional if your frontend files are in 'public')
app.use(express.static("public"));

app.listen(PORT, () => console.log(`Puppeteer proxy running on port ${PORT}`));

