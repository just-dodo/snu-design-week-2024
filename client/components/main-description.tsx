export default function MainDescription() {
  const details = {
    date: "2024.11.30.THU -\n2024.12.05.TUE 10AM - 6PM",
    address: "1, GWANAK-RO,\nGWANAK-GU, SEOUL",
    location: "49, COLLEGE OF FINE ARTS,\nSEOUL NAT’L UNIVERSITY",
  }
  return (
    <div className="absolute flex flex-col gap-[30px] top-[100px] left-[50%] transform -translate-x-1/2 justify-center items-center w-full">
      <div className="flex flex-col gap-[8px] items-center">
        <div className="text-[#FFEFD3] font-pretendard text-[35px] font-bold leading-normal tracking-[-0.35px]">
          애벌레 행동
        </div>
        <div className="text-[#FFEFD3] font-pretendard text-[35px] font-bold leading-normal tracking-[-0.35px]">
          Caterpillar Walk
        </div>
      </div>
      <div className="flex flex-row gap-[185px]">
        <div className="text-[#FFEED2] text-center font-pretendard text-[15px] font-normal font-bold leading-[160%] tracking-[-0.15px] whitespace-pre-line">
          {details.date}
        </div>
        <div className="text-[#FFEED2] text-center font-pretendard text-[15px] font-normal font-bold leading-[160%] tracking-[-0.15px] whitespace-pre-line">
          {details.address}
        </div>
        <div className="text-[#FFEED2] text-center font-pretendard text-[15px] font-normal font-bold leading-[160%] tracking-[-0.15px] whitespace-pre-line">
          {details.location}
        </div>
      </div>
    </div>
  );
}