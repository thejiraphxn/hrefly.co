// "use client";
// import React, { useState } from "react";
// import NavBar from "../Navbar/Navbar";
// import "flowbite";
// import { Base64 } from "js-base64";
// import { TypeAnimation } from "react-type-animation";
// import { useSession } from "next-auth/react";

// export default function HomePage() {
//   interface CreateLinkData {
//     Status: boolean;
//     Message: string;
//   }
//   const { data: session } = useSession();
//   const [destinationLink, setDestinationLink] = useState<string>(""); 
//   const [DataCreateLink, setDataCreateLink] = useState<CreateLinkData | null>(null);
//   const [CopyURL, setCopyURL] = useState<boolean>(false);

//   // ✅ URL Validation Regex
//   const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/;
//   const isValidURL = (link: string) => urlRegex.test(link);

//   const CreateLink = async () => {
//     if (!isValidURL(destinationLink.trim())) {
//       setDataCreateLink({ Status: false, Message: "Invalid URL format!" });
//       return;
//     }

//     try {
//       const encodedLink = Base64.encode(destinationLink.trim());
//       const API_URL = process.env.NEXT_PUBLIC_API_URL;

//       if (!API_URL) {
//         setDataCreateLink({ Status: false, Message: "API URL is missing!" });
//         return;
//       }

//       const res = await fetch(`${API_URL}/CreateCustomShortLink`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${session?.accessToken}`
//         },
//         body: JSON.stringify({ DestinationLink: encodedLink }),
//       });

//       const data = await res.json();
//       console.log(data.Result);

