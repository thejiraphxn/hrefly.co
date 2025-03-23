import type { Metadata } from "next";
import * as cheerio from "cheerio";

// Helper function to decode Base64
function decodeBase64(encoded: string): string {
  return Buffer.from(encoded, "base64").toString("utf-8");
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const API_URL = process.env.API_URL;
  if (!API_URL) {
    console.error("API_URL is missing in environment variables");
    return {};
  }

  try {
    // Fetch the destination URL from the API
    const res = await fetch(`${API_URL}/FindByParam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ SourceLink: params.id }),
      cache: "no-store",
    });

    if (!res.ok) return {};
    const data = await res.json();
    if (!data?.Result?.Status || !data?.Result?.Message) return {};

    // Decode Base64 URL
    const destinationUrl = decodeBase64(data.Result.Message);

    // Fetch metadata from destination URL
    const destRes = await fetch(destinationUrl, { cache: "no-store" });
    if (!destRes.ok) return { title: "Redirecting...", description: "You're being redirected." };

    const html = await destRes.text();
    const $ = cheerio.load(html);

    const title = $("meta[property='og:title']").attr("content") || $("title").text() || "Redirecting...";
    const description = $("meta[property='og:description']").attr("content") || "You're being redirected.";

    let image = $("meta[property='og:image']").attr("content");
    if (!image || !image.startsWith("http")) {
      image = "https://yourdomain.com/default-preview.jpg"; // Use a hosted image
    }

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: destinationUrl,
        images: [{ url: image }],
      },
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {};
  }
}
