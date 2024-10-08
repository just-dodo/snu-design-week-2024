import React, { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { AnimationDirection } from "lottie-web";
import { NextPage } from "next";
import webMotionAnimation from "assets/web_motion3.json";
import mobileMotionAnimation from "assets/mobile_motion3.json";
import Marquee from "react-fast-marquee";
import useWindowSize from "utils/useWindowSize";
import { useAnimationDataStore, AnimationData } from "utils/animationStore";
import { useRatio } from "utils/useRatio";
import Image from "next/image";
import partnersLogo from "assets/landing-partners-logo.png";
import Link from "next/link";
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight";

const Landing: NextPage = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const windowSize = useWindowSize();
  const [direction, setDirection] = useState<AnimationDirection>(1);
  const [isAnimationFinished, setIsAnimationFinished] = useAnimationDataStore(
    (state: AnimationData) => [
      state.isAnimationFinished,
      state.setIsAnimationFinished,
    ]
  );
  const [isMobileView, setIsMobileView] = useState(false);
  const ratio = useRatio();

  function playReverse() {
    const newDirection: AnimationDirection = direction === 1 ? -1 : 1;

    if (lottieRef.current) {
      lottieRef.current.setDirection(newDirection);
      lottieRef.current.play();
      setDirection(newDirection);
    }
  }

  const [style, setStyle] = useState({ width: 0, height: 0 });
  const [lottieSize, setLottieSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setStyle({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    if (windowSize.width < 768) {
      setLottieSize({
        width: windowSize.width,
        height: windowSize.height,
      });
      setIsMobileView(true);
    } else {
      setLottieSize({
        width: windowSize.width,
        height: windowSize.height,
      });
      setIsMobileView(false);
    }
  }, [windowSize]);

  if (!isAnimationFinished) {
    setTimeout(() => {
      setIsAnimationFinished(true);
    }, 1100);
  }

  return (
    <>
      <div
        className="bg-primary overflow-hidden touch-none"
        style={{
          width: isMobileView ? ratio.width * 393 : ratio.width * 1600,
        }}
      >
        {/* <div className="absolute flex flex-col mx-6 md:m-10 z-30">
          <div className="flex flex-col md:flex-row ">
            <div>
              <p className="whitespace-pre-wrap break-keep text-2xl md:text-3xl text-secondary pb-3 md:pr-8 font-medium articulat">
                {
                  "SNU DESIGN WEEK 2022\nDOCUMEN:\nTRACKING THE DOCS\n22.12.08-11"
                }
              </p>
            </div>
            <div>
              <p className="whitespace-pre-wrap break-keep text-2xl md:text-3xl text-secondary font-medium articulat">
                {
                  "Seoul National University\nCollege Of Fine Arts\nDepartment of Design\nDegreeshow"
                }
              </p>
            </div>
          </div>
          {isMobileView ? null : (
            <div className="mt-0">
              <Link
                className="whitespace-pre-wrap break-keep text-xl text-secondary md:text-secondary  border-secondary md:border-secondary border-b-2"
                href={"/offline-highlight"}
              >
                Offline Exhibition Highlight
                <BsArrowRight className="inline-block ml-2" />
              </Link>
            </div>
          )}
        </div> */}
        <div
          className={`absolute bottom-0 overflow-hidden flex flex-row justify-center items-center`}
          style={{
            width: isMobileView ? ratio.width * 393 : ratio.width * 1600,
            height: isMobileView ? ratio.height * 624 : ratio.height * 693,
          }}
        >
          <Lottie
            style={{
              width: isMobileView
                ? ratio.width * 2 * 393
                : ratio.width * 2 * 1600,
              height: isMobileView
                ? ratio.height * 2 * 624
                : ratio.height * 2 * 693,
            }}
            lottieRef={lottieRef}
            animationData={
              isMobileView ? mobileMotionAnimation : webMotionAnimation
            }
            loop={false}
            autoplay={true}
            initialSegment={[0, 65]}
            onComplete={() => {
              playReverse();
              setIsAnimationFinished(true);
            }}
          />
        </div>
        {!isMobileView ? (
          <div className="absolute bottom-0 w-full mb-4">
            <Marquee gradient={false} speed={50}>
              <Image
                src={partnersLogo}
                alt="partners-logo"
                width={ratio.width * 1287}
                height={ratio.height * 40}
              />
            </Marquee>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Landing;
