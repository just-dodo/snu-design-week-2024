import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import _useWindowSize from "utils/useWindowSize";
import { useRatio } from "utils/useRatio";
import CloseMenu from "icons/CloseMenu";
import Link from "next/link";
import { InstagramIcon } from "icons/Instagram";
import { SearchIcon } from "icons/Search";


export default function MobileMenuOverlay({ isVisible, setIsVisible }: { isVisible: boolean, setIsVisible: Function }) {
  const linkList = ["home", "about", "works", "program", "people", "partners"];
  const router = useRouter();
  const { windowSize } = _useWindowSize();
  const ratio = useRatio();

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
        <div className="absolute right-[24px] top-[49px] z-30" onClick={() => setIsVisible(false)}>
          <CloseMenu />
        </div>
        <div className="absolute w-full h-full left-0 top-0">
          <div className="flex flex-col justify-center items-center w-full h-full gap-[30px] z-30">
            {linkList.map((link, index) => (
              <div key={index}>
                <Link href={`/${link === 'home' ? '' : link}`} onClick={() => setIsVisible(false)}>
                  <div className="text-secondary text-[31px] font-[700]">
                    {link.toUpperCase()}
                  </div>
                </Link>
              </div>
            ))}
            <div className="flex flex-row gap-[20px]">
              <Link href="/search" onClick={() => setIsVisible(false)}>
                <SearchIcon color='#FFEFD3' />
              </Link>
              <Link href="https://www.instagram.com/snudesignweek/">
                <InstagramIcon color="#FFEFD3"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};