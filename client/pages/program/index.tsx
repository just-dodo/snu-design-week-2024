import { useState } from 'react';
import { NextPage } from 'next';
import PCTitle from 'components/pc-title';
import HiDay from './_components/hi-day';
import _useWindowSize from 'utils/useWindowSize';
import Category from './_components/category-mobile';
import SearchAndInstagram from 'components/search-and-instagram';
import SNUDYoutube from './_components/SNUD-youtube';

const Program: NextPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("SNUD Youtube");

  const { isMobileView } = _useWindowSize();

  if (isMobileView) {
    return (
      <div className="mb-[50px] w-full flex flex-col items-center gap-[12px] pt-[50px] min-h-screen px-[24px]">
        <Category kor="유튜브" eng="SNUD Youtube" date="9.11 - 10.29" selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}>
          <SNUDYoutube />
        </Category>
        <Category kor="하이 데이" eng="HI DAY" date="11.29" selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}>
          <HiDay />
        </Category>
      </div>
    );
  }

  return (
    <div className='md:pt-[92px] md:mb-[88px] w-full flex flex-col items-center'>
      <div className="absolute right-0">
        <SearchAndInstagram />
      </div>
      <div className="pt-[88px] mb-[100px] w-[900px] flex flex-col items-center gap-[20px]">
        <PCTitle imgsrc="/img/pc-title-program.svg" width={294} height={93} />
        <div className="flex flex-row md:gap-[100px] gap-[63.5px] items-center mt-[42px] mb-[12px]">
          <div onClick={() => setSelectedCategory("SNUD Youtube")} className={`flex flex-col items-center w-auto cursor-pointer ${selectedCategory === "SNUD Youtube" ? null : 'opacity-50'}`}>
            <div className="text-[20px] font-[700] text-primary">SNUD Youtube</div>
            <div className="text-[16px] font-[400] text-primary">유튜브</div>
          </div>
          <div onClick={() => setSelectedCategory("HI DAY")} className={`flex flex-col items-center w-auto cursor-pointer ${selectedCategory === "HI DAY" ? null : 'opacity-50'}`}>
            <div className="text-[20px] font-[700] text-primary">HI DAY</div>
            <div className="text-[16px] font-[400] text-primary">하이 데이</div>
          </div>
        </div>
        <div className="w-[900px]">
          {selectedCategory === "SNUD Youtube" && <SNUDYoutube />}
          {selectedCategory === "HI DAY" && <HiDay />}
        </div>
      </div>
    </div>
  );
}

export default Program;