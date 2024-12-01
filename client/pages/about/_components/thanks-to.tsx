import _useWindowSize from 'utils/useWindowSize';

export default function ThanksTo() {

  const { isMobileView } = _useWindowSize();

  return (
    <div className="w-full flex flex-col md:gap-[50px] gap-[20px]">
      <div className="flex flex-col text-primary md:text-[32px] text-[20px] tracking-[-0.2px] md:tracking-normal">
        <div className="font-[600] md:font-[700]">
          도움 주신 분들
        </div>
        {
          !isMobileView &&
          <div className="font-[600] md:font-[700]">
            Thanks To
          </div>
        }
      </div>
      <div className='flex flex-col md:gap-[20px] gap-[12px]'>
        <div className='text-primary md:text-[20px] text-[18px] md:font-[700] font-[600]'>
          지도교수님
        </div>
        <div className='text-primary text-[15px] font-[400] leading-[24px]'>
          김수정 배민기 이장섭 김신혜 안성모 유병준 장성연 조상은
        </div>
      </div>
    </div>
  )
}