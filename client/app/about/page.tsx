"use client";
// Next Page : About

import XBar from "components/x-bar";
import XWrapper from "components/x-wrapper";
import { NextPage } from "next";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import aboutTextPairList from "wordings/about";
import aboutImageFile from "assets/about-web-background.png";
import useWindowSize from "utils/useWindowSize";
import { useRatio } from "utils/useRatio";
// Path: snu-design-week-2022/pages/about.tsx

const About: NextPage = () => {
  const router = useRouter();
  const barTextPairList = aboutTextPairList;
  const [selectedBarIndex, setSelectedBarIndex] = useState(-1);
  const prevHistoryLength = useRef(0);
  const {windowSize} = useWindowSize();
  const isMobile = windowSize.width < 768;
  const ratio = useRatio();

  useEffect(() => {
    // if (prevHistoryLength.current > window.history.length) {
    //   prevHistoryLength.current = window.history.length;
    // } else {
    setSelectedBarIndex(-1);
    // }
  }, [router]);

  const imgContainerRef = useRef<any>();
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight(imgContainerRef.current!.clientHeight);
  }, [imgContainerRef]);

  const onBarClick = (index: number) => {
    if (selectedBarIndex === index) {
      setSelectedBarIndex(-1);
    } else {
      setSelectedBarIndex(index);
    }
  };

  return (
    <div className="flex flex-col justify-start md:h-full w-full bg-primary overflow-y-scroll">
      <div
        className="w-screen flex flex-1 overflow-x-hidden overflow-y-auto md:overflow-y-hidden relative justify-center h-full"
        ref={imgContainerRef}
      >
        {!isMobile ? (
          <Image
            className="absolute right-0 top-[58px]"
            src={aboutImageFile}
            alt="about page background image"
            width={ratio.width * 732}
            height={526}
          />
        ) : null}
        <XWrapper
          className={`z-10 md:h-0 ${
            selectedBarIndex === -1 ? "h-full" : "h-0"
          }`}
        >
          <div className="w-full h-fit md:h-full flex flex-1 flex-col px-6 py-5 md:p-0">
            <p className="whitespace-pre-wrap break-keep text-2xl md:text-3xl text-white pb-5 pt-4 md:py-14 md:pr-8 font-medium">
              {"SNU DESIGN WEEK 2022\nDOCUMEN:\nTRACKING THE DOCS"}
            </p>
            <p className="whitespace-pre-wrap break-keep text-[1.1rem] leading-7 text-white pb-5 md:pb-6 md:pr-8 font-bold">
              기록으로부터 발견하는 우리.
            </p>
            <p className="whitespace-pre-wrap break-keep mytext-1 text-white pb-5 md:pb-3 md:pr-8 font-medium">
              앞으로 나아가야 할 때, 우리는 지나온 시간을 되짚어봅니다. 과거에
              쓴 일기, 스치듯 적은 생각, 바랜 사진, 물건들 속을 탐색하며
              스스로의 변화를 발견합니다. 기록 DOCUMENT으로부터 경험의 가치를
              발견하고 발전해나가는 우리는 도큐맨DOCUMEN입니다.
            </p>
            <p className="whitespace-pre-wrap break-keep mytext-1 text-white pb-5 md:pb-3 md:pr-8 font-medium">
              SNU DESIGN WEEK 2022는 과거와 현재를 넘나드는 다양한 차원의 기록을
              되짚는 과정에 모두를 초대합니다. 행동하고 기록하고 탐색하며 다시
              움직이는 힘에 대해 함께 고민하고, 그 흐름 속에서 축적된 다양한
              시선을 공유합니다.
            </p>
          </div>
          {!isMobile ? (
            <div className="w-full h-full flex flex-1 flex-col">
              <p className="whitespace-pre-wrap break-keep mytext-1 text-white pt-[268px] pb-3 md:pr-8 font-medium">
                asted since 2019 has paradoxically revealed the importance of
                connection through disconnection. Now, in 2021, the sense of
                connection between individual behavior and society has become
                stronger than ever before. This allowed student designers to
              </p>
              <p className="whitespace-pre-wrap break-keep mytext-1 text-white pb-3 md:pr-8 font-medium">
                Our strong will to create a connection with society through
                design was born from this act of revisiting our daily lives,
                where social distancing has become a new standard. To
                communicate more actively, we will
              </p>
            </div>
          ) : (
            <div></div>
          )}
        </XWrapper>
      </div>
      {barTextPairList.map((barTextPair, index) => (
        <XBar
          key={index}
          index={index}
          leftTitle={barTextPair.leftTitle}
          rightTitle={barTextPair.rightTitle}
          isChildrenShown={index == selectedBarIndex}
          onClick={() => onBarClick(index)}
        >
          <div
            className="transition-all duration-500 ease-in-out flex flex-column overflow-y-auto"
            style={{
              height: index == selectedBarIndex ? containerHeight : 0,
            }}
          >
            {index == selectedBarIndex ? (
              <XWrapper>
                <div className="flex flex-col px-4 py-8 md:p-0 m-0 md:mt-12">
                  {barTextPair.paragraphs.map((paragraph, blockIndex) => {
                    return (
                      <div
                        className="flex flex-col"
                        key={"wrapper" + blockIndex}
                      >
                        {paragraph.header ? (
                          <div className="flex flex-row mb-6">
                            <p className="text-base font-bold">
                              {paragraph.header}
                            </p>
                          </div>
                        ) : null}
                        <div
                          key={blockIndex}
                          className={
                            "flex flex-col md:flex-row" +
                            (index == 1 && !isMobile
                              ? blockIndex == 0
                                ? " mb-[40px]"
                                : " h-[80px]"
                              : "")
                          }
                        >
                          {!(
                            paragraph.left.type !== "img" &&
                            paragraph.left.text == "" &&
                            isMobile
                          ) && (
                            <div className="flex flex-1 flex-row h-full justify-start items-start mb-6">
                              {paragraph.left.type !== "img" ? (
                                <p
                                  className={`whitespace-pre-wrap break-keep md:pr-16 mr-auto ${
                                    paragraph.left.type == "bold"
                                      ? "text-base font-bold"
                                      : " mytext-1"
                                  } ${
                                    paragraph.left.text != "" ? "" : " hidden"
                                  }`}
                                >
                                  {paragraph.left.text}
                                </p>
                              ) : (
                                <Image
                                  src={paragraph.left.text}
                                  alt="aboutImage"
                                  width={528}
                                  height={810}
                                />
                              )}
                            </div>
                          )}
                          <div
                            className={`flex flex-1 flex-row w-full h-full justify-start items-start mb-12 ${
                              paragraph.right.text != "" ? "" : " hidden"
                            }`}
                          >
                            {paragraph.right.type !== "img" ? (
                              <p
                                className={`whitespace-pre-wrap break-keep md:pr-16  mytext-1 text-myblack`}
                              >
                                {/* @ts-ignore */}
                                {paragraph.right.text.includes?.("CUBY STUDIO")
                                  ? (paragraph.right.text as string)
                                      .split?.("CUBY STUDIO")
                                      .map((text: string, index: number) => {
                                        if (index == 0) {
                                          return (
                                            <>
                                              {text}
                                              <a
                                                href="https://studio.cuby.world/"
                                                target="_blank"
                                                className="underline" rel="noreferrer"
                                              >
                                                CUBY STUDIO
                                              </a>
                                            </>
                                          );
                                        } else return text;
                                      })
                                  : paragraph.right.text}
                              </p>
                            ) : (
                              <Image
                                src={paragraph.right.text}
                                alt="aboutImage"
                                width={528}
                                height={810}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </XWrapper>
            ) : null}
          </div>
        </XBar>
      ))}
    </div>
  );
};

export default About;
