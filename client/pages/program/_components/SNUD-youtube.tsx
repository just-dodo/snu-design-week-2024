export default function SNUDYoutube() {
  const Details = "일정 | 9.11 - 10.29\n대상 | 졸업전시 관람객\n\n졸업전시자 전체를 대상으로 진행한 인터뷰. 각 질문에 대한 주차별로 달라지는 졸업전시자들의 대답을 통해, 전시주간이 다가오는 것에 대한 그들의 심경변화를 살펴보자. 각 인터뷰 속 질문을 통해 작품설명에는 나오지 않는 졸업전시자들의 이야기와 졸업전시에 대한 정보, 디자인에 대한 유용한 팁 등을 얻을 수도 있다."
  return (
    <div className="px-[16px] py-[20px] w-full flex flex-col gap-[20px]">
      <div className="w-full h-[200px] bg-gray-300">
        Skeleton
      </div>
      <div className="flex flex-col gap-[4px]">
        <div className="md:w-[430px] text-[20px] text-primary font-[700]">
          유튜브
        </div>
        <div className="md:w-[430px] text-[20px] text-primary font-[700]">
          SNUD Youtube
        </div>
      </div>
      <div className="md:w-[430px] text-[15px] text-primary font-[400] leading-[24px] whitespace-pre-line">
        {Details}
      </div>
    </div>
  )
}