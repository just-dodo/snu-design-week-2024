import React from "react";
import XWrapper from "./x-wrapper";
import buttonImage from "assets/button.png";
import Image from "next/image";
interface Props {
  index: number;
  isChildrenShown?: boolean;
  children?: React.ReactElement;
  leftTitle: string;
  rightTitle: string;
  onClick?: () => void;
}

export default function XBar({
  isChildrenShown,
  children,
  leftTitle,
  rightTitle,
  onClick,
}: Props): React.ReactElement {
  return (
    <div className="w-full">
      <div
        className={`flex flex-col h-14 w-full bg-white text-primary text-xl border-y-primary border-b cursor-pointer align-center-top `}
        onClick={onClick}
      >
        <XWrapper>
          <div className="flex flex-row w-full h-full justify-between px-4 md:px-0">
            <div className="flex md:flex-1 flex-row w-full h-full justify-start items-center">
              <p className="text-lg leading-5 bg-red align-bottom font-bold">
                {leftTitle}
              </p>
            </div>
            <div className="flex md:flex-1 flex-row h-full justify-end md:justify-between items-center">
              <p className="hidden md:inline text-lg leading-5 align-bottom font-bold">
                {rightTitle}
              </p>
              <div className="flex flex-row ml-4 h-full justify-center items-center">
                {isChildrenShown ? (
                  <Image
                    src={buttonImage}
                    alt="buttonImage"
                    width={24}
                    height={24}
                    className="transform rotate-180 trasition-all duration-500 ease-in-out"
                  />
                ) : (
                  <Image
                    src={buttonImage}
                    alt="buttonImage"
                    width={24}
                    height={24}
                    className="transform rotate-0 trasition-all duration-100 ease-in-out"
                  />
                )}
              </div>
            </div>
          </div>
        </XWrapper>
      </div>
      {children ? (
        <div
          className={`align-center-top flex-1 w-full bg-white text-primary text-xl ${
            isChildrenShown ? "border-y-primary border-b" : null
          }`}
        >
          <XWrapper>{children}</XWrapper>
        </div>
      ) : null}
    </div>
  );
}
