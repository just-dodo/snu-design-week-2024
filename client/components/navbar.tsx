// Next Component : Navbar
//
import React, { ReactElement, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useWindowSize from "utils/useWindowSize";
import { useAnimationDataStore, AnimationData } from "utils/animationStore";
import MobileMenuOverlay from "./mobile-menu-overlay";
import Menu from "icons/Menu";
//

export default function Navbar(): ReactElement {
  const router = useRouter();
  const { isMobileView } = useWindowSize();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathList = ["home", "about", "works", "people", "program", "partners"];
  const basePath = "/";
  const isHome = router.pathname === basePath;
  const isAnimationFinished = useAnimationDataStore(
    (state: AnimationData) => state.isAnimationFinished
  );
  const isShown = isAnimationFinished || !isHome;
  const navBackgroundPosition = isShown
    ? "translate-y-[60px]"
    : "translate-y-0";

  const isUnknownPath = !(
    pathList.includes(router.pathname.split("/")[2]) || isHome
  );

  const navList = pathList
    .filter((path) => (isMobileView ? true : path !== "home"))
    .map((path) => {
      const isActive =
        router.pathname.startsWith(`${basePath}/${path}`) ||
        (router.pathname === basePath && path === "home");
      let navPosition;
      if (isActive && isShown) {
        navPosition = "translate-y-0";
      } else if (!isActive && isShown) {
        navPosition = "translate-y-4";
      } else {
        navPosition = "translate-y-12";
      }

      const activeNavColor = isActive ? "bg-secondary" : "bg-white";
      return (
        <>
          {isMobileView ? (
            <>
            </>
          ) : (
            <Link
              href={path != "home" ? basePath + path : basePath}
              key={"nav-component-" + path}
              className="z-50 h-full flex flex-row items-center justify-center"
            >
              <p className="text-xl text-secondary font-semibold ">
                {path.toUpperCase()}
              </p>
            </Link>
          )}
        </>
      );
    });

  if (!isMobileView) {
    return (
      <>
        <nav
          className={`fixed z-50 bg-primary min-h-[40px] w-screen flex flex-row flex-0 justify-between items-center px-[40px] py-[20px] ${router.pathname != "/" ? "border-b-primary border-b" : null
            }`}
        >
          <Link href="/">
            <p className="text-secondary font-bold text-[35px]">
              SNU DESIGN WEEK 2024
            </p>
          </Link>
          <div className="flex flex-row items-center justify-center gap-10">
            {navList}
          </div>
          {/* white line */}
          {isHome && (
            <div className="absolute bottom-1 h-0.5 bg-secondary w-full max-w-[calc(100%-80px)]" />
          )}
        </nav>
      </>
    );
  } if (!isHome) {
    return (
      <>
        <MobileMenuOverlay isVisible={isMobileMenuOpen} setIsVisible={setIsMobileMenuOpen} />
        <nav className="flex flex-row justify-between px-[24px] h-[49px] bg-primary w-full items-center">
          <div>
            SNUD2024
          </div>
          <div>
            {router.pathname.split("/")[1]}
          </div>
          <div onClick={() => setIsMobileMenuOpen(true)}>
            <Menu />
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
      </>
    )
  }
}
