// components/layout.js

import { useRouter } from "next/router";
import React from "react";
import { ReactElement, useEffect, useState } from "react";
import _useWindowSize from "utils/useWindowSize";

import Navbar from "./navbar";
// import Footer from './footer'

interface LayoutProps {
  children: ReactElement;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const topRef = React.useRef<HTMLDivElement>(null);

  const { isMobileView } = _useWindowSize();
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
      {isMobileView && isHome &&
        <div
          style={{
            background: 'linear-gradient(180deg, #E22613 21.5%, rgba(226, 38, 19, 0.0) 80.5%)',
          }}
          className="absolute top-0 w-full h-[216px] z-20">
        </div>}
      <Navbar />
      <main
        ref={topRef}
        className={`flex flex-1 flex-col w-full max-h-screen align-center-top items-center contents-center ${bgColor} relative ${isHome ? 'pt-[47px]' : 'pt-[102px]'} md:pt-0`}
      >
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
