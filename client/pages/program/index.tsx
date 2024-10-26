import { useState } from 'react';
import { NextPage } from 'next';
import PCTitle from 'components/pc-title';
import OpeningDay from './_components/opening-day';
import Workshop from './_components/workshop';
import HiDay from './_components/hi-day';
import TalkConcert from './_components/talk-concert';

const Program: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("OPENING DAY");

  return (
    <div className="mt-[130px] mb-[100px] w-[900px] flex flex-col justify-center items-center gap-[20px]">
      <PCTitle imgsrc="/img/pc-title-program.svg" width={294} height={93}/>
      <div className="flex flex-row justify-between w-full items-center mt-[5px] mb-[12px] mx-[20px]">
        <div onClick={() => setSelectedCategory("OPENING DAY")} className={`flex flex-col items-center w-auto cursor-pointer ${selectedCategory === "OPENING DAY" ? null : 'opacity-50'}`}>
          <div className="text-[20px] font-[700] text-primary">OPENING DAY</div>
          <div className="text-[16px] font-[400] text-primary">오프닝 데이</div>
        </div>
        <div onClick={() => setSelectedCategory("WORKSHOP")} className={`flex flex-col items-center w-auto cursor-pointer ${selectedCategory === "WORKSHOP" ? null : 'opacity-50'}`}>
          <div className="text-[20px] font-[700] text-primary">WORKSHOP</div>
          <div className="text-[16px] font-[400] text-primary">워크샵</div>
        </div>
        <div onClick={() => setSelectedCategory("HI DAY")} className={`flex flex-col items-center w-auto cursor-pointer ${selectedCategory === "HI DAY" ? null : 'opacity-50'}`}>
          <div className="text-[20px] font-[700] text-primary">HI DAY</div>
          <div className="text-[16px] font-[400] text-primary whitespace-pre-line text-center">하이 데이</div>
        </div>
        <div onClick={() => setSelectedCategory("TALK CONCERT")} className={`flex flex-col items-center w-auto cursor-pointer ${selectedCategory === "TALK CONCERT" ? null : 'opacity-50'}`}>
          <div className="text-[20px] font-[700] text-primary">TALK CONCERT</div>
          <div className="text-[16px] font-[400] text-primary">토크 콘서트</div>
        </div>
      </div>
      <div className="w-[900px] mt-[30px]">
        {selectedCategory === "OPENING DAY" && <OpeningDay />}
        {selectedCategory === "WORKSHOP" && <Workshop />}
        {selectedCategory === "HI DAY" && <HiDay />}
        {selectedCategory === "TALK CONCERT" && <TalkConcert />}
      </div>
    </div>
  );
}

export default Program;