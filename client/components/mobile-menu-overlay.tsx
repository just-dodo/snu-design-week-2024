import { useEffect } from "react";
import _useWindowSize from "utils/useWindowSize";
import Link from "next/link";
import CloseMenuMobile from "icons/CloseMenuMobile";
import SearchMobile from "icons/SearchMobile";
import InstagramMobile from "icons/InstagramMobile";

export default function MobileMenuOverlay({ isVisible, setIsVisible }: { isVisible: boolean, setIsVisible: Function }) {
  const linkList = ["home", "about", "works", "program", "people", "partners"];
  const { windowSize } = _useWindowSize();

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed left-0 top-0 w-full h-full z-50 bg-primary">
        <div className="absolute right-[24px] top-[17px] z-30" onClick={() => setIsVisible(false)}>
          <CloseMenuMobile />
        </div>
        <div className="absolute w-full h-full left-0 top-0">
          <div className="flex flex-col justify-center items-center w-full h-full gap-[30px] z-30">
            {linkList.map((link, index) => (
              <div key={index} className="h-fit">
                <Link href={`/${link === 'home' ? '' : link}`} onClick={() => setIsVisible(false)}>
                  <p className="text-secondary text-[31px] font-[700] leading-8">
                    {link.toUpperCase()}
                  </p>
                </Link>
              </div>
            ))}
            <div className="flex flex-row gap-[20px]">
              <Link href="/search" onClick={() => setIsVisible(false)}>
                <SearchMobile />
              </Link>
              <Link href="https://www.instagram.com/snudesignweek/">
                <InstagramMobile />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};