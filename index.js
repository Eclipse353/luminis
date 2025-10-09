import fetch from "node-fetch";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");
    if (!target) return new Response("No URL provided", { status: 400 });

    try {
      const resp = await fetch(target, {
        headers: {
          "User-Agent": request.headers.get("user-agent") || "",
          "Accept": request.headers.get("accept") || "*/*",
          "Accept-Language": request.headers.get("accept-language") || "en-US,en;q=0.9"
        }
      });

      const body = await resp.text();
      return new Response(body, {
        headers: { "Content-Type": resp.headers.get("content-type") || "text/html" }
      });
    } catch (err) {
      return new Response("Proxy error: " + err.message, { status: 500 });
    }
  }
};
