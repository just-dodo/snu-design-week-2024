import { EXHIBITIONOVERVIEW } from "constants/about"
import _useWindowSize from 'utils/useWindowSize';

export default function ExhibitionOverview() {

  const { isMobileView } = _useWindowSize();

  return (
    <div className="flex flex-col md:gap-[50px] gap-[20px]">
      <div className="flex flex-col md:gap-[0px] gap-[6px] text-primary md:text-[32px] text-[20px] tracking-[-0.2px] md:tracking-normal">
        <div className="md:font-[700] font-[600]">
          SNU DESIGN WEEK 2024
        </div>
        <div className="md:font-[700] font-[600]">
          애벌레 행동
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 md:gap-[40px] gap-[20px] text-justify">
        <div className="md:w-[430px] w-full text-[15px] text-primary font-[400] leading-[24px] text-justify">
          {EXHIBITIONOVERVIEW.kor[0]}
        </div>
        {!isMobileView &&
          <div className="md:w-[430px] w-full text-[15px] tracking-[-0.165px] text-primary font-[400] leading-[24px] text-justify">
            {EXHIBITIONOVERVIEW.eng[0]}
          </div>
        }
        <div className="md:w-[430px] w-full text-[15px] text-primary font-[400] leading-[24px] text-justify">
          {EXHIBITIONOVERVIEW.kor[1]}
        </div>
        {!isMobileView &&
          <div className="md:w-[430px] w-full text-[15px] tracking-[-0.165px] text-primary font-[400] leading-[24px] text-justify">
            {EXHIBITIONOVERVIEW.eng[1]}
          </div>
        }
      </div>
    </div>
  )
}