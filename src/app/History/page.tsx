"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import "flowbite";
import { useSession } from "next-auth/react";
import DomainGetIcon from '../DomainGet/DomainGetIcon';
import { Base64 } from "js-base64";
import SelectOnlyDomain from "../SelectDomainOnly/SelectOnlyDomain";
import GetTitle from "../DomainGet/GetTitle";
import Head from 'next/head'


export default function HomePage() {
    const { data: session } = useSession();
    const [HistoryData, setHistoryData] = useState([]);

    const GetHistory = async () => {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;

            if (!API_URL || !session?.accessToken) return;

            const res = await fetch(`${API_URL}/GetMyCreateHistory`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.accessToken}` 
                }
            });

            const data = await res.json();
            console.log(data?.Result?.Data, data?.Result?.Status, res.status);

            if (res.status === 200 && data?.Result?.Status && data?.Result?.Data?.length > 0) {
                setHistoryData(data.Result.Data);
            }

        } catch (error:any) {
            console.error("Fetch error:", error.message);
        }
    };

    const DecodeBase64 = (source: string): string => {
        if (!source || typeof source !== "string") {
            console.warn("Invalid input for Base64 decoding.");
            return "";
        }
        try {
            return Base64.decode(source.trim());
        } catch (error) {
            console.error("Base64 decoding error:", error);
            return "";
        }
    };

    useEffect(() => {
        if (session?.user?.id) {
            GetHistory();
        }
    }, [session?.user?.id]);

    return (
        <>
            <Head>
                <title>History| hrefly.co</title>
            </Head>
            <div className="bg-blue-40">
                <NavBar />

                <div className="h-screen w-full px-10 sm:px-20 sm:pt-10 sm:w-5/6 justify-self-center">
                    <h1 className="flex font-bold text-xl sm:text-2xl mb-5 sm:pb-18 text-sky-900 text-left">
                        History
                    </h1>
                    
                    {
                        HistoryData.length > 0 ? (
                            HistoryData?.map((List:any, Index:any) => (
                                <div key={Index} className="w-full flex px-5 py-5 rounded-lg border mb-5">
                                    <div className="w-1/5 sm:w-1/6 flex justify-center items-center">
                                        {/* Ensure domain is formatted correctly */}
                                        <DomainGetIcon domain={SelectOnlyDomain(DecodeBase64(List?.slc_destination))} />
                                    </div>
                                    <div className="w-4/5 sm:w-5/6">
                                        <h1 className="text-lg sm:text-xl mb-3 text-sky-900 font-bold">
                                            {List?.slc_title || 'Untitled'} | <GetTitle domain={SelectOnlyDomain(DecodeBase64(List?.slc_destination))} />
                                        </h1>
                                        <h3 className="text-sm sm:text-md mb-3 text-blue-900 font-bold">
                                            Shorted Destination : <a target="_blank" className="hover:underline hover:text-blue-950" href={`http://localhost:3000/s/${List?.slc_create_id}`}>{`${process.env.NEXT_PUBLIC_APP_DOMAIN_NAME}/s/${List?.slc_create_id}`}</a>
                                        </h3>
                                        <h3 className="text-sm sm:text-md mb-5 text-gray-900">
                                            Original Destination : <a target="_blank" className="hover:underline hover:text-gray-950" href={`${DecodeBase64(List?.slc_destination)}`}>{DecodeBase64(List?.slc_destination)}</a>
                                        </h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1 className="text-lg sm:text-xl mb-5 text-left text-sky-900">
                                Not found
                            </h1>
                        )
                    }
                </div>
            </div>
        </>
    );
}
