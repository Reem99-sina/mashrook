import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script'
import { Cairo } from "next/font/google";
import { ReduxProvider } from "./components/provider/ReduxProvider";
import ToasterContext from "./components/provider/ToasterProvider";
// const inter = Inter({ subsets: ["latin"] });
require("dotenv").config()
const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "مشروك",
  description: "منصة مشروك العقارية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>
      <link
      rel="stylesheet"
      href="https://cdn.moyasar.com/mpf/1.7.3/moyasar.css"
    />
    </head>
      <body className={cairo.className}>
        <div className="flex items-center justify-center min-h-screen bg-[#DCE9E5]">
          <div className="md:w-[27.5rem] lg:w-[27.5rem] sm:w-full">
          <ReduxProvider>
          <ToasterContext/>
          {children}
          </ReduxProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
