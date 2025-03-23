"use client"; // ✅ This makes it a Client Component

import React, { useEffect, useState } from "react";
import getWebsiteTitle from "../utils/getWebsiteTitle";

interface DomainTitleProps {
    domain: string; // ✅ Ensure `domain` is a string
}

const GetTitle: React.FC<DomainTitleProps> = ({ domain }) => {
    const [title, setTitle] = useState<string>("Loading...");

    useEffect(() => {
        if(!domain || domain == null){
            setTitle("Invalid domain");
            return ;
        }
        const fetchTitle = async () => {
            const websiteTitle = await getWebsiteTitle(domain);
            setTitle(websiteTitle ?? "Website name fetch error");
        };
        fetchTitle();
    }, [domain]);

    return (
        title
    );
};

export default GetTitle

// const GetTitle = async ({domain}: any): Promise<string | null> => {
//     try {
//         const response = await fetch(`https://duckduckgo.com/?q=${domain}&format=json`);
//         const data = await response.json();

//         return data.Heading || "No title found"; // DuckDuckGo แสดงหัวข้อของเว็บ
//     } catch (error) {
//         console.error("Error fetching title:", error);
//         return "";
//     }
// };

// export default GetTitle
