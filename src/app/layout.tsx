import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DepViz",
  description: "DepViz is a developer tool designed to simplify the process of understanding and managing project dependencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-BHGHLLLRFL`}
        />

        <Script id="ga-script" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BHGHLLLRFL', {
              page_path: window.location.pathname,
            });
        `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
