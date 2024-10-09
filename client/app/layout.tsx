// components/layout.js

import React from "react";
import { ReactElement, useEffect, useState } from "react";

import Navbar from "components/navbar";
// import Footer from './footer'
import { Metadata, Viewport } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
  viewport: "width=device-width, initial-scale=1",
};

 
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

interface LayoutProps {
  children: ReactElement | React.ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          as="style"
          // crossorigin
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <div className="fixed flex flex-col w-screen h-full align-center-top bg-primary overflow-y-auto overflow-x-hidden">
          <Navbar />
          <main className="flex flex-1 flex-col w-full align-center-top items-center contents-center bg-primary  pt-[60px] relative ">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
