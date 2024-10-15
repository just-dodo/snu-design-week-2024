"use client";
// Next Component : Navbar
//
import React, { ReactElement, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useWindowSize from "utils/useWindowSize";
import { useAnimationDataStore, AnimationData } from "utils/animationStore";
import Image from "next/image";
import mobileNavButtonBlue from "assets/mobile-nav-button-blue.png";
import mobileNavButtonWhite from "assets/mobile-nav-button-white.png";
//

export default function Navbar(): ReactElement {
  const { windowSize, isMobile } = useWindowSize();
  const pathList = ["home", "about", "works", "people", "program", "partners"];
  const basePath = "/";
  const currentPath = usePathname() || basePath;

  const isHome = currentPath === basePath;
  const isAnimationFinished = useAnimationDataStore(
    (state: AnimationData) => state.isAnimationFinished
  );
  const isShown = isAnimationFinished || !isHome;
  const navBackgroundPosition = isShown
    ? "translate-y-[60px]"
    : "translate-y-0";

  const isUnknownPath = !(
    pathList.includes(currentPath.split("/")[2]) || isHome
  );

  const navList = pathList
    .filter((path) => (isMobile ? true : path !== "home"))
    .map((path) => {
      const isActive =
        currentPath.startsWith(`${basePath}/${path}`) ||
        (currentPath === basePath && path === "home");
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
          {isMobile ? (
            <Link
              href={path != "home" ? "/" + path : "/"}
              key={"nav-component-" + path}
              className="z-50 w-full"
              onClick={() => {
                setIsMobileMenuShown(false);
              }}
            >
              <div
                className={`align-center-left px-3 w-full md:my-0 md:w-60 h-11 cut-topright ${activeNavColor}`}
              >
                <p className="text-xl text-primary  ">
                  {path.toUpperCase().replace("-", " ")}
                </p>
              </div>
            </Link>
          ) : (
            <Link
              href={path != "home" ? "/" + path : "/"}
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

  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);
  /// set MobileNavColor to white when home, else to primary
  const mobileNavBackgroundColor = "bg-primary";

  if (!isMobile) {
    return (
      <>
        <nav
          className={`fixed z-50 bg-primary min-h-[40px] w-screen flex flex-row flex-0 justify-between items-center px-[40px] py-[20px] ${
            currentPath != "/" ? "border-b-primary border-b" : null
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
          <div className="absolute bottom-1 h-0.5 bg-secondary w-full max-w-[calc(100%-80px)]" />
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav
          className={`fixed top-0 ${mobileNavBackgroundColor} md:bg-primary h-[60px] min-h-[60px] w-screen flex flex-row flex-0 z-40 justify-between items-center ${
            currentPath != "/" ? "border-b-primary border-b" : null
          }`}
        >
          {navList.map((nav, index) => {
            if (
              nav.props.children.props.children.props.className.includes(
                "bg-secondary"
              ) ||
              isUnknownPath
            ) {
              return (
                <div
                  key={"mobile-nav-component-" + index}
                  className={`w-60 h-full flex items-end`}
                >
                  {nav.props.children.props.children.props.children.props
                    .children != "HOME" && !isUnknownPath
                    ? nav
                    : null}
                </div>
              );
            }
          })}
          <Image
            src={isHome ? mobileNavButtonBlue : mobileNavButtonWhite}
            alt="mobile-header-button"
            width={28}
            height={28}
            style={{ marginRight: "1rem", zIndex: 50 }}
            onClick={() => setIsMobileMenuShown(!isMobileMenuShown)}
          />
        </nav>
        {isMobileMenuShown ? (
          <div
            className="fixed top-0 right-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] z-40"
            onClick={() => setIsMobileMenuShown(!isMobileMenuShown)}
          >
            <div
              className={`absolute top-0 right-0 w-3/5 h-screen bg-primary z-50`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mt-[60px]">
                {navList.map((nav, index) => {
                  return (
                    <div
                      key={"mobile-nav-button-" + index}
                      className={`w-full h-full mb-5`}
                    >
                      {nav}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
