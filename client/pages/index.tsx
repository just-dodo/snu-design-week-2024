import React, { useState } from "react";
import { NextPage } from "next";
import Marquee from "react-fast-marquee";
import { useRatio } from "utils/useRatio";
import SearchAndInstagram from "components/search-and-instagram";
import MainDescription from "components/main-description";
import Image from "next/image";
import partnersLogo from "assets/landing-partners-logo.png";
import _useWindowSize from "utils/useWindowSize";
import Menu from "icons/Menu";
import MobileMenuOverlay from "components/mobile-menu-overlay";

const Landing: NextPage = () => {
  const { isMobileView, windowSize } = _useWindowSize();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const ratio = useRatio();

  return (
    <div className="bg-primary flex flex-col h-screen w-full relative overflow-hidden">
      {!isMobileView ? (
        <div className="pt-[92px]">
          <SearchAndInstagram />
          <MainDescription />
          <div className="absolute bottom-0 w-full mb-[20px] z-20">
            <Marquee gradient={false} speed={50}>
              <Image
                src={partnersLogo}
                alt="partners-logo"
                width={ratio.width * 1476}
                height={ratio.height * 50}
              />
            </Marquee>
          </div>
          <div
            className={`flex absolute left-[50%] transform -translate-x-1/2 w-full top-[92px] justify-center`}
          >
            <Image
              src="/img/pc-main-animation.webp"
              alt="main-page-animation"
              width={ratio.width * 1920 > 1920 ? 1920 : ratio.width * 1920}
              height={ratio.width * 1080}
              unoptimized={true}
              priority={true}
            ></Image>
          </div>
        </div>
      ) : (
        <>
          <MobileMenuOverlay isVisible={isMobileMenuOpen} setIsVisible={setIsMobileMenuOpen} />
          <div className="absolute w-full h-full overflow-hidden">
            <Image
              src="/img/mobile-main-animation.webp"
              alt="main-page-animation"
              width={393 * ratio.width}
              height={windowSize.height}
              unoptimized={true}
              priority={true}
            />
          </div>

          {!isMobileMenuOpen &&
            <>
              <div
                style={{
                  background: 'linear-gradient(180deg, #E22613 21.5%, rgba(226, 38, 19, 0.0) 80.5%)',
                }}
                className="absolute top-0 w-full h-[200px]">
              </div>
              <div className="absolute right-[24px] top-[24px] z-30" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu />
              </div>
              <div className="flex flex-col mt-[70px] gap-[11px] ml-[23px] z-10">
                <div className="text-secondary text-[30px] font-[700] whitespace-pre-line leading-[37px] tracking-[-0.3px]">
                  {`SNU DESIGN WEEK\n2024\n애벌레 행동`}
                </div>
                <div className="text-secondary text-[12px] font-[500] leading-[18px] whitespace-pre-line tracking-[-0.12px]">
                  {`2024.11.30.THU - 2024.12.05.TUE 10AM - 6PM\n1, GWANAK-RO, GWANAK-GU, SEOUL\n49, COLLEGE OF FINE ARTS, SEOUL NAT’L UNIVERSITY`}
                </div>
              </div>
            </>}
        </>
      )}
    </div>
  );
};

export default Landing;
