// Next Page : Program

import { NextPage } from "next";
import XBar from "components/x-bar";
import XWrapper from "components/x-wrapper";
import programTextPairList from "wordings/program";
import { useState } from "react";
import useWindowSize from "utils/useWindowSize";

const ProgramPage: NextPage = () => {
  const { isMobileView } = useWindowSize();
  const isMobile = isMobileView;
  const barTextPairList = programTextPairList;

  const [selectedBarIndex, setSelectedBarIndex] = useState(-1);
  const onBarClick = (index: number) => {
    if (selectedBarIndex === index) {
      setSelectedBarIndex(-1);
    } else {
      setSelectedBarIndex(index);
    }
  };

  return (
    <div className="bg-white w-full h-full flex flex-col justify-start">
      {barTextPairList.map((barTextPair, index) => (
        <div key={index}>
          <XBar
            key={index}
            index={index}
            leftTitle={barTextPair.leftTitle}
            rightTitle={barTextPair.rightTitle}
            isChildrenShown={index == selectedBarIndex}
            onClick={() => onBarClick(index)}
          >
            <div
              className="transition-all duration-500 ease-in-out flex flex-column overflow-y-auto no-scrollbar"
              style={{
                height: index == selectedBarIndex ? "50vh" : 0,
              }}
            >
              {index == selectedBarIndex ? (
                <XWrapper>
                  <div className="flex flex-col px-4 py-8 md:p-0 m-0 md:mt-12  no-scrollbar">
                    {barTextPair.paragraphs.map((paragraph, blockIndex) => {
                      return (
                        <div
                          className={
                            "flex flex-col " +
                            (index == 2 && !isMobile
                              ? blockIndex == 0
                                ? " mb-[40px]"
                                : " h-[180px]"
                              : "")
                          }
                          key={"wrapper" + blockIndex}
                        >
                          {paragraph.header ? (
                            <div className="flex flex-row mb-6">
                              <p className="text-base font-bold">
                                {paragraph.header}
                              </p>
                            </div>
                          ) : null}
                          <div></div>
                          <div
                            key={blockIndex}
                            className="flex flex-col md:flex-row "
                          >
                            <div className="flex flex-1 flex-row h-full justify-start items-start mb-6">
                              <p
                                className={`whitespace-pre-wrap break-keep md:pr-16 mr-auto ${
                                  paragraph.left.type == "bold"
                                    ? "text-base font-bold"
                                    : "mytext-1 text-sm"
                                }`}
                              >
                                {paragraph.left.text}
                              </p>
                            </div>
                            <div className="flex flex-1 flex-row w-full h-full justify-start items-start mb-12">
                              <p className="whitespace-pre-wrap break-keep md:pr-16 mytext-1 text-myblack">
                                {paragraph.right.text}
                              </p>
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
        </div>
      ))}
    </div>
  );
};

export default ProgramPage;
