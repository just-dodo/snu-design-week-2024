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
        <Image
          src={
            isMobileView
              ? "/img/visual-identity-apple-caterpillar-mobile.svg"
              : "/img/visual-identity-apple-caterpillar.svg"
          }
          alt={isMobileView ? "visual-identity-mobile" : "visual-identity"}
          width={isMobileView ? 226 : 354}
          height={isMobileView ? 113 : 209}
        />
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
      </div>
      <div className="flex flex-col text-primary md:text-[32px] text-[20px] tracking-[-0.2px] md:tracking-normal">
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
        <Image
          src="/img/motion-poster.svg"
          alt="motion-poster"
          width={497}
          height={703}
        />
      </div>
      <div className="w-full grid md:grid-cols-2 md:gap-[40px] gap-[20px] text-justify">
        <div className="md:w-[430px] w-full text-[15px] text-primary font-[400] leading-[24px] text-justify">
          {VISUALIDENTITY.kor[1]}
        </div>
        {!isMobileView &&
          <div className="md:w-[430px] w-full text-[15px] tracking-[-0.165px] text-primary font-[400] leading-[24px] text-justify">
            {VISUALIDENTITY.eng[1]}
          </div>
        }
      </div>
    </div>
  )
}