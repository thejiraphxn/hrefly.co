"use client";
import React, { useState } from "react";
import NavBar from "../Navbar/Navbar";
import "flowbite";
import { Base64 } from "js-base64";
import { TypeAnimation } from "react-type-animation";

export default function HomePage() {
  interface CreateLinkData {
    Status: boolean;
    Message: string;
  }

  const [destinationLink, setDestinationLink] = useState<string>(""); 
  const [DataCreateLink, setDataCreateLink] = useState<CreateLinkData | null>(null);
  const [CopyURL, setCopyURL] = useState<boolean>(false);

  // ✅ URL Validation Regex
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/;
  const isValidURL = (link: string) => urlRegex.test(link);

  const CreateLink = async () => {
    if (!isValidURL(destinationLink.trim())) {
      setDataCreateLink({ Status: false, Message: "Invalid URL format!" });
      return;
    }

    try {
      const encodedLink = Base64.encode(destinationLink.trim());
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        setDataCreateLink({ Status: false, Message: "API URL is missing!" });
        return;
      }

      const res = await fetch(`${API_URL}/CreateShortLink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ DestinationLink: encodedLink }),
      });

      const data = await res.json();
      console.log(data.Result);

      if (res.status == 200 && data?.Result) {
        setDataCreateLink({
          Status: data.Result.Status,
          Message: data.Result.Message,
        });
      } else {
        setDataCreateLink({
          Status: false,
          Message: data.Result.Message,
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setDataCreateLink({
        Status: false,
        Message: "Network error, please try again.",
      });
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyURL(true);
      setTimeout(() => setCopyURL(false), 2000); // Reset after 2 sec
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <>
      <div className="bg-blue-40">
        <NavBar />
        <div className="content-center h-screen w-full">
          <div className="w-full grid grid-cols-1">
            <h1 className="font-bold text-2xl sm:text-4xl pb-7 sm:pb-18 text-center text-sky-900">
              <TypeAnimation
                sequence={[
                  "Welcome to hrefly! 🔗", 1000,
                  "Shorten your links easily! 📝", 1000,
                  "Track your analytics in real-time! 🚀", 1000,
                ]}
                wrapper="span"
                speed={70}
                repeat={Infinity}
              />
            </h1>
            <div className="w-full flex justify-center">
              <input
                type="text"
                placeholder="Type your link here..."
                value={destinationLink}
                onChange={(e) => setDestinationLink(e.target.value)}
                className="w-3/6 rounded-l-xl border-s border-y py-2 p-3 border-zinc-200 bg-sky-40 focus:ring-blue-950 text-sky-900"
              />
              <button
                onClick={CreateLink}
                className="rounded-r-lg bg-sky-900 hover:bg-sky-950 ease-in ease-out duration-200 text-white py-2 p-3"
              >
                QuickShort
              </button>
            </div>

            <div className="w-full flex justify-center mt-4">
              {
                DataCreateLink ? (
                  <span className={`${DataCreateLink.Status ? "text-sky-500 cursor-pointer" : "text-red-500"}`} onClick={() => DataCreateLink.Status && handleCopy(`http://localhost:3000/s/${DataCreateLink.Message}`)}>
                    {`${DataCreateLink.Status ? (!CopyURL ? 'Click to copy :' : 'Copied! :') : 'Sorry, '} ${DataCreateLink.Status ? `http://localhost:3000/s/${DataCreateLink.Message}` : DataCreateLink.Message}`}
                  </span>
                ) : (
                  <span className="text-sky-500">
                    {" "}
                  </span>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
