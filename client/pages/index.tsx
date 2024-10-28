import React, { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { AnimationDirection } from "lottie-web";
import { NextPage } from "next";
import webMotionAnimation from "assets/web_motion3.json";
import mobileMotionAnimation from "assets/mobile_motion3.json";
import Marquee from "react-fast-marquee";
import { useAnimationDataStore, AnimationData } from "utils/animationStore";
import { useRatio } from "utils/useRatio";
import SearchAndInstagram from "components/search-and-instagram";
import MainDescription from "components/main-description";
import Image from "next/image";
import partnersLogo from "assets/landing-partners-logo.png";
import Link from "next/link";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";

const Landing: NextPage = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const ratio = useRatio();

  return (
    <div className="bg-primary w-full h-full relative">
      {!isMobileView ? (
        <>
          <SearchAndInstagram />
          <MainDescription />
          <div className="absolute bottom-0 w-full mb-[40px]">
            <Marquee gradient={false} speed={50}>
              <Image
                src={partnersLogo}
                alt="partners-logo"
                width={ratio.width * 1287}
                height={ratio.height * 40}
              />
            </Marquee>
          </div>
          <div
            className={`absolute bottom-[120px] left-[50%] transform -translate-x-1/2 w-[calc(100%-240px)]`}
          >
            <Image
              src="/img/main-page-animation.webp"
              alt="main-page-animation"
              width={1364 * ratio.width}
              height={466 * ratio.width}
              unoptimized={true}
              priority={true}
            ></Image>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Landing;
