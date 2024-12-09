import { VISUALIDENTITY } from "constants/about"
import _useWindowSize from 'utils/useWindowSize';
import Image from "next/image";

export default function VisualIdentity() {
  const { isMobileView } = _useWindowSize();

  return (
    <div className="w-full flex flex-col md:gap-[50px] gap-[20px]">
      <div className="flex flex-col text-primary md:text-[32px] text-[20px] tracking-[-0.2px] md:tracking-normal">
        <div className="font-[600] md:font-[700]">
          전시 비주얼 아이덴티티
        </div>
        {
          !isMobileView &&
          <div className="font-[600] md:font-[700]">
            Visual Identity
          </div>
        }
      </div>
      <div className="flex justify-center">
        <div className="md:w-[497px] w-[233px] shadow-[0px_3px_14px_0px_rgba(0,0,0,0.30)]">
          <Image
            src="/img/main-poster.png"
            alt="main-poster"
            width={isMobileView ? 233 : 497}
            height={isMobileView ? 330 : 703}
          />
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 md:gap-[40px] gap-[20px] text-justify">
        <div className="md:w-[430px] w-full text-[15px] text-primary font-[400] leading-[24px] text-justify">
          {VISUALIDENTITY.kor[0]}
        </div>
        {!isMobileView &&
          <div className="md:w-[430px] w-full text-[15px] tracking-[-0.165px] text-primary font-[400] leading-[24px] text-justify">
            {VISUALIDENTITY.eng[0]}
          </div>
        }
        <div className="md:w-[430px] w-full text-[15px] text-primary font-[400] leading-[24px] text-justify">
          {VISUALIDENTITY.kor[1]}
        </div>
        {!isMobileView &&
          <div className="md:w-[430px] w-full text-[15px] tracking-[-0.165px] text-primary font-[400] leading-[24px] text-justify">
            {VISUALIDENTITY.eng[1]}
          </div>
        }
      </div>
      <div className="flex flex-col mt-[40px] md:mt-[0px] text-primary md:text-[32px] text-[20px] tracking-[-0.2px] md:tracking-normal">
        <div className="font-[600] md:font-[700]">
          모션 포스터
        </div>
        {
          !isMobileView &&
          <div className="font-[600] md:font-[700]">
            Motion Poster
          </div>
        }
      </div>
      <div className="flex justify-center">
        <div className="md:w-[497px] w-[233px] shadow-[0px_3px_14px_0px_rgba(0,0,0,0.30)]">
          <Image
            src="/img/motion-poster.gif"
            alt="motion-poster"
            width={isMobileView ? 233 : 497}
            height={isMobileView ? 330 : 703}
            unoptimized={true}
          />
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 md:gap-[40px] gap-[20px] text-justify">
        <div className="md:w-[430px] w-full text-[15px] text-primary font-[400] leading-[24px] text-justify">
          {VISUALIDENTITY.kor[2]}
        </div>
        {!isMobileView &&
          <div className="md:w-[430px] w-full text-[15px] tracking-[-0.165px] text-primary font-[400] leading-[24px] text-justify">
            {VISUALIDENTITY.eng[2]}
          </div>
        }
      </div>
    </div>
  )
}