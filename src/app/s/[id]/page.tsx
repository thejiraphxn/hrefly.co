import { Metadata } from "next";
import { redirect } from "next/navigation";
import * as cheerio from "cheerio";

// Utility function to fetch and decode Base64 URL
function decodeBase64(encoded: string): string {
  return Buffer.from(encoded, "base64").toString("utf-8");
}

// Utility function to fetch the API data and handle errors
async function fetchApiData(sourceLink: string) {
  const API_URL = process.env.API_URL;
  if (!API_URL) {
    throw new Error("API_URL is missing in environment variables");
  }

  try {
    const res = await fetch(`${API_URL}/FindByParam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ SourceLink: sourceLink }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status}`);
    }

    const data = await res.json();
    if (!data?.Result?.Status || !data?.Result?.Message) {
      throw new Error("Invalid API response, missing 'Result.Message'");
    }

    const destinationUrl = decodeBase64(data.Result.Message);
    return destinationUrl;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error; // Rethrow error to be handled in the calling function
  }
}

// Function to generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  if (!params || !params.id) return {};

  try {
    const destinationUrl = await fetchApiData(params.id);

    // Step 2: Fetch metadata from the destination URL
    const destRes = await fetch(destinationUrl, { cache: "no-store" });
    if (!destRes.ok) {
      console.error("Failed to fetch destination page:", destRes.status);
      return { title: "Redirecting...", description: "You're being redirected." };
    }

    const html = await destRes.text();
    const $ = cheerio.load(html);

    const title =
      $("meta[property='og:title']").attr("content") ||
      $("title").text() ||
      "Redirecting...";
    const description =
      $("meta[property='og:description']").attr("content") ||
      "You're being redirected.";
    const image =
      $("meta[property='og:image']").attr("content") ||
      "https://yourdomain.com/default-preview.jpg"; // Default image if missing

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
    console.error("Metadata fetch error:", error);
    return {
      title: "Not Found",
      description: "The requested page could not be found.",
      openGraph: {
        title: "Not Found",
        description: "The requested page could not be found.",
        url: "",
        images: [{ url: "https://yourdomain.com/default-preview.jpg" }],
      },
    };
  }
}

// RedirectPage component
export default async function RedirectPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params || !params.id) {
    return (
      <html lang="en">
        <head>
          <meta httpEquiv="refresh" />
        </head>
        <body>
          <div className="bg-blue-40 h-screen">
            <div className="content-center h-full w-full">
              <div className="w-full grid grid-cols-1">
                <div className="w-full flex justify-center">
                  <h1 className="items-center text-center text-sky-900 no-underline hover:no-underline font-bold text-xl lg:text-3xl">
                    Not Found<br />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  try {
    const destinationUrl = await fetchApiData(params.id);
    return (
      <html lang="en">
        <head>
          <meta httpEquiv="refresh" content={`3;url=${destinationUrl}`} />
        </head>
        <body>
          <div className="bg-blue-40 h-screen">
            <div className="content-center h-full w-full">
              <div className="w-full grid grid-cols-1">
                <div className="w-full flex justify-center">
                  <h1 className="items-center text-center text-sky-900 no-underline hover:no-underline font-bold text-xl lg:text-3xl">
                    Redirecting...
                    <br />
                    <a
                      href={destinationUrl}
                      target="_blank"
                      className="underline cursor-pointer lg:text-xl"
                    >
                      Click here, If it does not redirect
                    </a>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  } catch (error) {
    console.error("Redirect fetch error:", error);
    return (
      <html lang="en">
        <head>
          <meta httpEquiv="refresh" />
        </head>
        <body>
          <div className="bg-blue-40 h-screen">
            <div className="content-center h-full w-full">
              <div className="w-full grid grid-cols-1">
                <div className="w-full flex justify-center">
                  <h1 className="items-center text-center text-sky-900 no-underline hover:no-underline font-bold text-xl lg:text-3xl">
                    Not Found<br />
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// export default function RedirectPage() {
//   const params = useParams(); // ✅ Correct way to access dynamic route params
//   const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     if (!params?.id) {
//       setError(true);
//       return;
//     }

//     const fetchRedirectUrl = async () => {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL;
//       if (!API_URL) {
//         setError(true);
//         return;
//       }

//       try {
//         const res = await fetch(`${API_URL}/FindByParam`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ SourceLink: params.id }),
//         });

//         if (!res.ok) {
//           setError(true);
//           return;
//         }

//         const data = await res.json();
//         if (!data?.Result?.Status || !data?.Result?.Message) {
//           setError(true);
//           return;
//         }

//         // ✅ Decode Base64-encoded URL
//         const decodedUrl = Buffer.from(data.Result.Message, "base64").toString("utf-8");
//         setRedirectUrl(decodedUrl);
//       } catch (error) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRedirectUrl();
//   }, [params?.id]);

//   // Redirect user if a valid URL is found
//   useEffect(() => {
//     if (redirectUrl) {
//       setTimeout(() => {
//         window.location.href = redirectUrl;
//       }, 3000);
//     }
//   }, [redirectUrl]);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-xl p-6 text-center w-96">
//         {loading ? (
//           <h1 className="text-xl font-semibold text-gray-800">Redirecting...</h1>
//         ) : error ? (
//           <h1 className="text-xl font-semibold text-red-600">Invalid Link</h1>
//         ) : (
//           <h1 className="text-xl font-semibold text-gray-800">
//             Redirecting in 3 seconds...
//             <p className="mt-2">
//               If not redirected,{" "}
//               <a href={redirectUrl!} className="text-blue-500 underline">click here</a>.
//             </p>
//           </h1>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client"; // ✅ ใช้ Client-Side เท่านั้น

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// export default function RedirectPage() {
//   const params = useParams(); // ✅ ดึงค่าพารามิเตอร์จาก URL
//   const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     if (!params?.id) {
//       setError(true);
//       return;
//     }

//     const fetchRedirectUrl = async () => {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL;
//       if (!API_URL) {
//         setError(true);
//         return;
//       }

//       try {
//         const res = await fetch(`${API_URL}/FindByParam`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ SourceLink: params.id }),
//         });

//         if (!res.ok) {
//           setError(true);
//           return;
//         }

//         const data = await res.json();
//         if (!data?.Result?.Status || !data?.Result?.Message) {
//           setError(true);
//           return;
//         }

//         // ✅ Decode Base64-encoded URL
//         const decodedUrl = Buffer.from(data.Result.Message, "base64").toString("utf-8");
//         setRedirectUrl(decodedUrl);
//       } catch (error) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRedirectUrl();
//   }, [params?.id]);

//   // Redirect user if a valid URL is found
//   useEffect(() => {
//     if (redirectUrl) {
//       setTimeout(() => {
//         window.location.href = redirectUrl;
//       }, 3000);
//     }
//   }, [redirectUrl]);

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-xl p-6 text-center w-96">
//         {loading ? (
//           <h1 className="text-xl font-semibold text-gray-800">Redirecting...</h1>
//         ) : error ? (
//           <h1 className="text-xl font-semibold text-red-600">Invalid Link</h1>
//         ) : (
//           <h1 className="text-xl font-semibold text-gray-800">
//             Redirecting in 3 seconds...
//             <p className="mt-2">
//               If not redirected,{" "}
//               <a href={redirectUrl!} className="text-blue-500 underline">click here</a>.
//             </p>
//           </h1>
//         )}
//       </div>
//     </div>
//   );
// }


