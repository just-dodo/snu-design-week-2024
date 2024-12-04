export default function HiDay() {
  const Details = "일정 | 11.29\n장소 | 서울대학교 49동\n대상 | 재학생, 교수님들과 동문회\n\n전시 설치 완료 후, 성공적인 전시주간 개시를 기념하는 파티데이를 구성 및 준비한다. 졸업전시주간의 시작이자, 졸업준비위원회의 피날레."
  return (
    <div className="px-[16px] py-[20px] w-full flex flex-col gap-[20px]">
      <div className="w-full h-[200px] md:h-[540px] bg-gray-300">
        Skeleton
      </div>
      <div className="flex flex-col gap-[4px]">
        <div className="md:w-[430px] text-[20px] text-primary font-[700] md:tracking-[-0.32px]">
          하이데이
        </div>
        <div className="md:w-[430px] text-[20px] text-primary font-[700] md:tracking-[-0.32px]">
          Hi day
        </div>
      </div>
      <div className="md:w-[430px] md:pt-[4px] text-[15px] text-primary font-[400] leading-[24px] whitespace-pre-line md:tracking-[-0.165px]">
        {Details}
      </div>
    </div>
  )
}