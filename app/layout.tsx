import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const permanentMarker = localFont({
  src: "./fonts/PermanentMarker-Regular.ttf",
  variable: "--font-permanent-marker",
  weight: "400",
});

const karla = localFont({
  src: "./fonts/Karla-Regular.ttf",
  variable: "--font-karla",
  weight: "400",
});

const acme = localFont({
  src: "./fonts/Acme-Regular.ttf",
  variable: "--font-acme",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Peak Planner",
  description: "Time management app for peak productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${acme.className} ${permanentMarker.variable} ${karla.variable} bg-blue-darker antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
