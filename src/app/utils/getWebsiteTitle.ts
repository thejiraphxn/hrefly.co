const getWebsiteTitle = async (domain: string): Promise<string | null> => {
    try {
        const res = await fetch(`/api/getTitle?domain=${domain}`);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return data.title || "No title found";
    } catch (error) {
        console.error("Error fetching title:", error);
        return null;
    }
};

export default getWebsiteTitle;
