import { clientURL } from "@/config/keys";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "../config/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(clientURL),
  title: "Stonk Visualizer",
  description:
    "An app for visualizing financial statements of public companies.",
  applicationName: "Stonk Visualizer",
  keywords: "stonk, visualizer, financial, statements, public, companies",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://stonkvisualizer.com",
    title: "Stonk Visualizer",
    description:
      "An app for visualizing financial statements of public companies.",
    images: [],
    siteName: "Stonk Visualizer",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-100">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        ></meta>
      </Head>
      <body className={`overscroll-none ${inter.className}`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
