"use client"
// import { siteMetadata } from "./metadata"; 
// import { Metadata } from "next";

// export const metadata: Metadata = siteMetadata;
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SessionWrapper from "./SessionWrapper/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
        <title>hrefly.co</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ ย้าย SessionProvider เข้าไปใน <body> */}
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
