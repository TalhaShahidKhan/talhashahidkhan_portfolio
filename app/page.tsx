import { Metadata } from "next";
import HomeClient from "./page.client";

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Talha Shahid Khan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph.jpg"],
  },
};

export default function Home() {
  return <HomeClient />;
}
