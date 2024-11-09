// components/layout.js

import { useRouter } from "next/router";
import React from "react";
import { ReactElement, useEffect, useState } from "react";

import Navbar from "./navbar";
// import Footer from './footer'

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const topRef = React.useRef<HTMLDivElement>(null);
  function scrollTop() {
    if (topRef.current) {
      topRef.current.scrollIntoView();
      // window.scrollTo({
      //   top: topRef.current.offsetTop ,
      // });
    }
  }
  const router = useRouter();
  // scroll to top when router's path is changed

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      scrollTop();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const isHome = router.pathname === "/";
  const bgColor = isHome ? "bg-primary" : "bg-secondary";

  return (
    <div
      className={`flex flex-col w-full h-full align-center-top ${bgColor} overflow-x-hidden`}
    >
      <Navbar />
      <main
        ref={topRef}
        className={`flex flex-1 flex-col w-full align-center-top items-center contents-center ${bgColor} relative pt-[102px] md:pt-0`}
      >
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