//       if (res.status == 200 && data?.Result) {
//         setDataCreateLink({
//           Status: data.Result.Status,
//           Message: data.Result.Message,
//         });
//       } else {
//         setDataCreateLink({
//           Status: false,
//           Message: data.Result.Message,
//         });
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       setDataCreateLink({
//         Status: false,
//         Message: "Network error, please try again.",
//       });
//     }
//   };

//   const handleCopy = async (text: string) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       setCopyURL(true);
//       setTimeout(() => setCopyURL(false), 2000); // Reset after 2 sec
//     } catch (error) {
//       console.error("Failed to copy: ", error);
//     }
//   };

//   return (
//     <>
//       <div className="bg-blue-40">
//         <NavBar />
//         <div className="content-center h-screen w-full">
//           <div className="w-full grid grid-cols-1">
//             <h1 className="font-bold text-2xl sm:text-4xl pb-7 sm:pb-18 text-center text-sky-900">
//               <TypeAnimation
//                 sequence={[
//                   `Welcome back, ${session?.user.firstname}! 🔗`, 1000,
//                   "Shorten your links easily! 📝", 1000,
//                   "Track your analytics in real-time! 🚀", 1000,
//                 ]}
//                 wrapper="span"
//                 speed={70}
//                 repeat={Infinity}
//               />
//             </h1>
//             <div className="w-full justify-center grid grid-cols-1">
//                 <div className="justify-self-center sm:w-3/5 w-full px-10 sm:px-0">
//                 <label htmlFor="destinationURL" className="text-sky-950">Destination</label>
//                   <div className="flex mb-5">
//                     <input
//                       id="destinationURL"
//                       type="text"
//                       placeholder="https://www.example.com/path/params"
//                       value={destinationLink}
//                       onChange={(e) => setDestinationLink(e.target.value)}
//                       className="w-full rounded-l-xl border-s border-y py-2 p-3 border-zinc-200 bg-sky-40 focus:ring-blue-950 text-sky-900"
//                     />
//                     <button
//                       onClick={CreateLink}
//                       className="rounded-r-lg bg-sky-900 hover:bg-sky-950 ease-in ease-out duration-200 text-white py-2 p-3"
//                     >
//                       ShortLink
//                     </button>
//                   </div>
                  
//                   <div className="text-sky-900 justify-center border rounded-2xl py-3 px-5 justify-self-center w-full" >
//                     <h3 className="font-bold text-lg mb-5">
//                       Advance Options
//                     </h3>

//                     <div className="grid grid-cols-1 gap-3 mb-3">
//                       <div className="w-full">
//                         <label htmlFor="Title">Title (optional)</label>
//                         <input type="text" id="Title" placeholder="Type your title..." className="py-2 px-2 border rounded-xl w-full" />
//                       </div>
//                       <div className="w-full">
//                         <label htmlFor="CustomLink">Custom Your Link (optional)</label>
                        
//                         <div className="flex">
//                           <div className="py-2 px-2 bg-zinc-100 rounded-l-xl border-s border-y w-3/6 sm:w-1/5">
//                             {`${process.env.NEXT_PUBLIC_APP_DOMAIN_NAME}/s/`}
//                           </div>
//                           <input type="text" id="CustomLink" placeholder="mycustomurl" className="py-2 px-2 rounded-r-xl border-e border-y w-3/6 sm:w-4/5" />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols- gap-3">
                      

//                     </div>
//                   </div>
//                 </div>
//             </div>
            

//             <div className="w-full flex justify-center mt-4">
//               {
//                 DataCreateLink ? (
//                   <span className={`${DataCreateLink.Status ? "text-sky-500 cursor-pointer" : "text-red-500"}`} onClick={() => DataCreateLink.Status && handleCopy(`http://localhost:3000/s/${DataCreateLink.Message}`)}>
//                     {`${DataCreateLink.Status ? (!CopyURL ? 'Click to copy :' : 'Copied! :') : 'Sorry, '} ${DataCreateLink.Status ? `http://localhost:3000/s/${DataCreateLink.Message}` : DataCreateLink.Message}`}
//                   </span>
//                 ) : (
//                   <span className="text-sky-500">
//                     {" "}
//                   </span>
//                 )
//               }
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";
import React, { useState } from "react";
import NavBar from "../Navbar/Navbar";
import "flowbite";
import { Base64 } from "js-base64";
import { TypeAnimation } from "react-type-animation";
import { useSession } from "next-auth/react";
import { error } from "console";

export default function HomePage() {
  interface CreateLinkData {
    Status: boolean;
    Message: string;
  }

  const { data: session } = useSession();
  const [destinationLink, setDestinationLink] = useState<string>(""); 
  const [title, setTitle] = useState<string>(""); // ✅ State สำหรับ Title
  const [customLink, setCustomLink] = useState<string>(""); // ✅ State สำหรับ Custom URL
  const [DataCreateLink, setDataCreateLink] = useState<CreateLinkData | null>(null);
  const [CopyURL, setCopyURL] = useState<boolean>(false);
  const [DisableButton, setDisableButton] = useState<boolean>(false);

  // ✅ URL Validation Regex
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/;
  const isValidURL = (link: string) => urlRegex.test(link);

  const CreateLink = async () => {
    setDisableButton(true);
    if (!session?.accessToken) {
      setDataCreateLink({ Status: false, Message: "You need to log in first!" });
      return;
    }

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

      const res = await fetch(`${API_URL}/CreateCustomShortLink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.accessToken}` 
        },
        body: JSON.stringify({
          DestinationLink: encodedLink,
          TitleName: title.trim(), 
          CustomURL: customLink.trim(), 
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 200 && data?.Result) {
        console.log(data);
        setDataCreateLink({
          Status: data.Result.Status,
          Message: data.Result.Message,
        });
      } else if(res.status === 400 || res.status === 401 || res.status === 500){
        throw new Error(data?.error)
      } else {
        throw new Error(data?.Result?.Message)
      }
    } catch (error:any) {
      console.error("Fetch error:", error?.message);
      setDataCreateLink({
        Status: false,
        Message: error.message,
      });
    }
    setDisableButton(false);
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
                  `Welcome back, ${session?.user.firstname || "User"}! 🔗`, 1000,
                  "Shorten your links easily! 📝", 1000,
                  "Track your analytics in real-time! 🚀", 1000,
                ]}
                wrapper="span"
                speed={70}
                repeat={Infinity}
              />
            </h1>
            <div className="w-full justify-center grid grid-cols-1">
              <div className="justify-self-center sm:w-3/5 w-full px-10 sm:px-0">
                <label htmlFor="destinationURL" className="text-sky-950">Destination</label>
                <div className="flex mb-5">
                  <input
                    id="destinationURL"
                    type="text"
                    placeholder="https://www.example.com/path/params"
                    value={destinationLink}
                    onChange={(e) => setDestinationLink(e.target.value)}
                    className="w-full rounded-l-xl border-s border-y py-2 p-3 border-zinc-200 bg-sky-40 focus:ring-blue-950 text-sky-900"
                  />
                  <button
                    onClick={CreateLink}
                    className="rounded-r-lg bg-sky-900 hover:bg-sky-950 ease-in ease-out duration-200 text-white py-2 p-3 disabled:hover:bg-sky-700"
                    disabled={DisableButton}
                  >
                    ShortLink
                  </button>
                </div>

                <div className="text-sky-900 justify-center border rounded-2xl py-3 px-5 justify-self-center w-full">
                  <h3 className="font-bold text-lg mb-5">Advance Options</h3>

                  <div className="grid grid-cols-1 gap-3 mb-3">
                    <div className="w-full">
                      <label htmlFor="Title">Title (optional)</label>
                      <input 
                        type="text" 
                        id="Title" 
                        placeholder="Type your title..." 
                        value={title} // ✅ Bind กับ State
                        onChange={(e) => setTitle(e.target.value)}
                        className="py-2 px-2 border rounded-xl w-full" 
                      />
                    </div>
                    <div className="w-full">
                      <label htmlFor="CustomLink">Custom Your Link (optional)</label>
                      <div className="flex">
                        <div className="py-2 px-2 bg-zinc-100 rounded-l-xl border-s border-y w-2/6 sm:w-1/5">
                          {`${process.env.NEXT_PUBLIC_APP_DOMAIN_NAME}/s/`}
                        </div>
                        <input 
                          type="text" 
                          id="CustomLink" 
                          placeholder="mycustomurl"
                          value={customLink} // ✅ Bind กับ State
                          onChange={(e) => setCustomLink(e.target.value)}
                          className="py-2 px-2 rounded-r-xl border-e border-y w-4/6 sm:w-4/5" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center mt-4">
              {DataCreateLink && (
                <span 
                  className={`${DataCreateLink.Status ? "text-sky-500 cursor-pointer" : "text-red-500"}`} 
                  onClick={() => DataCreateLink.Status && handleCopy(`http://localhost:3000/s/${DataCreateLink.Message}`)}
                >
                  {`${DataCreateLink.Status ? (!CopyURL ? 'Click to copy :' : 'Copied! :') : 'Sorry, '} ${DataCreateLink.Status ? `http://localhost:3000/s/${DataCreateLink.Message}` : DataCreateLink.Message}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
