import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { domain } = req.query;

    if (!domain || typeof domain !== "string") {
        return res.status(400).json({ error: "Invalid domain provided" });
    }

    try {
        const formattedDomain = domain.startsWith("http") ? domain : `https://${domain}`;

        const response = await fetch(formattedDomain, {
            method: "GET",
            headers: { "User-Agent": "Mozilla/5.0" }, // ป้องกันเว็บบล็อก bots
        });

        if (!response.ok) {
            // throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const html = await response.text();
        const match = html.match(/<title>(.*?)<\/title>/i);
        
        return res.status(200).json({ title: match ? match[1] : "No title found" });

    } catch (error) {
        // console.error("Error fetching title:", error);
        return res.status(500).json({ error: "Error fetching website title" });
    }
}
