import { Metadata } from "next";
import HomeNoneLogin from "./Home/Home";
import HomeLoggedIn from "./Home/LoggedinHome";
import SessionComponent from './SessionComponent/SessionComponent'

export const metadata: Metadata = {
  title: "Shorten Your Link | hrefly.co",
  description: "Shorten and manage your URLs with ease. Get real-time analytics, custom short links, and a seamless user experience.",
  keywords: ["URL Shortener", "Short Links", "Track Links", "SEO", "hrefly"],
  openGraph: {
    title: "Shorten Your Link | hrefly.co",
    description: "Effortlessly shorten and manage your URLs with our powerful and user-friendly shortlink service.",
    url: "https://hrefly.co",
    siteName: "hrefly.co",
    images: [
      {
        url: "https://hrefly.co/og-image.jpg", // ✅ อัปเดต URL จริงของภาพ
        width: 1200,
        height: 630,
        alt: "Shorten Your Link | hrefly.co",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shorten Your Link | hrefly.co",
    description: "Effortlessly shorten and manage your URLs with real-time tracking.",
    site: "@hrefly", // ✅ ใส่ Twitter handle ถ้ามี
    creator: "@hrefly",
    images: ["https://hrefly.co/twitter-card.jpg"], // ✅ Twitter card image
  },
};

export default function Page() {

  return (
    <SessionComponent NoSessionComponent={HomeNoneLogin} InSessionComponent={HomeLoggedIn} />
  )
}
  